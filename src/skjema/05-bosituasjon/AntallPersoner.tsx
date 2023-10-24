import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../digisos/redux/reducers";
import {clearValideringsfeil, setValideringsfeil} from "../../digisos/redux/validering/valideringActions";
import {ValideringsFeilKode} from "../../digisos/redux/validering/valideringActionTypes";
import {getFeil} from "../../nav-soknad/utils/enhancedComponentUtils";
import {useBosituasjon} from "./useBosituasjon";
import {useTranslation} from "react-i18next";
import {TextField} from "@navikt/ds-react";

const FAKTUM_KEY_ANTALL = "bosituasjon.antallpersoner";

// Parse og validér antall personer.
// Returnerer en tallstreng ved et gyldig heltall, undefined ved tom streng, ellers exception.
export const validerAntallPersoner = (formValue: string) => {
    if (!formValue.length) return undefined;

    const antallPersoner = parseInt(formValue);
    if (isNaN(antallPersoner)) throw new Error(ValideringsFeilKode.ER_TALL);
    return antallPersoner;
};

const AntallPersoner = () => {
    const {bosituasjon, setBosituasjon} = useBosituasjon();
    const {t} = useTranslation("skjema");

    const dispatch = useDispatch();

    const validationErrors = useSelector((state: State) => state.validering.feil);
    const errorMessage = getFeil(validationErrors, t, FAKTUM_KEY_ANTALL, undefined);

    const validateAndStore = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const antallPersoner = validerAntallPersoner(event.target.value);
            dispatch(clearValideringsfeil(FAKTUM_KEY_ANTALL));
            await setBosituasjon({antallPersoner});
        } catch (_e) {
            dispatch(setValideringsfeil(ValideringsFeilKode.ER_TALL, FAKTUM_KEY_ANTALL));
            return;
        }
    };

    return (
        <TextField
            description={t("bosituasjon.antallpersoner.label")}
            label={t("bosituasjon.antallpersoner.sporsmal")}
            id={FAKTUM_KEY_ANTALL}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            htmlSize={5}
            defaultValue={bosituasjon?.antallPersoner}
            onBlur={validateAndStore}
            onChange={() => dispatch(clearValideringsfeil(FAKTUM_KEY_ANTALL))}
            error={errorMessage && t(errorMessage)}
        />
    );
};

export default AntallPersoner;
