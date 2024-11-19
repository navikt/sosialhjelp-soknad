import * as React from "react";
import {PersonbeskyttelseFeilmelding} from "./PersonbeskyttelseFeilmelding";
import {NySoknadPanel} from "./paneler/NySoknad";
import {PabegynteSoknaderPanel} from "./paneler/PabegynteSoknader";
import {EttersendDokuPanel} from "./paneler/EttersendDokuPanel";
import {useGetSessionInfo} from "../../generated/informasjon-ressurs/informasjon-ressurs";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner.tsx";
import {Heading, VStack} from "@navikt/ds-react";
import digisosConfig from "../../lib/config.ts";
import DeveloperToolkit from "../../lib/components/appHeader/DeveloperToolkit.tsx";
import {useTranslations} from "next-intl";

export const Informasjon = () => {
    const {data: {userBlocked, open, numRecentlySent} = {userBlocked: false, open: []}, isPending} =
        useGetSessionInfo();
    const t = useTranslations("Informasjon");

    if (userBlocked) return <PersonbeskyttelseFeilmelding />;

    return (
        <main aria-labelledby={"app-heading"}>
            <title>{t("title")}</title>
            {digisosConfig.showDevPanel && <DeveloperToolkit />}
            <div
                className="max-w-lg lg:max-w-3xl w-full mx-auto gap-6 max-lg:px-2 py-6 lg:gap-16 lg:py-16 flex flex-col grow"
                role={"none"}
            >
                <Heading
                    id={"app-heading"}
                    level="1"
                    size="small"
                    className={"lg:!text-heading-xlarge !w-full !p-0 !text-left"}
                >
                    {t("title")}
                </Heading>
                {isPending ? (
                    <ApplicationSpinner />
                ) : (
                    <VStack gap={"5"}>
                        <NySoknadPanel defaultOpen={open?.length === 0} />
                        <PabegynteSoknaderPanel />
                        {!!numRecentlySent && <EttersendDokuPanel />}
                    </VStack>
                )}
            </div>
        </main>
    );
};

export default Informasjon;
