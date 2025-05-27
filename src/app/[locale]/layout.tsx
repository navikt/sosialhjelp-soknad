import {supportedLanguageOrFallback} from "../../lib/i18n/common.ts";
import {DigisosContextProvider} from "../../lib/providers/DigisosContextProvider.tsx";
import {NextIntlClientProvider} from "next-intl";
import {Driftsmeldinger} from "../../lib/driftsmeldinger/Driftsmeldinger.tsx";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}) {
    const locale = supportedLanguageOrFallback((await params).locale);
    return (
        <NextIntlClientProvider locale={locale}>
            <DigisosContextProvider locale={locale}>
                <Driftsmeldinger />
                {children}
            </DigisosContextProvider>
        </NextIntlClientProvider>
    );
}
