import * as React from "react";
import {PersonbeskyttelseFeilmelding} from "./PersonbeskyttelseFeilmelding";
import {NySoknadPanel} from "./paneler/NySoknad";
import {PabegynteSoknaderPanel} from "./paneler/PabegynteSoknader";
import {EttersendDokuPanel} from "./paneler/EttersendDokuPanel";
import {useTranslation} from "react-i18next";
import {useGetSessionInfo} from "../../generated/informasjon-ressurs/informasjon-ressurs";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner.tsx";
import {Heading, VStack} from "@navikt/ds-react";
import {PabegyntSoknad} from "../../generated/model/pabegyntSoknad.ts";
import digisosConfig from "../../lib/config.ts";
import DeveloperToolkit from "../../lib/components/appHeader/DeveloperToolkit.tsx";

const PanelStack = ({open}: {open: PabegyntSoknad[]}) => (
    <VStack as={"main"} gap={"5"}>
        <NySoknadPanel defaultOpen={open?.length === 0} />
        <PabegynteSoknaderPanel />
        <EttersendDokuPanel />
    </VStack>
);

export const Informasjon = () => {
    const {data: {userBlocked, open} = {userBlocked: false, open: []}, isPending} = useGetSessionInfo();
    const {t} = useTranslation();

    if (userBlocked) return <PersonbeskyttelseFeilmelding />;

    return (
        <>
            {digisosConfig.showDevPanel && <DeveloperToolkit />}
            <div className="max-w-lg lg:max-w-3xl w-full mx-auto gap-6 max-lg:px-2 py-6 lg:gap-16 lg:py-16 flex flex-col grow">
                <title>{t("applikasjon.sidetittel.stringValue")}</title>
                <VStack as="header" gap={"4"} className={"w-full"}>
                    <Heading level="1" size="small" className={"lg:!text-heading-xlarge !w-full !p-0 !text-left"}>
                        {t("skjema.tittel")}
                    </Heading>
                </VStack>
                {isPending ? <ApplicationSpinner /> : <PanelStack open={open} />}
            </div>
        </>
    );
};

export default Informasjon;
