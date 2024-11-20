import {isSupportedLanguage} from "../../lib/i18n/common.ts";
import {DigisosContextProvider} from "../../lib/providers/DigisosContextProvider.tsx";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}) {
    const {locale: localeParam} = await params;
    const messages = await getMessages();

    const locale = isSupportedLanguage(localeParam) ? localeParam : "nb";
    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <DigisosContextProvider locale={locale}>{children}</DigisosContextProvider>
        </NextIntlClientProvider>
    );
}

export async function generateStaticParams() {
    return [{locale: "nb"}, {locale: "nn"}, {locale: "en"}];
}
