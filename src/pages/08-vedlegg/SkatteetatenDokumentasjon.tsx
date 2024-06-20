import {useSkatteetatenData} from "../../lib/hooks/data/useSkatteetatenData";
import {useTranslation} from "react-i18next";
import {useOpplysningTekster} from "../../lib/hooks/dokumentasjon/useOpplysningTekster";
import {Heading, Link} from "@navikt/ds-react";
import {HentetFraSkatteetaten} from "./HentetFraSkatteetaten";
import {MinusIcon} from "@navikt/aksel-icons";
import * as React from "react";

export const SkatteetatenDokumentasjon = () => {
    const {inntekt, setSamtykke} = useSkatteetatenData();
    const {t} = useTranslation();
    const {sporsmal} = useOpplysningTekster("lonnslipp|arbeid");

    return (
        <div className={"rounded-md bg-surface-action-subtle p-8"}>
            <Heading level={"4"} size={"small"} spacing>
                {sporsmal}
            </Heading>
            <HentetFraSkatteetaten inntekt={inntekt} />
            <Link onClick={() => setSamtykke(false)}>
                <div className={"flex gap-1 items-center !mt-6"}>
                    <MinusIcon aria-label={""} /> {t("utbetalinger.inntekt.skattbar.ta_bort_samtykke")}
                </div>
            </Link>
        </div>
    );
};
