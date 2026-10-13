import {Bleed, BodyShort, GuidePanel, Heading, Hide, HStack, VStack} from "@navikt/ds-react";
import {SkjemaIllustrasjon} from "../../../lib/components/svg/illustrasjoner/SkjemaIllustrasjon";

const Page = () => {
    return (
        <main
            className="max-w-lg lg:max-w-3xl w-full mx-auto gap-6 p-3 py-6 lg:gap-16 lg:py-16 flex flex-col grow"
            aria-labelledby={"app-heading"}
        >
            <HStack>
                <Hide below="lg">
                    <Bleed marginInline="space-128 space-0">
                        <div className="pr-6">
                            <SkjemaIllustrasjon />
                        </div>
                    </Bleed>
                </Hide>
                <VStack gap="space-12" as="hgroup" className={"flex-col-reverse"}>
                    <Heading level="1" size="xlarge">
                        Søknad om økonomisk sosialhjelp
                    </Heading>
                    <BodyShort size="small">NAV 35-18.01</BodyShort>
                </VStack>
            </HStack>

            <GuidePanel poster>
                Saksbehandlingstiden varierer fra kommune til kommune. Hvis det går mer enn X måneder siden du søkte,
                skal du få brev om at saksbehandlingstiden er forlenget.
            </GuidePanel>
        </main>
    );
};

export default Page;
