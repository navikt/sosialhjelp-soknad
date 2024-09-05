import {fetchDecoratorHtml} from "@navikt/nav-dekoratoren-moduler/ssr";

import {DECORATOR_SETTINGS} from "../decoratorSettings.tsx";
import parse from "html-react-parser";
import {Driftsmeldinger, getDriftsmeldinger} from "./Driftsmeldinger.tsx";
export default async function RootLayout({children}: {children: React.ReactNode}) {
    const Decorator = await fetchDecoratorHtml(DECORATOR_SETTINGS);

    const driftsmeldinger = await getDriftsmeldinger();
    return (
        <html lang="no">
            <head>
                <title>Søknad om økonomisk sosialhjelp</title>
                {parse(Decorator.DECORATOR_STYLES)}
            </head>
            <body>
                <div suppressHydrationWarning dangerouslySetInnerHTML={{__html: Decorator.DECORATOR_HEADER}} />
                <Driftsmeldinger driftsmeldinger={driftsmeldinger} />
                <div id="root" className={"bg-digisosGronnBakgrunn"}>
                    {children}
                </div>
                <div suppressHydrationWarning dangerouslySetInnerHTML={{__html: Decorator.DECORATOR_FOOTER}} />
                {parse(Decorator.DECORATOR_SCRIPTS, {
                    replace: (domNode) => {
                        if ("attribs" in domNode && domNode.attribs["fetchpriority"] != null) {
                            const value = domNode.attribs["fetchpriority"];
                            delete domNode.attribs["fetchpriority"];
                            domNode.attribs.fetchPriority = value;
                        }

                        return undefined;
                    },
                })}
            </body>
        </html>
    );
}
