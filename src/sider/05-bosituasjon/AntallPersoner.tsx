import * as React from "react";
import {useBosituasjon} from "../../lib/hooks/data/useBosituasjon";
import {useTranslation} from "react-i18next";
import {TextField} from "@navikt/ds-react";
import {ValideringsFeilKode} from "../../lib/validering";
import {validerAntallPersoner} from "./lib/validerAntallPersoner";
import {useValidering} from "../../lib/hooks/common/useValidering";
import {ValidationArea} from "../../lib/ValidationArea";

export const AntallPersoner = () => {
    const {antallPersoner, setAntallPersoner, isLoading} = useBosituasjon();
    const {t} = useTranslation("skjema");
    const {errorMessage, setError} = useValidering(ValidationArea.BosituasjonAntallPersoner);

    if (isLoading) return null;

    const validateAndSet: React.FocusEventHandler<HTMLInputElement> = async ({target: {value}}) => {
        try {
            await setAntallPersoner(validerAntallPersoner(value));
            setError(null);
        } catch {
            setError(ValideringsFeilKode.ER_TALL);
        }
    };

    const clearValidationErrors = () => setError(null);

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
            onBlur={validateAndSet}
            onChange={clearValidationErrors}
            error={errorMessage}
        />
    );
};
