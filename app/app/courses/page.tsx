import { courseService } from "@/lib/services";
import { CourseGrid } from "@/components/course-grid";

export default async function CoursesPage() {
  const courses = await courseService.getCourses();

  return (
    <div className="py-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Courses
        </h1>
        <p className="mt-2 max-w-lg text-muted-foreground">
          Structured learning paths from zero to deployed program. Each course
          awards XP and a credential NFT on completion.
        </p>
      </div>

      <CourseGrid courses={courses} />
    </div>
  );
}
