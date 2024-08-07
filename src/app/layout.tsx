export const metadata: Metadata = {
    name: "Søknad om økonomisk sosialhjelp",
    description: "Søknad om økonomisk sosialhjelp",
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
