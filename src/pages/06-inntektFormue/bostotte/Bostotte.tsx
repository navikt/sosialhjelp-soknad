import * as React from "react";
import {Alert, Button, Detail, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {YesNoInput} from "../../../lib/components/form/YesNoInput";
import {useInntekterBostotte} from "../../../lib/hooks/data/useInntekterBostotte";
import {FaroErrorBoundary} from "@grafana/faro-react";
import {formatDistance} from "date-fns";
import {getDateFnLocale} from "../../../lib/i18n";
import {BostotteDataVisning} from "./BostotteDataVisning";

const BostotteData = () => {
    const {t} = useTranslation("skjema");
    const {bostotte, setSamtykke, dataHentet} = useInntekterBostotte();

    if (!bostotte || !dataHentet) return null;

    return (
        <FaroErrorBoundary fallback={<Alert variant={"warning"}>{t("inntekt.bostotte.nedlasting_feilet")}</Alert>}>
            <Detail>
                {t("inntekt.bostotte.husbanken.info")}{" "}
                {formatDistance(new Date(bostotte.samtykkeTidspunkt!), new Date(), {
                    addSuffix: true,
                    locale: getDateFnLocale(),
                })}
                .
            </Detail>
            <BostotteDataVisning bostotte={bostotte} />
            <Button
                variant="secondary"
                size={"small"}
                id="ta_bort_bostotte_samtykke"
                onClick={() => setSamtykke(false)}
            >
                {t("inntekt.bostotte.ta_bort_samtykke")}
            </Button>
        </FaroErrorBoundary>
    );
};

export const Bostotte = () => {
    const {t} = useTranslation("skjema");
    const {bostotte, bekreftelse, dataHentet, setBekreftelse, setSamtykke} = useInntekterBostotte();

    return (
        <div className={"space-y-4"}>
            <Heading size="medium" level="2">
                {t("inntekt.bostotte.overskrift")}
            </Heading>
            <YesNoInput
                name={"bostotte-bekreftelse"}
                legend={t("inntekt.bostotte.sporsmal.sporsmal")}
                defaultValue={bekreftelse}
                onChange={(checked) => setBekreftelse(checked)}
            />
            {bekreftelse &&
                (!dataHentet ? (
                    <YesNoInput
                        name={"bostotte-samtykke"}
                        legend={t("inntekt.bostotte.gi_samtykke.overskrift")}
                        description={t("inntekt.bostotte.gi_samtykke.tekst")}
                        defaultValue={bostotte?.samtykke}
                        onChange={(checked) => setSamtykke(checked)}
                    />
                ) : (
                    <BostotteData />
                ))}
        </div>
    );
};
