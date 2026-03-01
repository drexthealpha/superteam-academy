// Service interfaces — aligned with DEV_SYNC.md and SPEC.md
// These interfaces stub local data now and will swap to on-chain later.

// -- XP & Progress --

export interface XpSummary {
  total: number;
  level: number; // floor(sqrt(total / 100))
}

export interface StreakData {
  current: number;
  longest: number;
  lastActiveDate: string; // ISO date
}

// -- Credentials --

export interface Credential {
  id: string;
  track: string;
  level: number;
  mintAddress?: string;
  imageUri?: string;
  issuedAt: string; // ISO date
}

// -- Courses --

export interface Course {
  slug: string;
  title: string;
  description: string;
  lessonCount: number;
  totalXp: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  imageUri?: string;
  creator: string;
}

export interface Lesson {
  id: string;
  courseSlug: string;
  title: string;
  order: number;
  xpReward: number;
  type: "reading" | "coding" | "quiz";
}

export interface Enrollment {
  courseSlug: string;
  enrolledAt: string; // ISO date
  completedLessons: number; // count from bitmap
  totalLessons: number;
  isCompleted: boolean;
}

// -- Leaderboard --

export interface LeaderboardEntry {
  rank: number;
  wallet: string;
  username?: string;
  xp: number;
  level: number;
  credentialCount: number;
}

// -- Service Interfaces --

export interface LearningProgressService {
  getXpSummary(walletAddress?: string): Promise<XpSummary>;
  getStreak(walletAddress?: string): Promise<StreakData>;
  getCredentials(walletAddress?: string): Promise<Credential[]>;
  getEnrollments(walletAddress?: string): Promise<Enrollment[]>;
}

export interface CourseService {
  getCourses(): Promise<Course[]>;
  getCourse(slug: string): Promise<Course | null>;
  getLessons(courseSlug: string): Promise<Lesson[]>;
  getLesson(courseSlug: string, lessonId: string): Promise<Lesson | null>;
}

export interface LeaderboardService {
  getLeaderboard(limit?: number): Promise<LeaderboardEntry[]>;
}

// -- Actions (wallet-signed) --

export interface EnrollmentAction {
  enroll(courseSlug: string): Promise<{ success: boolean; txHash?: string }>;
  closeEnrollment(
    courseSlug: string
  ): Promise<{ success: boolean; txHash?: string }>;
}

// -- Actions (backend-signed, stubbed) --

export interface LessonAction {
  completeLesson(
    courseSlug: string,
    lessonId: string
  ): Promise<{ success: boolean; xpAwarded?: number }>;
}
