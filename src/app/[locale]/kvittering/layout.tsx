"use client";

import {onLanguageSelect, setParams} from "@navikt/nav-dekoratoren-moduler";
import {useLocale} from "next-intl";
import {ReactNode, useEffect} from "react";
import {getPathPrefixIncludingLocale} from "../../../getPathPrefixIncludingLocale.ts";
import {useRouter} from "../../../i18n/routing.ts";
import {supportedLanguageOrFallback} from "../../../lib/i18n/common.ts";

export default function KvitteringLayout({children}: {children: ReactNode}) {
    const locale = supportedLanguageOrFallback(useLocale());
    const router = useRouter();

    useEffect(() => {
        document.documentElement.lang = locale;
        void setParams({language: locale});

        onLanguageSelect(({locale: selectedLocale}) => {
            const language = supportedLanguageOrFallback(selectedLocale);
            const {path} = getPathPrefixIncludingLocale();
            router.replace(path, {locale: language});
        });
    }, [locale, router]);

    return children;
}
