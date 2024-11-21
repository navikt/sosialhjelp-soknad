import {isSupportedLanguage} from "../../lib/i18n/common.ts";
import {DigisosContextProvider} from "../../lib/providers/DigisosContextProvider.tsx";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {Driftsmeldinger} from "../../lib/driftsmeldinger/Driftsmeldinger.tsx";
import {useConfigFeatureFlags} from "../../lib/config.ts";
import {BodyShort, Box, Heading} from "@navikt/ds-react";
import {ExclamationmarkTriangleIcon} from "@navikt/aksel-icons";

const PublicFacingTestVersionWarning = () => {
    return (
        <>
            <Box className={"bg-[#ffef00] max-w-3xl mx-auto w-full rounded-2xl border-black border-8 p-4 m-4"}>
                <div className={"flex gap-4"}>
                    <ExclamationmarkTriangleIcon title="a11y-title" fontSize="7rem" />
                    <div>
                        <Heading level={"2"} size={"xlarge"} className={"uppercase"}>
                            Testversjon - ikke til bruk
                        </Heading>
                        <BodyShort>Dette er en midlertidig versjon for testing. Den må ikke brukes.</BodyShort>
                        <BodyShort>
                            Sosialhjelpsøknaden er på{" "}
                            <a href={"https://nav.no/sosialhjelp/soknad"}>https://nav.no/sosialhjelp/soknad</a>.
                        </BodyShort>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}) {
    const {publicFacingTestVersion} = useConfigFeatureFlags();
    const {locale: localeParam} = await params;
    const messages = await getMessages();

    const locale = isSupportedLanguage(localeParam) ? localeParam : "nb";
    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <DigisosContextProvider locale={locale}>
                {publicFacingTestVersion && <PublicFacingTestVersionWarning />}
                <Driftsmeldinger />
                {children}
            </DigisosContextProvider>
        </NextIntlClientProvider>
    );
}
