import {defineRouting} from "next-intl/routing";
import {createNavigation} from "next-intl/navigation";
import type {NextResponse} from "next/server";
import {DEFAULT_LANGUAGE as defaultLocale, SUPPORTED_LANGUAGES as locales} from "../lib/i18n/common";
// Kopiert fra node_modules/next-intl/dist/types/src/routing/config.d.ts
type CookieAttributes = Pick<
    NonNullable<Parameters<typeof NextResponse.prototype.cookies.set>["2"]>,
    "maxAge" | "domain" | "partitioned" | "path" | "priority" | "sameSite" | "secure" | "name"
>;

const localeCookie: CookieAttributes = {name: "decorator-language", path: "/"};

export const routing = defineRouting({locales, defaultLocale, localeCookie, localePrefix: "as-needed"});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
