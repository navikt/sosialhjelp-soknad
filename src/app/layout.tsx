import {fetchDecoratorReact} from "@navikt/nav-dekoratoren-moduler/ssr";
import Script from "next/script";
import {DECORATOR_SETTINGS} from "../decoratorSettings.ts";
import {supportedLanguageOrFallback} from "../lib/i18n/common.ts";
import "../index.css";
import {cookies} from "next/headers";
import {DECORATOR_LANG_COOKIE} from "../lib/constants.ts";
import Providers from "./providers.tsx";

export const dynamic = "force-dynamic";

export default async function RootLayout({children}: {children: React.ReactNode}) {
    const language = supportedLanguageOrFallback((await cookies()).get(DECORATOR_LANG_COOKIE)?.value);

    const Decorator = await fetchDecoratorReact({
        ...DECORATOR_SETTINGS,
        params: {...DECORATOR_SETTINGS.params, language},
    });

    window.umami.trackEvent((props) => ({...props, language: language}));

    // locale blir hentet via middleware.ts,
    // og html lang leses (som document.documentElement.lang) av både analytics og klientside i18n
    return (
        <html lang={language}>
            <head>
                <Script
                    defer
                    strategy="afterInteractive"
                    src="https://cdn.nav.no/team-researchops/sporing/sporing.js"
                    data-host-url="https://umami.nav.no"
                    data-website-id="00a054e3-9928-4882-8e82-235940dfc04b"
                    data-auto-track="false"
                ></Script>
                <title>Søknad om økonomisk sosialhjelp</title>
                <Decorator.HeadAssets />
            </head>
            <body>
                <Decorator.Header />
                <div id="root" className={"bg-digisos-surface"} role={"none"}>
                    <Providers locale={language}>{children}</Providers>
                </div>
                <Decorator.Footer />
                <Decorator.Scripts loader={Script} />
            </body>
        </html>
    );
}
