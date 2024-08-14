import * as React from "react";
import {Alert, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {YesNoInput} from "../../../lib/components/form/YesNoInput";
import {useInntekterBostotte} from "../../../lib/hooks/data/useInntekterBostotte";
import {FaroErrorBoundary} from "@grafana/faro-react";
import {BostotteDataVisning} from "./BostotteDataVisning";

const BostotteData = () => {
    const {t} = useTranslation("skjema");
    const {bostotte, dataHentet} = useInntekterBostotte();

    if (!bostotte || !dataHentet) return null;

    return (
        <FaroErrorBoundary fallback={<Alert variant={"warning"}>{t("inntekt.bostotte.nedlasting_feilet")}</Alert>}>
            <BostotteDataVisning bostotte={bostotte} />
        </FaroErrorBoundary>
    );
};

interface Props {
    hideHeading?: boolean;
    skipFirstStep?: boolean;
    hideSamtykkeDescription?: boolean;
}

export const Bostotte = ({hideHeading, skipFirstStep, hideSamtykkeDescription}: Props) => {
    const {t} = useTranslation("skjema");
    const {bekreftelse, dataHentet, setBekreftelse, setSamtykke} = useInntekterBostotte(skipFirstStep);

    return (
        <div className={"space-y-4"}>
            {!hideHeading && (
                <Heading size="medium" level="2">
                    {t("inntekt.bostotte.overskrift")}
                </Heading>
            )}
            {!skipFirstStep && (
                <YesNoInput
                    name={"bostotte-bekreftelse"}
                    legend={t("inntekt.bostotte.sporsmal.sporsmal")}
                    defaultValue={bekreftelse}
                    onChange={(checked) => setBekreftelse(checked)}
                />
            )}
            {bekreftelse && (
                <>
                    <YesNoInput
                        name={"bostotte-samtykke"}
                        legend={t("inntekt.bostotte.gi_samtykke.overskrift")}
                        description={!hideSamtykkeDescription && t("inntekt.bostotte.gi_samtykke.tekst")}
                        onChange={(checked) => setSamtykke(checked)}
                    />
                    {dataHentet && <BostotteData />}
                </>
            )}
        </div>
    );
};
