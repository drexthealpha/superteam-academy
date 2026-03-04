import { createClient } from '@supabase/supabase-js';
import type { LearningProgressService, LeaderboardService, UserService, XpSummary, StreakData, Credential, Enrollment, LeaderboardEntry, UserProfile, ActivityEntry } from './types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function calcLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100));
}

export const supabaseLearningProgressService: LearningProgressService = {
  async getXpSummary(wallet?: string): Promise<XpSummary> {
    if (!wallet) return { total: 0, level: 0 };
    const { data } = await supabase.from('user_profiles').select('xp').eq('wallet', wallet).single();
    const total = data?.xp ?? 0;
    return { total, level: calcLevel(total) };
  },

  async getStreak(wallet?: string): Promise<StreakData> {
    if (!wallet) return { current: 0, longest: 0, lastActiveDate: '' };
    const { data } = await supabase.from('user_streaks').select('current_streak,longest_streak,last_activity_date').eq('user_wallet', wallet).single();
    return { current: data?.current_streak ?? 0, longest: data?.longest_streak ?? 0, lastActiveDate: data?.last_activity_date ?? '' };
  },

  async getCredentials(wallet?: string): Promise<Credential[]> {
    if (!wallet) return [];
    const { data } = await supabase.from('certificates').select('*').eq('user_wallet', wallet).order('issued_at', { ascending: false });
    return (data || []).map((c: any) => ({ id: c.id, track: c.course_title || 'Unknown', level: c.level || 1, mintAddress: c.mint_address, imageUri: c.image_uri, issuedAt: c.issued_at }));
  },

  async getEnrollments(wallet?: string): Promise<Enrollment[]> {
    if (!wallet) return [];
    const { data } = await supabase.from('enrollments').select('*, courses(title, lesson_count)').eq('user_wallet', wallet);
    return (data || []).map((e: any) => ({ courseSlug: e.course_id, enrolledAt: e.enrolled_at, completedLessons: e.completed_lessons ?? 0, totalLessons: e.courses?.lesson_count ?? 0, isCompleted: e.completed ?? false }));
  },
};

export const supabaseLeaderboardService: LeaderboardService = {
  async getLeaderboard(limit = 20): Promise<LeaderboardEntry[]> {
    const { data } = await supabase.from('user_profiles').select('wallet,display_name,xp,level').eq('show_in_leaderboard', true).order('xp', { ascending: false }).limit(limit);
    return (data || []).map((u: any, i: number) => ({ rank: i + 1, wallet: u.wallet, username: u.display_name, xp: u.xp ?? 0, level: u.level ?? calcLevel(u.xp ?? 0), credentialCount: 0 }));
  },
};

export const supabaseUserService: UserService = {
  async getProfile(wallet?: string): Promise<UserProfile> {
    if (!wallet) return { wallet: '', joinedAt: '', xp: { total: 0, level: 0 }, streak: { current: 0, longest: 0, lastActiveDate: '' }, credentials: [], enrollments: [] };
    const [xp, streak, credentials, enrollments, { data: profile }] = await Promise.all([
      supabaseLearningProgressService.getXpSummary(wallet),
      supabaseLearningProgressService.getStreak(wallet),
      supabaseLearningProgressService.getCredentials(wallet),
      supabaseLearningProgressService.getEnrollments(wallet),
      supabase.from('user_profiles').select('display_name,created_at').eq('wallet', wallet).single(),
    ]);
    return { wallet, username: profile?.display_name, joinedAt: profile?.created_at ?? new Date().toISOString(), xp, streak, credentials, enrollments };
  },

  async getPublicProfile(username: string): Promise<UserProfile | null> {
    const { data } = await supabase.from('user_profiles').select('wallet').eq('display_name', username).single();
    if (!data) return null;
    return supabaseUserService.getProfile(data.wallet);
  },

  async getActivity(wallet?: string): Promise<ActivityEntry[]> {
    if (!wallet) return [];
    const { data } = await supabase.from('xp_transactions').select('id,reason,created_at,amount').eq('user_wallet', wallet).order('created_at', { ascending: false }).limit(10);
    return (data || []).map((t: any) => ({ id: t.id, type: t.reason?.includes('lesson') ? 'lesson_completed' : t.reason?.includes('credential') ? 'credential_earned' : 'enrolled', label: t.reason?.replace(/_/g, ' ') ?? 'Activity', detail: `+${t.amount} XP`, date: t.created_at?.split('T')[0] ?? '' }));
  },
};
