import * as React from "react";
import {useMemo} from "react";
import {useTitle} from "../../lib/hooks/common/useTitle";
import {SystemError} from "@navikt/ds-icons";
import {BodyShort, Button, Heading} from "@navikt/ds-react";
import {useLocation} from "react-router-dom";
import {AppHeader} from "../../lib/components/appHeader/AppHeader";
import {logError} from "../../lib/log/loggerUtils";
import {logger} from "@navikt/next-logger";
import {TrengerDuRaskHjelp} from "./TrengerDuRaskHjelp.tsx";
import {useTranslations} from "next-intl";
import {ErrorPageColumnarLayout} from "./ErrorPageColumnarLayout.tsx";

const useQuery = ({search}: Pick<Location, "search">) => useMemo(() => new URLSearchParams(search), [search]);

export const ServerFeil = () => {
    const t = useTranslations("ServerFeil");
    const reason = useQuery(useLocation()).get("reason");

    if (process.env.NEXT_PUBLIC_DIGISOS_ENV !== "localhost") {
        // TODO: Gi mer kontekst til dette, men det er nyttig bare å flagge dette
        logger.error(`En bruker har sett ServerFeil - error: ${reason}, referrer: ${document.referrer}`);

        logError(`Viser feilside, error: ${reason}, referrer: ${document.referrer}`);
    }

    useTitle(`Feilside - ${document.location.hostname}`);
    return (
        <section className={"bg-white flex-col flex grow"}>
            <AppHeader />
            <ErrorPageColumnarLayout
                leftMargin={<SystemError className={"text-[var(--a-surface-danger)] w-20 h-20"} />}
            >
                <Heading level="1" size="xlarge" spacing>
                    {t("title")}
                </Heading>

                <Heading level={"2"} size={"large"} spacing>
                    {t("feilmelding")}
                </Heading>

                <Heading level={"2"} size={"medium"} spacing>
                    {t("anbefaling")}
                </Heading>

                <div className={"my-4"}>
                    <Button variant="secondary" onClick={() => (window.location.href = "/sosialhjelp/soknad")}>
                        {t("lenkeTilHovedmeny")}
                    </Button>
                </div>
                <BodyShort spacing>{t("problemetErLogget")}</BodyShort>
            </ErrorPageColumnarLayout>
            <TrengerDuRaskHjelp />
        </section>
    );
};
export default ServerFeil;
