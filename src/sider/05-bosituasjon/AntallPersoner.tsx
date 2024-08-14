import * as React from "react";
import {useBosituasjon} from "../../lib/hooks/data/useBosituasjon";
import {useTranslation} from "react-i18next";
import {TextField} from "@navikt/ds-react";
import {ValideringsFeilKode} from "../../lib/validering";
import {validerAntallPersoner} from "./lib/validerAntallPersoner";
import {useValidering} from "../../lib/hooks/common/useValidering";
import {ValidationArea} from "../../lib/ValidationArea";

export const AntallPersoner = () => {
    const {antallPersoner, setBosituasjon} = useBosituasjon();
    const {t} = useTranslation("skjema");

    const {errorMessage, setError} = useValidering(ValidationArea.BosituasjonAntallPersoner);

    return (
        <TextField
            className={"mb-12 lg:mb-24"}
            description={t("bosituasjon.antallpersoner.label")}
            label={t("bosituasjon.antallpersoner.sporsmal")}
            id={ValidationArea.BosituasjonAntallPersoner}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            htmlSize={5}
            defaultValue={antallPersoner}
            onBlur={async ({target: {value}}) => {
                try {
                    await setBosituasjon({antallPersoner: validerAntallPersoner(value)});
                    setError(null);
                } catch {
                    setError(ValideringsFeilKode.ER_TALL);
                }
            }}
            onChange={() => setError(null)}
            error={errorMessage}
        />
    );
};
