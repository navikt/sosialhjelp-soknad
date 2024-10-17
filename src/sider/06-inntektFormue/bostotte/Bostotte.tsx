import * as React from "react";
import {Alert, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useInntekterBostotte} from "../../../lib/hooks/data/useInntekterBostotte";
import {FaroErrorBoundary} from "@grafana/faro-react";
import {BostotteDataVisning} from "./BostotteDataVisning";
import {BaseBooleanInputProps, BooleanInput} from "../../../lib/components/form/BooleanInput.tsx";

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
    const {bekreftelse, dataHentet, bostotte, setBekreftelse, setSamtykke} = useInntekterBostotte(skipFirstStep);

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
                    value={bekreftelse}
                    onChange={(checked) => setBekreftelse(checked)}
                    trueLabel={t("avbryt.ja")}
                    falseLabel={t("avbryt.nei")}
                />
            )}
            {bekreftelse && (
                <>
                    <YesNoInput
                        name={"bostotte-samtykke"}
                        legend={t("inntekt.bostotte.gi_samtykke.overskrift")}
                        description={!hideSamtykkeDescription && t("inntekt.bostotte.gi_samtykke.tekst")}
                        onChange={(checked) => {
                            setSamtykke(checked);
                        }}
                        defaultValue={bostotte?.samtykke}
                        value={dataHentet}
                    />
                    {dataHentet && <BostotteData />}
                </>
            )}
        </div>
    );
};

const YesNoInput = React.forwardRef((baseprops: BaseBooleanInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {t} = useTranslation("skjema");
    return (
        <BooleanInput
            ref={ref}
            {...baseprops}
            radioLabels={[t("inntekt.bostotte.gi_samtykke.ja"), t("inntekt.bostotte.gi_samtykke.nei")]}
        />
    );
});
