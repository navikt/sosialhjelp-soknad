import {Metadata} from "next";
import {fetchDecoratorHtml} from "@navikt/nav-dekoratoren-moduler/ssr";

import {DECORATOR_SETTINGS} from "../decoratorSettings.tsx";
import parse from "html-react-parser";
import {Driftsmeldinger} from "./Driftsmeldinger.tsx";

export const metadata: Metadata = {
    title: "Søknad om økonomisk sosialhjelp",
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
    const Decorator = await fetchDecoratorHtml(DECORATOR_SETTINGS);

    return (
        <html lang="no">
            <head>{parse(Decorator.DECORATOR_STYLES)}</head>
            <body>
                <div suppressHydrationWarning dangerouslySetInnerHTML={{__html: Decorator.DECORATOR_HEADER}} />
                <Driftsmeldinger />
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
