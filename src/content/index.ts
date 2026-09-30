import { az } from "./az";
import { en } from "./en";
import type { Content } from "./types";

export const locales = ["az", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "az";

const content: Record<Locale, Content> = { en, az };

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getContent = (locale: Locale): Content => content[locale];
