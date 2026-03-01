const stats = [
  { label: "Courses", value: "12+" },
  { label: "Lessons", value: "150+" },
  { label: "XP Distributed", value: "2.4M" },
  { label: "Credentials Issued", value: "850+" },
];

export function Stats() {
  return (
    <section className="border-y border-border">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="animate-fade-in text-center"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
