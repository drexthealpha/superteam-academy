import { getLocale } from "next-intl/server";
import { userService, courseService } from "@/lib/services";
import { Badge } from "@/components/ui/badge";
import { StreakCalendar } from "@/components/gamification/streak-calendar";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function DashboardPage() {
  const locale = await getLocale();
  const mockXP = { total: 2700, level: 5 };
  const mockStreak = { current: 12, longest: 21 };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* XP + Level + Streak row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-4xl font-black text-primary">{mockXP.total.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-1">Total XP</div>
            <div className="w-full bg-border rounded-full h-2 mt-3">
              <div className="bg-primary h-2 rounded-full" style={{ width: "62%" }} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">Level {mockXP.level} · 62% to Level {mockXP.level + 1}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-4xl font-black">🔥 {mockStreak.current}</div>
            <div className="text-sm text-muted-foreground mt-1">Day Streak</div>
            <div className="text-xs text-muted-foreground mt-3">Longest: {mockStreak.longest} days</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-4xl font-black">⚡ Level {mockXP.level}</div>
            <div className="text-sm text-muted-foreground mt-1">Current Level</div>
            <div className="text-xs text-muted-foreground mt-3">Formula: floor(sqrt(XP/100))</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Achievements */}
        <div className="md:col-span-2 border border-border rounded-xl p-6 bg-card">
          <h2 className="font-bold mb-4">🏅 Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "⚡", name: "First Steps", desc: "Completed first lesson", earned: true },
              { icon: "🔥", name: "Week Warrior", desc: "7-day streak", earned: true },
              { icon: "🦀", name: "Rust Rookie", desc: "First Rust program", earned: false },
              { icon: "🏗️", name: "Builder", desc: "Deployed to Devnet", earned: false },
              { icon: "🌟", name: "Early Adopter", desc: "Joined at launch", earned: true },
              { icon: "👑", name: "Consistency King", desc: "30-day streak", earned: false },
            ].map(a => (
              <div key={a.name} className={"flex items-center gap-3 p-3 rounded-lg border " + (a.earned ? "border-primary/30 bg-primary/5" : "border-border opacity-40")}>
                <span className="text-2xl">{a.icon}</span>
                <div><div className="text-sm font-medium">{a.name}</div><div className="text-xs text-muted-foreground">{a.desc}</div></div>
                {a.earned && <span className="ml-auto text-xs text-primary font-bold">✓</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Streak + Daily Challenge */}
        <div className="flex flex-col gap-4">
          <div className="border border-border rounded-xl p-6 bg-card">
            <h2 className="font-bold mb-4">📅 Streak</h2>
            <StreakCalendar />
          </div>
          <div className="border border-yellow-500/30 rounded-xl p-6 bg-yellow-500/5">
            <h2 className="font-bold mb-2">⚡ Daily Challenge</h2>
            <p className="text-sm text-muted-foreground mb-3">Write a Solana transfer instruction from scratch</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-yellow-400 font-bold">+50 XP</span>
              <Link href={"/" + locale + "/courses/solana-fundamentals/lessons/3"} className="text-xs bg-yellow-500 text-black px-3 py-1 rounded-full font-bold hover:bg-yellow-400 transition-colors">Start →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended */}
      <div className="border border-border rounded-xl p-6 bg-card">
        <h2 className="font-bold mb-4">🎯 Recommended Next</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Anchor Development", xp: 2000, level: "Intermediate", emoji: "⚓", slug: "anchor-development" },
            { title: "DeFi on Solana", xp: 3000, level: "Advanced", emoji: "💱", slug: "defi-development" },
            { title: "NFT Programs", xp: 1500, level: "Intermediate", emoji: "🎨", slug: "nft-programs" },
          ].map(c => (
            <Link key={c.title} href={"/" + locale + "/courses/" + c.slug} className="border border-border rounded-lg p-4 hover:border-primary/40 transition-all block">
              <div className="text-2xl mb-2">{c.emoji}</div>
              <div className="font-semibold text-sm">{c.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.level} · {c.xp} XP</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
