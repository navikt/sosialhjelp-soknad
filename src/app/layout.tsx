import {fetchDecoratorReact} from "@navikt/nav-dekoratoren-moduler/ssr";
import Script from "next/script";
import {DECORATOR_SETTINGS} from "../decoratorSettings.ts";
import {supportedLanguageOrFallback} from "../lib/i18n/common.ts";
import "../index.css";
import {cookies} from "next/headers";
import {DECORATOR_LANG_COOKIE} from "../lib/constants.ts";
import Providers from "./providers.tsx";
import {getToggles} from "../featuretoggles/unleash.ts";

export const dynamic = "force-dynamic";

export default async function RootLayout({children}: {children: React.ReactNode}) {
    const language = supportedLanguageOrFallback((await cookies()).get(DECORATOR_LANG_COOKIE)?.value);

    const [Decorator, toggles] = await Promise.all([
        fetchDecoratorReact({
            ...DECORATOR_SETTINGS,
            params: {...DECORATOR_SETTINGS.params, language},
        }),
        getToggles(),
    ]);
    // locale blir hentet via middleware.ts,
    // og html lang leses (som document.documentElement.lang) av både analytics og klientside i18n
    return (
        <html lang={language}>
            <head>
                <title>Søknad om økonomisk sosialhjelp</title>
                <Decorator.HeadAssets />
            </head>
            <body>
                <Decorator.Header />
                <div id="root" role={"none"}>
                    <Providers locale={language} toggles={toggles}>
                        {children}
                    </Providers>
                </div>
                <Decorator.Footer />
                <Decorator.Scripts loader={Script} />
            </body>
        </html>
    );
}
