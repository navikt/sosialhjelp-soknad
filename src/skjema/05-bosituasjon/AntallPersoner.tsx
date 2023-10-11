import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../digisos/redux/reducers";
import {clearValideringsfeil, setValideringsfeil} from "../../digisos/redux/validering/valideringActions";
import {ValideringsFeilKode} from "../../digisos/redux/validering/valideringActionTypes";
import {getFeil} from "../../nav-soknad/utils/enhancedComponentUtils";
import {useBosituasjon} from "./useBosituasjon";
import {useTranslation} from "react-i18next";
import {Fieldset, TextField} from "@navikt/ds-react";

const FAKTUM_KEY_ANTALL = "bosituasjon.antallpersoner";

interface AntallPersonerProps {
    behandlingsId: string;
}

// Parse og validér antall personer.
// Returnerer en tallstreng ved et gyldig heltall, null ved tom streng, ellers exception.
export const validerAntallPersoner = (formValue: string) => {
    if (!formValue.length) return null;
    if (Number.isInteger(Number.parseFloat(formValue))) return formValue;
    throw new Error(ValideringsFeilKode.ER_TALL);
};

const AntallPersoner = ({behandlingsId}: AntallPersonerProps) => {
    const {bosituasjon, setBosituasjon} = useBosituasjon(behandlingsId);
    const {t} = useTranslation("skjema");

    const dispatch = useDispatch();

    const validationErrors = useSelector((state: State) => state.validering.feil);
    const errorMessage = getFeil(validationErrors, t, FAKTUM_KEY_ANTALL, undefined);

    const validateAndStore = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let antallPersoner: string | null = null;

        try {
            antallPersoner = validerAntallPersoner(event.target.value);
        } catch (_e) {
            dispatch(setValideringsfeil(ValideringsFeilKode.ER_TALL, FAKTUM_KEY_ANTALL));
            return;
        }

        dispatch(clearValideringsfeil(FAKTUM_KEY_ANTALL));
        await setBosituasjon({antallPersoner});
    };

    return (
        <Fieldset legend={t("bosituasjon.antallpersoner.sporsmal")}>
            <TextField
                label={t("bosituasjon.antallpersoner.label")}
                id={FAKTUM_KEY_ANTALL}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                htmlSize={5}
                defaultValue={bosituasjon?.antallPersoner || ""}
                onBlur={validateAndStore}
                onChange={() => dispatch(clearValideringsfeil(FAKTUM_KEY_ANTALL))}
                error={errorMessage && t(errorMessage)}
            />
        </Fieldset>
    );
};

export default AntallPersoner;
