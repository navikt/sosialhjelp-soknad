"use client";

import {configureLogger, logger} from "@navikt/next-logger";
import Cookie from "js-cookie";
import {BASE_PATH, DECORATOR_LANG_COOKIE} from "../lib/constants.ts";
import {isSupportedLanguage} from "../lib/i18n/common.ts";
import {AbstractIntlMessages, NextIntlClientProvider} from "next-intl";
import TekniskFeil from "../sider/feilsider/TekniskFeil.tsx";
import {useEffect, useState} from "react";

export default function GlobalError({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
    configureLogger({basePath: BASE_PATH, apiPath: `${BASE_PATH}/api`});

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_DIGISOS_ENV !== "localhost")
            logger.error(`En bruker har sett GlobalError, error: ${error} referrer: ${document.referrer}`);
    }, [error]);
    const langCookie = Cookie.get(DECORATOR_LANG_COOKIE);
    const locale = langCookie && isSupportedLanguage(langCookie) ? langCookie : "nb";
    const [messages, setMessages] = useState<AbstractIntlMessages | null>();
    import(`../../messages/${locale}.json`).then((module) => module.default).then(setMessages);

    return (
        <html lang={locale}>
            <head>
                <title>Søknad om økonomisk sosialhjelp</title>
            </head>
            <body>
                <div id="root" className={"bg-digisosGronnBakgrunn"} role={"none"}>
                    {messages && (
                        <NextIntlClientProvider messages={messages} locale={locale}>
                            <TekniskFeil error={error} reset={reset} />
                        </NextIntlClientProvider>
                    )}
                </div>
            </body>
        </html>
    );
}
