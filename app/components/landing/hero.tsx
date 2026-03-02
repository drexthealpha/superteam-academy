import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="flex max-w-2xl flex-col gap-6">
          <Badge variant="outline" className="w-fit animate-fade-in">
            {t("badge")}
          </Badge>

          <h1 className="animate-fade-in text-4xl font-bold tracking-tight text-foreground [animation-delay:100ms] md:text-5xl lg:text-6xl">
            {t("titleLine1")}
            <br />
            <span className="text-primary">{t("titleLine2")}</span>
          </h1>

          <p className="animate-fade-in text-lg text-muted-foreground [animation-delay:200ms] md:text-xl">
            {t("description")}
          </p>

          <div className="flex animate-fade-in items-center gap-3 [animation-delay:300ms]">
            <Link href="/courses">
              <Button size="lg">
                {t("exploreCourses")}
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  size={16}
                  data-icon="inline-end"
                />
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="outline" size="lg">
                {t("viewLeaderboard")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative grid element */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full border border-border opacity-30 lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-1/2 hidden h-60 w-60 -translate-y-1/2 rounded-full border border-primary/20 opacity-40 lg:block"
        />
      </div>
    </section>
  );
}
