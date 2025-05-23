import * as React from "react";
import "./overrides.css";
import {PersonbeskyttelseFeilmelding} from "./PersonbeskyttelseFeilmelding";
import {NySoknadPanel} from "./nySoknad/NySoknadPanel.tsx";
import {PabegynteSoknaderPanel} from "./PabegynteSoknader.tsx";
import {EttersendDokuPanel} from "./EttersendDokuPanel.tsx";
import {Heading, VStack} from "@navikt/ds-react";
import {useTranslations} from "next-intl";
import {useContextSessionInfo} from "../../lib/providers/useContextSessionInfo.ts";
import {SoknadApiErrorError} from "../../generated/model";
import {useEffect, useState} from "react";

const useIsBlocked = (): boolean => {
    const [isBlocked, setIsBlocked] = useState<boolean>(false);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const status = urlSearchParams.get("reason");
        const type = urlSearchParams.get("type") as SoknadApiErrorError;
        setIsBlocked(status === "axios403" && type === SoknadApiErrorError.NoAccess);
    }, []);

    return isBlocked;
};

export const Informasjon = () => {
    const {open, numRecentlySent} = useContextSessionInfo();
    const t = useTranslations("Informasjon");
    const isUserBlocked: boolean = useIsBlocked();

    if (isUserBlocked) return <PersonbeskyttelseFeilmelding />;

    return (
        <main aria-labelledby={"app-heading"}>
            <title>{t("title")}</title>
            {/*{digisosConfig.showDevPanel && <DeveloperToolkit />}*/}
            <div
                className="max-w-lg lg:max-w-3xl w-full mx-auto gap-6 max-lg:px-2 py-6 lg:gap-16 lg:py-16 flex flex-col grow"
                role={"none"}
            >
                <Heading
                    id={"app-heading"}
                    level="1"
                    size="small"
                    className={"lg:text-heading-xlarge! w-full! p-0! text-left!"}
                >
                    {t("title")}
                </Heading>
                <VStack gap={"5"}>
                    <NySoknadPanel defaultOpen={open?.length === 0} />
                    <PabegynteSoknaderPanel />
                    {!!numRecentlySent && <EttersendDokuPanel />}
                </VStack>
            </div>
        </main>
    );
};

export default Informasjon;
