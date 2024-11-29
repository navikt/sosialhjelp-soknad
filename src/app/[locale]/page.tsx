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
