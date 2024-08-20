import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Søknad om økonomisk sosialhjelp",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="no">
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    );
}
