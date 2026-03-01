import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02Icon,
  Fire02Icon,
  Award01Icon,
  Blockchain01Icon,
  Clock01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import {
  learningProgressService,
  courseService,
} from "@/lib/services";

export default async function DashboardPage() {
  const [xp, streak, credentials, enrollments, courses] = await Promise.all([
    learningProgressService.getXpSummary(),
    learningProgressService.getStreak(),
    learningProgressService.getCredentials(),
    learningProgressService.getEnrollments(),
    courseService.getCourses(),
  ]);

  const courseMap = new Map(courses.map((c) => [c.slug, c]));

  return (
    <div className="py-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your learning progress at a glance.
        </p>
      </div>

      {/* Stats row */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="animate-fade-in">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <HugeiconsIcon icon={Blockchain01Icon} size={18} strokeWidth={2} color="currentColor" />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {xp.total.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Total XP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "60ms" }}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <HugeiconsIcon icon={Fire02Icon} size={18} strokeWidth={2} color="currentColor" />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {streak.current}
                </p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "120ms" }}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <HugeiconsIcon icon={Award01Icon} size={18} strokeWidth={2} color="currentColor" />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {credentials.length}
                </p>
                <p className="text-xs text-muted-foreground">Credentials</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "180ms" }}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <HugeiconsIcon icon={Clock01Icon} size={18} strokeWidth={2} color="currentColor" />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  Level {xp.level}
                </p>
                <p className="text-xs text-muted-foreground">Current Level</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Enrolled courses */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
            Enrolled Courses
          </h2>

          {enrollments.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  You haven&apos;t enrolled in any courses yet.
                </p>
                <Link href="/courses" className="mt-3 inline-block">
                  <Button size="sm">
                    Browse Courses
                    <HugeiconsIcon icon={ArrowRight02Icon} size={14} data-icon="inline-end" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              {enrollments.map((enrollment, i) => {
                const course = courseMap.get(enrollment.courseSlug);
                if (!course) return null;
                const progress = Math.round(
                  (enrollment.completedLessons / enrollment.totalLessons) * 100
                );

                return (
                  <Link
                    key={enrollment.courseSlug}
                    href={`/courses/${enrollment.courseSlug}`}
                    className="group"
                  >
                    <Card
                      className="animate-fade-in transition-colors hover:bg-muted/30"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <CardContent className="py-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground group-hover:text-primary">
                                {course.title}
                              </span>
                              {enrollment.isCompleted && (
                                <HugeiconsIcon
                                  icon={CheckmarkCircle02Icon}
                                  size={14}
                                  strokeWidth={2}
                                  className="text-primary"
                                  color="currentColor"
                                />
                              )}
                            </div>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {enrollment.completedLessons} of{" "}
                              {enrollment.totalLessons} lessons
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-4">
                            {/* Progress bar */}
                            <div className="hidden w-32 sm:block">
                              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-primary transition-all"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                              {progress}%
                            </span>
                            <HugeiconsIcon
                              icon={ArrowRight02Icon}
                              size={14}
                              color="currentColor"
                              className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Streak card */}
          <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="text-base">Streak</CardTitle>
              <CardDescription>Keep your momentum going</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {streak.current}
                </span>
                <span className="text-sm text-muted-foreground">days</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Longest: {streak.longest} days
              </p>
            </CardContent>
          </Card>

          {/* Credentials */}
          <Card className="animate-fade-in" style={{ animationDelay: "160ms" }}>
            <CardHeader>
              <CardTitle className="text-base">Credentials</CardTitle>
              <CardDescription>Your on-chain achievements</CardDescription>
            </CardHeader>
            <CardContent>
              {credentials.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Complete a course to earn your first credential.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {credentials.map((cred) => (
                    <div
                      key={cred.id}
                      className="flex items-center justify-between rounded-md border border-border px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon
                          icon={Award01Icon}
                          size={14}
                          strokeWidth={2}
                          className="text-primary"
                          color="currentColor"
                        />
                        <span className="text-sm text-foreground">
                          {cred.track}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Lvl {cred.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Separator />

          <Link href="/courses">
            <Button variant="outline" size="lg" className="w-full">
              Browse More Courses
              <HugeiconsIcon icon={ArrowRight02Icon} size={14} data-icon="inline-end" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
