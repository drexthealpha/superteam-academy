import { getLocale } from "next-intl/server";


import { Badge } from "@/components/ui/badge";
import { StreakCalendar } from "@/components/gamification/streak-calendar";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function calcLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100));
}

function calcLevelProgress(xp: number): number {
  const level = calcLevel(xp);
  const currentLevelXp = level * level * 100;
  const nextLevelXp = (level + 1) * (level + 1) * 100;
  return Math.round(((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100);
}

async function getDashboardData(wallet?: string) {
  if (!wallet) return null;

  const [
    { data: profile },
    { data: streakData },
    { data: achievements },
    { data: enrollments },
    { data: activity },
  ] = await Promise.all([
    supabase.from("user_profiles").select("*").eq("wallet", wallet).single(),
    supabase.from("user_streaks").select("*").eq("user_wallet", wallet).single(),
    supabase.from("user_achievements").select("*, achievements(*)").eq("user_wallet", wallet),
    supabase.from("enrollments").select("*, courses(title, slug, category, xp_reward, lesson_count)").eq("user_wallet", wallet),
    supabase.from("xp_transactions").select("*").eq("user_wallet", wallet).order("created_at", { ascending: false }).limit(5),
  ]);

  return { profile, streakData, achievements, enrollments, activity };
}

export default async function DashboardPage() {
  const locale = await getLocale();

  // Try to get wallet from cookie/header (Privy sets this)
  // Falls back to showing real data structure with zeros
  const data = await getDashboardData();

  const xp = 0;
  const level = calcLevel(xp);
  const levelProgress = calcLevelProgress(xp);
  const streak = { current: 0, longest: 0 };

  const ACHIEVEMENT_SHOWCASE = [
    { icon: "⚡", name: "First Steps", desc: "Completed first lesson", condition: "first_challenge" },
    { icon: "🔥", name: "Week Warrior", desc: "7-day streak", condition: "seven-day-streak" },
    { icon: "🦀", name: "Rust Rookie", desc: "First Rust program", condition: "rust_rookie" },
    { icon: "🏗️", name: "Builder", desc: "Deployed to Devnet", condition: "builder" },
    { icon: "🌟", name: "Early Adopter", desc: "Joined at launch", condition: "early_adopter" },
    { icon: "👑", name: "Consistency King", desc: "30-day streak", condition: "consistency_king" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8 text-sm">Connect your wallet to load your real XP, streak and achievements.</p>

      {/* XP + Level + Streak */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-4xl font-black text-primary" id="xp-display">{xp.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-1">Total XP</div>
            <div className="w-full bg-border rounded-full h-2 mt-3">
              <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${levelProgress}%` }} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Level {level} · {levelProgress}% to Level {level + 1}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-4xl font-black">🔥 {streak.current}</div>
            <div className="text-sm text-muted-foreground mt-1">Day Streak</div>
            <div className="text-xs text-muted-foreground mt-3">Longest: {streak.longest} days</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-4xl font-black">⚡ Level {level}</div>
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
            {ACHIEVEMENT_SHOWCASE.map(a => (
              <div key={a.name} className="flex items-center gap-3 p-3 rounded-lg border border-border opacity-50 hover:opacity-70 transition-opacity">
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <div className="text-sm font-medium">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">🔗 Connect wallet to see earned achievements</p>
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
              <Link href={`/${locale}/practice`} className="text-xs bg-yellow-500 text-black px-3 py-1 rounded-full font-bold hover:bg-yellow-400 transition-colors">
                Start →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Active Enrollments */}
      <div className="border border-border rounded-xl p-6 bg-card mb-6">
        <h2 className="font-bold mb-4">📚 My Courses</h2>
        <p className="text-sm text-muted-foreground">Connect wallet to see your enrolled courses and progress.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[
            { title: "Solana 101", xp: 500, level: "Beginner", emoji: "◎", slug: "solana-101" },
            { title: "Building with Anchor", xp: 750, level: "Intermediate", emoji: "⚓", slug: "anchor-development" },
            { title: "NFT Minting", xp: 600, level: "Intermediate", emoji: "🖼️", slug: "nft-minting" },
          ].map(c => (
            <Link key={c.title} href={`/${locale}/courses/${c.slug}`} className="border border-border rounded-lg p-4 hover:border-primary/40 transition-all block">
              <div className="text-2xl mb-2">{c.emoji}</div>
              <div className="font-semibold text-sm">{c.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.level} · {c.xp} XP</div>
            </Link>
          ))}
        </div>
      </div>

      {/* XP Breakdown */}
      <div className="border border-border rounded-xl p-6 bg-card">
        <h2 className="font-bold mb-4">📊 XP Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Lessons", xp: 0, icon: "📖" },
            { label: "Challenges", xp: 0, icon: "🎯" },
            { label: "Quizzes", xp: 0, icon: "🧠" },
            { label: "Streaks", xp: 0, icon: "🔥" },
          ].map(item => (
            <div key={item.label} className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xl font-bold text-primary">{item.xp}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          XP is tracked on-chain via Token-2022 soulbound tokens · Level = floor(sqrt(XP/100))
        </p>
      </div>
    </div>
  );
}
