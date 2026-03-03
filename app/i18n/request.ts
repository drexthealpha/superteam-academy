import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { locales, defaultLocale, type Locale } from "./config";

export { locales, defaultLocale, type Locale } from "./config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const stored = cookieStore.get("locale")?.value;
  const locale = locales.includes(stored as Locale)
    ? (stored as Locale)
    : defaultLocale;

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
