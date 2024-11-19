import {fetchDecoratorReact} from "@navikt/nav-dekoratoren-moduler/ssr";
import Script from "next/script";
import {DECORATOR_SETTINGS} from "../../decoratorSettings.tsx";
import {Driftsmeldinger} from "../../lib/driftsmeldinger/Driftsmeldinger.tsx";
import {notFound} from "next/navigation";
import {isSupportedLanguage} from "../../lib/i18n/common.ts";
import {getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";

export const dynamic = "force-dynamic";

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}) {
    const {locale} = await params;
    if (!isSupportedLanguage(locale)) notFound();

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
                <Driftsmeldinger />
                <div id="root" className={"bg-digisosGronnBakgrunn"} role={"none"}>
                    <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
                </div>
                <Decorator.Footer />
                <Decorator.Scripts loader={Script} />
            </body>
        </html>
    );
}
