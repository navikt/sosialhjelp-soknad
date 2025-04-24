import {fetchDecoratorReact} from "@navikt/nav-dekoratoren-moduler/ssr";
import Script from "next/script";
import {DECORATOR_SETTINGS} from "../decoratorSettings.tsx";
import {isSupportedLanguage} from "../lib/i18n/common.ts";
import {getMessages} from "next-intl/server";
import "../index.css";
import {cookies} from "next/headers";
import {DECORATOR_LANG_COOKIE} from "../lib/constants.ts";
import Providers from "./providers.tsx";

export const dynamic = "force-dynamic";

export default async function RootLayout({children}: {children: React.ReactNode}) {
    const jar = await cookies();
    const cookie = jar.get(DECORATOR_LANG_COOKIE)?.value;
    const locale = cookie && isSupportedLanguage(cookie) ? cookie : "nb";

    const Decorator = await fetchDecoratorReact({
        ...DECORATOR_SETTINGS,
        params: {...DECORATOR_SETTINGS.params, language: locale},
    });

    const messages = await getMessages();
    // locale blir hentet via middleware.ts,
    // og html lang leses (som document.documentElement.lang) av både analytics og klientside i18n
    return (
        <html lang={locale}>
            <head>
                <title>Søknad om økonomisk sosialhjelp</title>
                <Decorator.HeadAssets />
            </head>
            <body>
                <Decorator.Header />
                <div id="root" className={"bg-digisosGronnBakgrunn"} role={"none"}>
                    <Providers messages={messages} locale={locale}>
                        {children}
                    </Providers>
                </div>
                <Decorator.Footer />
                <Decorator.Scripts loader={Script} />
            </body>
        </html>
    );
}
