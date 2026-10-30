import {Heading, LinkCard, VStack} from "@navikt/ds-react";
import {useTranslations} from "next-intl";
import {SoknadHeader} from "../../lib/components/SoknadHeader.tsx";
import {useConfigFeatureFlags} from "../../lib/config.ts";
import {useContextSessionInfo} from "../../lib/providers/useContextSessionInfo.ts";
import {EttersendDokuPanel} from "./EttersendDokuPanel.tsx";
import {NySoknadPanel} from "./nySoknad/NySoknadPanel.tsx";
import "./overrides.css";
import {PabegynteSoknaderPanel} from "./PabegynteSoknader.tsx";
import {redirect} from "next/navigation";

export const Informasjon = () => {
    const featureToggles = useConfigFeatureFlags();
    const {open, numRecentlySent} = useContextSessionInfo();
    const t = useTranslations("NyEllerFortsettSoknad");

    if (featureToggles.nyIntroside && open?.length === 0) {
        redirect("/sosialhjelp/soknad/ny");
    }

    return featureToggles.nyIntroside ? (
        <main className="max-w-lg lg:max-w-xl w-full mx-auto gap-6 p-3 py-6 lg:gap-8 lg:py-8 flex flex-col grow">
            <SoknadHeader></SoknadHeader>

            <VStack gap={{xs: "space-24", lg: "space-32"}}>
                <LinkCard data-color="accent">
                    <LinkCard.Title>
                        <LinkCard.Anchor href="/sosialhjelp/soknad/ny">{t("nySoknad")}</LinkCard.Anchor>
                    </LinkCard.Title>
                </LinkCard>
                <LinkCard data-color="accent">
                    <LinkCard.Title>
                        <LinkCard.Anchor href="/sosialhjelp/soknad/fortsett">
                            {t("fortsettSoknadTitle")}
                        </LinkCard.Anchor>
                    </LinkCard.Title>
                    <LinkCard.Description>{t("fortsettSoknadDescription", {count: open?.length})}</LinkCard.Description>
                </LinkCard>
            </VStack>
        </main>
    ) : (
        <main aria-labelledby={"app-heading"}>
            <title>{t("title")}</title>
            {/*{digisosConfig.showDevPanel && <DeveloperToolkit />}*/}
            <div
                className="max-w-lg lg:max-w-3xl w-full mx-auto gap-6 p-3 py-6 lg:gap-16 lg:py-16 flex flex-col grow"
                role={"none"}
            >
                <Heading id={"app-heading"} level="1" size={"large"}>
                    {t("title")}
                </Heading>
                <VStack gap={"space-20"}>
                    <NySoknadPanel defaultOpen={open?.length === 0} />
                    <PabegynteSoknaderPanel />
                    {!!numRecentlySent && <EttersendDokuPanel />}
                </VStack>
            </div>
        </main>
    );
};

export default Informasjon;
