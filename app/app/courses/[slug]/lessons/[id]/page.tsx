export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Lesson {id}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Course: {slug} — Interactive lesson view with code editor.
      </p>
    </div>
  );
}
