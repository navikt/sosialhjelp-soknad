import {fetchDecoratorReact} from "@navikt/nav-dekoratoren-moduler/ssr";
import Script from "next/script";
import {DECORATOR_SETTINGS} from "../decoratorSettings.tsx";
import {Driftsmeldinger} from "./Driftsmeldinger.tsx";

export const dynamic = "force-dynamic";

export default async function RootLayout({children}: {children: React.ReactNode}) {
    const Decorator = await fetchDecoratorReact(DECORATOR_SETTINGS);

    return (
        <html lang="no">
            <head>
                <title>Søknad om økonomisk sosialhjelp</title>
                <Decorator.HeadAssets />
            </head>
            <body>
                <Decorator.Header />
                <Driftsmeldinger />
                <div id="root" className={"bg-digisosGronnBakgrunn"}>
                    {children}
                </div>
                <Decorator.Footer />
                <Decorator.Scripts loader={Script} />
            </body>
        </html>
    );
}
