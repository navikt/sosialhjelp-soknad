"use client";
import {onLanguageSelect, setParams} from "@navikt/nav-dekoratoren-moduler";
import {configureLogger} from "@navikt/next-logger";
import {useContext, useEffect} from "react";
import {getPathPrefixIncludingLocale} from "../../getPathPrefixIncludingLocale.ts";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner.tsx";
import {BASE_PATH} from "../../lib/constants.ts";
import useDecoratorLogin from "../../lib/hooks/auth/useDecoratorLogin.ts";
import {DigisosContext} from "../../lib/providers/DigisosContext.ts";

export default function Template({children}: {children: React.ReactNode}) {
    configureLogger({basePath: BASE_PATH});
    const {path} = getPathPrefixIncludingLocale();
    const locale = useContext(DigisosContext)!.locale;
    useEffect(() => {
        document.documentElement.lang = locale;
        setParams({language: locale}).then(() => {});
    }, [locale]);
    onLanguageSelect(({locale: language, url}) =>
        setParams({language}).then(() => {
            // Bevisst full reload til ny locale-URL fra dekoratøren, ikke intern Next-ruting.
            // eslint-disable-next-line @next/next/no-location-assign-relative-destination
            window.location.assign(`${url}${path}`);
        })
    );

    const {isLoading} = useDecoratorLogin();

    if (isLoading) {
        return <ApplicationSpinner />;
    }

    return children;
}
