// Service barrel — import from here, swap implementations later.

export type {
  XpSummary,
  StreakData,
  Credential,
  Course,
  Lesson,
  Enrollment,
  LeaderboardEntry,
  UserProfile,
  ActivityEntry,
  LearningProgressService,
  CourseService,
  LeaderboardService,
  UserService,
  CredentialService,
  EnrollmentAction,
  LessonAction,
} from "./types";

export {
  learningProgressService,
  courseService,
  leaderboardService,
  userService,
  credentialService,
  enrollmentAction,
  lessonAction,
} from "./stubs";
