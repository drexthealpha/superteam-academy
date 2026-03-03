import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { sanityCourseService, courseService } from "@/lib/services";
import { LessonClient } from "./lesson-client";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const locale = await getLocale();

  let lesson = await sanityCourseService.getLesson(slug, id).catch(() => null);
  let allLessons = lesson ? await sanityCourseService.getLessons(slug).catch(() => []) : [];

  // Fall back to stubs if Sanity has no content
  if (!lesson) {
    lesson = await courseService.getLesson(slug, id).catch(() => null);
    allLessons = lesson ? await courseService.getLessons(slug).catch(() => []) : [];
  }

  if (!lesson) notFound();

  const lessonsWithMeta = allLessons.map((l, idx) => ({ ...l, lessonNumber: idx + 1 }));
  const currentIndex = allLessons.findIndex((l) => l.id === id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : undefined;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : undefined;

  return (
    <LessonClient
      lesson={lesson}
      courseSlug={slug}
      allLessons={lessonsWithMeta}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      locale={locale as "en" | "pt-BR" | "es"}
    />
  );
}