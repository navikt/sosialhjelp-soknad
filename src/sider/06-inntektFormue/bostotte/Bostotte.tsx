import * as React from "react";
import {Alert, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useInntekterBostotte} from "../../../lib/hooks/data/useInntekterBostotte";
import {FaroErrorBoundary} from "@grafana/faro-react";
import {BostotteDataVisning} from "./BostotteDataVisning";
import {YesNoInput} from "../../../lib/components/form/YesNoInput.tsx";

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
    const {bekreftelse, dataHentet, bostotte, setBekreftelse, setSamtykke, setBostotte, variables, isUpdatePending} =
        useInntekterBostotte();

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
                    value={isUpdatePending ? variables?.data.hasBostotte : bekreftelse}
                    onChange={(checked) => setBekreftelse(checked)}
                    trueLabel={t("avbryt.ja")}
                    falseLabel={t("avbryt.nei")}
                />
            )}
            {(bekreftelse || skipFirstStep) && (
                <>
                    <YesNoInput
                        name={"bostotte-samtykke"}
                        legend={t("inntekt.bostotte.gi_samtykke.overskrift")}
                        description={!hideSamtykkeDescription && t("inntekt.bostotte.gi_samtykke.tekst")}
                        onChange={(value) => {
                            if (skipFirstStep) {
                                setBostotte(true, value);
                            } else {
                                setSamtykke(value);
                            }
                        }}
                        value={isUpdatePending ? variables?.data.hasSamtykke : bostotte?.hasSamtykke}
                        trueLabel={t("inntekt.bostotte.gi_samtykke.ja")}
                        falseLabel={t("inntekt.bostotte.gi_samtykke.nei")}
                    />
                    {dataHentet && <BostotteData />}
                </>
            )}
        </div>
    );
};
