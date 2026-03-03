"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { setLocale } from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locales } from "@/i18n/config";

export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string | null) {
    if (!value) return;
    startTransition(async () => {
      await setLocale(value);
      window.location.reload();
    });
  }

  return (
    <Select value={currentLocale} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="h-8 w-16" aria-label="Select language">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {t(loc)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
