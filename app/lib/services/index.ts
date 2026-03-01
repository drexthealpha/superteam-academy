// Service barrel — import from here, swap implementations later.

export type {
  XpSummary,
  StreakData,
  Credential,
  Course,
  Lesson,
  Enrollment,
  LeaderboardEntry,
  LearningProgressService,
  CourseService,
  LeaderboardService,
  EnrollmentAction,
  LessonAction,
} from "./types";

export {
  learningProgressService,
  courseService,
  leaderboardService,
  enrollmentAction,
  lessonAction,
} from "./stubs";
