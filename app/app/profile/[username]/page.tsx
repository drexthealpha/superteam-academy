export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {username}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Public profile — credentials, XP, and achievements.
      </p>
    </div>
  );
}
