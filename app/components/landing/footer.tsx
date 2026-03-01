import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  platform: [
    { label: "Courses", href: "/courses" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "GitHub", href: "https://github.com/solanabr/superteam-academy" },
    { label: "Solana Docs", href: "https://solana.com/docs" },
  ],
  community: [
    { label: "Superteam", href: "https://superteam.fun" },
    { label: "Discord", href: "#" },
    { label: "Twitter", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-sm font-semibold text-foreground">
              Superteam Academy
            </span>
            <p className="mt-2 text-sm text-muted-foreground">
              Solana-native learning platform with on-chain credentials.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <span className="text-sm font-medium capitalize text-foreground">
                {category}
              </span>
              <ul className="mt-3 flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            Built on Solana. Open source.
          </p>
          <p className="text-xs text-muted-foreground">
            Superteam Brazil &middot; 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
