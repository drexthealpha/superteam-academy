"use client";

import { useTheme } from "next-themes";
import { Switch } from "@base-ui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun01Icon } from "@hugeicons/core-free-icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground">Light</span>
      <Switch.Root
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="inline-flex h-6 w-11 items-center rounded-full border border-border bg-background"
      >
        <Switch.Thumb className="h-5 w-5 translate-x-0 rounded-full bg-foreground transition-transform data-[state=checked]:translate-x-5" />
      </Switch.Root>
      <span className="text-xs text-muted-foreground">Dark</span>
      <div className="flex items-center gap-1 rounded-full border border-border bg-background px-2 py-1 text-xs">
        <HugeiconsIcon
          icon={isDark ? Moon02Icon : Sun01Icon}
          size={14}
          strokeWidth={2}
          color="currentColor"
        />
        <span>{isDark ? "Dark" : "Light"}</span>
      </div>
    </div>
  );
}
