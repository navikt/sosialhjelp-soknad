"use client";
import Informasjon from "../../sider/hovedmeny";
import {getPathPrefixIncludingLocale} from "../../getPathPrefixIncludingLocale.ts";
import {onLanguageSelect, setParams} from "@navikt/nav-dekoratoren-moduler";
import {useContext, useEffect} from "react";
import {DigisosContext} from "../../lib/providers/DigisosContext.ts";
import {BASE_PATH} from "../../lib/constants.ts";
import {configureLogger} from "@navikt/next-logger";
import {initAmplitude} from "../../lib/amplitude/Amplitude.tsx";
import useDecoratorLogin from "../../lib/hooks/auth/useDecoratorLogin.ts";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner.tsx";

const Page = () => {
    // @ts-expect-error production hack
    window.__DECORATOR_DATA__.env.LOGIN_SESSION_API_URL = "https://www.nav.no/sosialhjelp/soknad/oauth2/session";
    // @ts-expect-error production hack
    window.__DECORATOR_DATA__.env.LOGOUT_URL = "https://www.nav.no/sosialhjelp/soknad/oauth2/logout";
    configureLogger({basePath: BASE_PATH});
    initAmplitude();
    const {path} = getPathPrefixIncludingLocale();
    const locale = useContext(DigisosContext)!.locale;
    useEffect(() => {
        document.documentElement.lang = locale;
        setParams({language: locale}).then(() => {});
    }, [locale]);
    onLanguageSelect(({locale: language, url}) =>
        setParams({language}).then(() => window.location.assign(`${url}${path}`))
    );

    const isLoading = useDecoratorLogin();

    if (isLoading) {
        return <ApplicationSpinner />;
    }

    return <Informasjon />;
};

export default Page;
