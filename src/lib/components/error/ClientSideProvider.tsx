"use client";
import {ReactNode, useEffect, useState} from "react";
import Cookie from "js-cookie";
import {BASE_PATH, DECORATOR_LANG_COOKIE} from "../../constants.ts";
import {supportedLanguageOrFallback} from "../../i18n/common.ts";
import {AbstractIntlMessages, NextIntlClientProvider} from "next-intl";
import {onLanguageSelect} from "@navikt/nav-dekoratoren-moduler";
import {configureLogger, logger} from "@navikt/next-logger";
import {useTimeoutFn} from "react-use";
import {Loader} from "@navikt/ds-react";

/**
 * Just a lil' placeholder component that will log an error if it's still mounted after 3 seconds.
 * @constructor
 */
const ErrorCanary = () => {
    useTimeoutFn(() => logger.error("ClientSideIntl ErrorCanary: Messages still not loaded after 3 seconds"), 3000);

    return <Loader />;
};

/**
 * Providerkoponent for klientside i18n og logging, til de sidene hvor serverside i18n ikke er tilgjengelig.
 */
export const ClientSideProvider = ({children}: {children: ReactNode}) => {
    // Current locale for both next-intl and react-i18next.
    const [locale, setLocale] = useState(supportedLanguageOrFallback(Cookie.get(DECORATOR_LANG_COOKIE)));
    const [messages, setMessages] = useState<AbstractIntlMessages | null>();

    configureLogger({basePath: BASE_PATH});

    onLanguageSelect(({locale}) => setLocale(supportedLanguageOrFallback(locale)));

    // When locale changes, change the HTML lang attribute (read other places) and load the messages for this locale.
    useEffect(() => {
        document.documentElement.lang = locale;
        import(`../../../../messages/${locale}.json`)
            .then((module) => setMessages(module.default))
            .catch((e) => logger.error(e, "ClientSideIntl: Failed to load messages"));
    }, [locale]);

    return messages ? (
        <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
        </NextIntlClientProvider>
    ) : (
        <ErrorCanary />
    );
};
