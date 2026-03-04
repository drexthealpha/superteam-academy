export type {
  XpSummary, StreakData, Credential, Course, Lesson, Enrollment,
  LeaderboardEntry, UserProfile, ActivityEntry, LearningProgressService,
  CourseService, LeaderboardService, UserService, CredentialService,
  EnrollmentAction, LessonAction,
} from "./types";

export { courseService, enrollmentAction, lessonAction, credentialService } from "./stubs";
export { sanityCourseService } from "./sanity-course";
export { onChainUserService, onChainLeaderboardService } from "./onchain";

// ✅ Real Supabase implementations (replaces stubs)
export {
  supabaseLearningProgressService as learningProgressService,
  supabaseLeaderboardService as leaderboardService,
  supabaseUserService as userService,
} from "./supabase-impl";
