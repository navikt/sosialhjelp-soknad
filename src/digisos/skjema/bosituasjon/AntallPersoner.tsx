import * as React from "react";
import {ChangeEvent} from "react";
import {useIntl} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import {clearValideringsfeil, setValideringsfeil} from "../../redux/validering/valideringActions";
import {ValideringsFeilKode} from "../../redux/validering/valideringActionTypes";
import {getFeil} from "../../../nav-soknad/utils/enhancedComponentUtils";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {Input} from "nav-frontend-skjema";
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
ee;

export const AntallPersoner = ({behandlingsId}: AntallPersonerProps) => {
    const {bosituasjon, setBosituasjon} = useBosituasjon(behandlingsId);

    const intl = useIntl();
    const dispatch = useDispatch();

    const validationErrors = useSelector((state: State) => state.validering.feil);
    const errorMessage = getFeil(validationErrors, intl, FAKTUM_KEY_ANTALL, undefined);

    if (!bosituasjon) return null;

    const onChange = () => {
        dispatch(clearValideringsfeil(FAKTUM_KEY_ANTALL));
    };

    const onBlur = async (e: ChangeEvent<HTMLInputElement>) => {
        // The value is optional, so if it's empty, we just store null
        var antallPersoner: string | null;
        try {
            antallPersoner = validerAntallPersoner(e.target.value);
        } catch (e) {
            dispatch(setValideringsfeil(ValideringsFeilKode.ER_TALL, FAKTUM_KEY_ANTALL));
            return;
        }
        dispatch(clearValideringsfeil(FAKTUM_KEY_ANTALL));
        await setBosituasjon({antallPersoner});
    };

    return (
        <Sporsmal sprakNokkel={FAKTUM_KEY_ANTALL} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
            <Input
                id={FAKTUM_KEY_ANTALL}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={2}
                bredde={"XS"}
                className="skjemaelement__enLinje185bredde"
                onBlur={onBlur}
                onChange={onChange}
                required={false}
                feil={errorMessage}
                defaultValue={bosituasjon.antallPersoner || ""}
            />
        </Sporsmal>
    );
};

export default AntallPersoner;
