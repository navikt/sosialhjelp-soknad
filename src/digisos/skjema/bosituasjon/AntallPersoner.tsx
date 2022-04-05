import * as React from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import {clearValideringsfeil, setValideringsfeil} from "../../redux/validering/valideringActions";
import {ValideringsFeilKode} from "../../redux/validering/valideringActionTypes";
import {getFeil} from "../../../nav-soknad/utils/enhancedComponentUtils";
import {Input, SkjemaGruppe} from "nav-frontend-skjema";
import {useBosituasjon} from "./useBosituasjon";

const FAKTUM_KEY_ANTALL = "bosituasjon.antallpersoner";

interface AntallPersonerProps {
    behandlingsId: string;
}

// Parse og validér antall personer. Returnerer null ved tom streng,
// en tallstreng ved et gyldig heltall, ellers en exception.
export const validerAntallPersoner = (formValue: string) => {
    if (!formValue.length) {
        return null;
    } else {
        if (!Number.isInteger(Number.parseInt(formValue))) {
            throw new Error("Må være heltall");
        } else {
            return formValue;
        }
    }
};

const AntallPersoner = ({behandlingsId}: AntallPersonerProps) => {
    const {bosituasjon, setBosituasjon} = useBosituasjon(behandlingsId);

    const intl = useIntl();
    const dispatch = useDispatch();

    const validationErrors = useSelector((state: State) => state.validering.feil);
    const errorMessage = getFeil(validationErrors, intl, FAKTUM_KEY_ANTALL, undefined);

    const validateAndStore = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // The value is optional, so if it's empty, we just store null
        var antallPersoner: string | null;
        try {
            antallPersoner = validerAntallPersoner(event.target.value);
        } catch (error) {
            dispatch(setValideringsfeil(ValideringsFeilKode.ER_TALL, FAKTUM_KEY_ANTALL));
            return;
        }
        dispatch(clearValideringsfeil(FAKTUM_KEY_ANTALL));
        await setBosituasjon({antallPersoner});
    };

    return (
        <SkjemaGruppe
            legend={
                <FormattedMessage
                    id={"bosituasjon.antallpersoner.sporsmal"}
                    defaultMessage={"Hvor mange personer bor sammen med deg?"}
                />
            }
        >
            <Input
                description={<FormattedMessage id={"bosituasjon.antallpersoner.label"} defaultMessage={"Antall"} />}
                id={FAKTUM_KEY_ANTALL}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                bredde={"XS"}
                defaultValue={bosituasjon.antallPersoner || ""}
                onBlur={validateAndStore}
                onChange={() => dispatch(clearValideringsfeil(FAKTUM_KEY_ANTALL))}
                feil={errorMessage}
            />
        </SkjemaGruppe>
    );
};

export default AntallPersoner;
