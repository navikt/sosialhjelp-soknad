import * as React from "react";
import {ChangeEvent, SetStateAction} from "react";
import {useIntl} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import {clearValideringsfeil, setValideringsfeil} from "../../redux/validering/valideringActions";
import {ValideringsFeilKode} from "../../redux/validering/valideringActionTypes";
import {getFeil} from "../../../nav-soknad/utils/enhancedComponentUtils";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {Input} from "nav-frontend-skjema";

const FAKTUM_KEY_ANTALL = "bosituasjon.antallpersoner";

interface AntallPersonerProps {
    antallPersoner?: string;
    setAntallPersoner: React.Dispatch<SetStateAction<string | undefined>>;
}

export const AntallPersoner = ({antallPersoner, setAntallPersoner}: AntallPersonerProps) => {
    const intl = useIntl();
    const dispatch = useDispatch();

    const validationErrors = useSelector((state: State) => state.validering.feil);
    const errorMessage = getFeil(validationErrors, intl, FAKTUM_KEY_ANTALL, undefined);

    const onChange = () => {
        dispatch(clearValideringsfeil(FAKTUM_KEY_ANTALL));
    };

    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        if (antallPersoner?.length && !Number.isInteger(Number.parseInt(antallPersoner))) {
            dispatch(setValideringsfeil(ValideringsFeilKode.ER_TALL, FAKTUM_KEY_ANTALL));
        } else {
            dispatch(clearValideringsfeil(FAKTUM_KEY_ANTALL));
            setAntallPersoner(e.target.value);
        }
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
            />
        </Sporsmal>
    );
};
