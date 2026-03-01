import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Blockchain01Icon,
  Award01Icon,
  BookOpen01Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";

const features = [
  {
    icon: BookOpen01Icon,
    title: "Interactive Courses",
    description:
      "Hands-on Solana development with in-browser coding challenges. Build real programs, not just watch videos.",
  },
  {
    icon: Blockchain01Icon,
    title: "On-Chain XP",
    description:
      "Earn soulbound Token-2022 XP for every lesson completed. Your progress is permanent and verifiable on Solana.",
  },
  {
    icon: Award01Icon,
    title: "Credential NFTs",
    description:
      "Receive Metaplex Core NFTs as proof of mastery. Soulbound credentials that upgrade as you advance through tracks.",
  },
  {
    icon: Shield01Icon,
    title: "Decentralized & Trustless",
    description:
      "Course enrollments and completions recorded on-chain. No central authority controls your learning record.",
  },
];

export function Features() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
        <div className="mb-12 max-w-lg">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Why Superteam Academy
          </h2>
          <p className="mt-2 text-muted-foreground">
            A learning platform built for the Solana ecosystem, where your
            achievements are as permanent as the blockchain.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Card
              key={feature.title}
              className="animate-fade-in border-0 bg-transparent ring-0"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <CardHeader>
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <HugeiconsIcon
                    icon={feature.icon}
                    size={18}
                    strokeWidth={2}
                    color="currentColor"
                  />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
