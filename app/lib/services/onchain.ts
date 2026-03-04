import type { XpSummary, StreakData, Credential, UserProfile, LeaderboardEntry, Enrollment, EnrollmentAction, LessonAction } from './types';
import { getXpBalance, getCredentialNfts, getLeaderboardData } from '@/lib/solana/client';
import { supabase } from '@/lib/supabase';
import type { EnrollmentRow } from '@/lib/supabase';

const STUB_XP: XpSummary = { total: 2700, level: 5 };
const STUB_STREAK: StreakData = { current: 5, longest: 12, lastActiveDate: new Date().toISOString().split('T')[0] };
const STUB_CREDENTIALS: Credential[] = [
  { id: 'cred-1', track: 'Solana Fundamentals', level: 1, issuedAt: '2026-02-15' },
  { id: 'cred-2', track: 'Anchor Development', level: 2, issuedAt: '2026-02-22' },
];

function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100));
}

function getStreakFromStorage(): StreakData {
  if (typeof window === 'undefined') return STUB_STREAK;
  
  const lastActive = localStorage.getItem('streak_last_active');
  const current = parseInt(localStorage.getItem('streak_current') || '0', 10);
  const longest = parseInt(localStorage.getItem('streak_longest') || '0', 10);
  const today = new Date().toISOString().split('T')[0];
  
  if (lastActive === today) {
    return { current, longest, lastActiveDate: today };
  }
  
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (lastActive === yesterday) {
    return { current, longest, lastActiveDate: today };
  }
  
  return { current: 0, longest, lastActiveDate: today };
}

function updateStreak(): void {
  if (typeof window === 'undefined') return;
  
  const today = new Date().toISOString().split('T')[0];
  const lastActive = localStorage.getItem('streak_last_active');
  const current = parseInt(localStorage.getItem('streak_current') || '0', 10);
  const longest = parseInt(localStorage.getItem('streak_longest') || '0', 10);
  
  if (lastActive !== today) {
    const newStreak = lastActive ? current + 1 : 1;
    localStorage.setItem('streak_current', String(newStreak));
    localStorage.setItem('streak_last_active', today);
    localStorage.setItem('streak_longest', String(Math.max(longest, newStreak)));
  }
}

export const onChainUserService = {
  async getXpSummary(walletAddress?: string): Promise<XpSummary> {
    if (!walletAddress) {
      return STUB_XP;
    }
    
    try {
      const balance = await getXpBalance(walletAddress);
      if (balance > 0) {
        return { total: balance, level: calculateLevel(balance) };
      }
    } catch (error) {
      console.error('Error fetching XP from chain:', error);
    }
    
    return STUB_XP;
  },
  
  async getStreak(walletAddress?: string): Promise<StreakData> {
    if (!walletAddress) {
      return getStreakFromStorage();
    }
    
    return getStreakFromStorage();
  },
  
  async getCredentials(walletAddress?: string): Promise<Credential[]> {
    if (!walletAddress) {
      return STUB_CREDENTIALS;
    }
    
    try {
      const nfts = await getCredentialNfts(walletAddress);
      
      if (nfts.length > 0) {
        return nfts.map((nft, i) => ({
          id: `cred-${i + 1}`,
          track: nft.name || 'Credential',
          level: 1,
          mintAddress: nft.mint,
          imageUri: nft.imageUri,
          issuedAt: new Date().toISOString().split('T')[0],
        }));
      }
    } catch (error) {
      console.error('Error fetching credentials from chain:', error);
    }
    
    return STUB_CREDENTIALS;
  },
  
  async getEnrollments(walletAddress?: string): Promise<Enrollment[]> {
    if (!walletAddress) {
      return [];
    }
    
    try {
      const { data: enrollmentRows, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_wallet', walletAddress);

      if (error || !enrollmentRows || enrollmentRows.length === 0) {
        return [];
      }

      // Get course slugs to look up lesson counts
      const courseSlugs = enrollmentRows.map((e: EnrollmentRow) => e.course_id);
      const { data: courseRows } = await supabase
        .from('courses')
        .select('slug, lesson_count')
        .in('slug', courseSlugs);

      const lessonCountMap = new Map(
        (courseRows || []).map((c: { slug: string; lesson_count: number }) => [c.slug, c.lesson_count])
      );

      return enrollmentRows.map((row: EnrollmentRow) => {
        const completedLessons = row.completed_lessons || [];
        const totalLessons = lessonCountMap.get(row.course_id) || 0;

        return {
          courseSlug: row.course_id,
          enrolledAt: row.enrolled_at,
          completedLessons: completedLessons.length,
          totalLessons,
          isCompleted: row.is_completed || (totalLessons > 0 && completedLessons.length >= totalLessons),
        };
      });
    } catch (error) {
      console.error('Error fetching enrollments from Supabase:', error);
      return [];
    }
  },
};

export const onChainLeaderboardService = {
  async getLeaderboard(limit = 20): Promise<LeaderboardEntry[]> {
    try {
      const data = await getLeaderboardData();
      
      return data.slice(0, limit).map((entry, i) => ({
        rank: i + 1,
        wallet: entry.wallet,
        username: i < 3 ? ['solanabr.sol', 'drexalpha.sol', 'turbine_dev'][i] : undefined,
        xp: entry.xp,
        level: calculateLevel(entry.xp),
        credentialCount: Math.max(1, 6 - i),
      }));
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  },
};

export const onChainEnrollmentAction: EnrollmentAction = {
  async enroll(_courseSlug: string): Promise<{ success: boolean; txHash?: string }> {
    updateStreak();
    
    return { success: true, txHash: 'stub-enrollment-tx' };
  },
  
  async closeEnrollment(_courseSlug: string): Promise<{ success: boolean; txHash?: string }> {
    return { success: true, txHash: 'stub-close-enrollment-tx' };
  },
};

export const onChainLessonAction: LessonAction = {
  async completeLesson(_courseSlug: string, _lessonId: string): Promise<{ success: boolean; xpAwarded?: number }> {
    updateStreak();
    
    return { success: true, xpAwarded: 100 };
  },
};

export async function getUserProfile(walletAddress?: string): Promise<UserProfile> {
  if (!walletAddress) {
    return {
      wallet: '',
      joinedAt: new Date().toISOString(),
      xp: STUB_XP,
      streak: getStreakFromStorage(),
      credentials: STUB_CREDENTIALS,
      enrollments: [],
    };
  }
  
  const [xp, streak, credentials, enrollments] = await Promise.all([
    onChainUserService.getXpSummary(walletAddress),
    onChainUserService.getStreak(walletAddress),
    onChainUserService.getCredentials(walletAddress),
    onChainUserService.getEnrollments(walletAddress),
  ]);
  
  return {
    wallet: walletAddress,
    joinedAt: new Date().toISOString(),
    xp,
    streak,
    credentials,
    enrollments,
  };
}
