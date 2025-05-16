"use client";

import TekniskFeil from "../sider/feilsider/TekniskFeil.tsx";
import {logger} from "@navikt/next-logger";
import {logError} from "../lib/log/loggerUtils.ts";
import {useEffect, useState} from "react";
import {faro} from "@grafana/faro-react";
import {AbstractIntlMessages, NextIntlClientProvider} from "next-intl";
import Cookie from "js-cookie";
import {DECORATOR_LANG_COOKIE} from "../lib/constants.ts";
import {isSupportedLanguage} from "../lib/i18n/common.ts";

export const ErrorComponent = ({error, reset}: {error: Error; reset: () => void}) => {
    if (faro.api) faro.api.pushError(error);
    const langCookie = Cookie.get(DECORATOR_LANG_COOKIE);
    const locale = langCookie && isSupportedLanguage(langCookie) ? langCookie : "nb";

    const [messages, setMessages] = useState<AbstractIntlMessages | null>();
    import(`../../messages/${locale}.json`).then((module) => module.default).then(setMessages);

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_DIGISOS_ENV === "localhost") {
            logger.error(
                {errorMessage: error.message, referrer: document.referrer, location: document.location.href},
                `En bruker har sett TekniskFeil`
            );
            logError(`Viser feilside, error, referrer: ${document.referrer}`);
        }
    }, [error]);

    return !messages ? null : (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <TekniskFeil error={error} reset={reset} />
        </NextIntlClientProvider>
    );
};

export default ErrorComponent;
