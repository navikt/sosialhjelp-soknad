import * as React from "react";
import {Textarea} from "nav-frontend-skjema";
import {IntlShape, useIntl} from "react-intl";
import {getInputFaktumTekst, getIntlTextOrKey} from "../utils";
import {State} from "../../digisos/redux/reducers";
import {useSelector} from "react-redux";
import {Valideringsfeil} from "../../digisos/redux/validering/valideringActionTypes";

interface Props {
    value: string;
    labelId?: string;
    disabled?: boolean;
    textareaClass?: string;
    maxLength?: number;
    id?: string;
    required?: boolean;
    placeholder?: string;
    hideLabel?: boolean;
    faktumKey: string;
    faktumId?: number;
    getName?: () => string;
    getFeil?: (intl: IntlShape) => string; // Fjern
    onChange?: (event: any) => any;
    onBlur?: () => void;
}

const TextareaEnhanced = (props: Props) => {
    const intl = useIntl();

    const feil = useSelector((state: State) => state.validering.feil);

    const handleOnChange = (evt: any) => {
        if (props.onChange) {
            props.onChange(evt);
        }
    };

    const handleOnBlur = () => {
        if (props.onBlur) {
            props.onBlur();
        }
    };

    const tellerTekst = (antallTegn: number, maxLength: number) => {
        const antallTegnIgjen = maxLength - antallTegn;
        if (antallTegnIgjen > 25) {
            return "";
        } else if (antallTegn > maxLength) {
            return intl.formatMessage(
                {
                    id: "textarea.overmaks",
                },
                {antall: antallTegn - maxLength}
            );
        }
        return intl.formatMessage(
            {
                id: "textarea.undermaks",
            },
            {antall: maxLength - antallTegn}
        );
    };

    const getName = () => {
        return `${props.faktumKey}`.replace(/\./g, "_");
    };

    const getFeil = (): string | null => {
        const feilkode = feil.find((f: Valideringsfeil) => f.faktumKey === props.faktumKey);
        return !feilkode ? null : intl.formatMessage({id: feilkode.feilkode});
    };

    const {labelId, disabled, textareaClass, faktumKey, value} = props;
    const tekster = getInputFaktumTekst(intl, faktumKey);

    let label = labelId ? getIntlTextOrKey(intl, labelId) : tekster.label;
    label = props.hideLabel ? "" : label;

    const feil_ = getFeil();
    return (
        <Textarea
            id={props.id}
            label={label}
            placeholder={props.placeholder}
            value={value}
            name={getName()}
            disabled={disabled}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            feil={feil_ ? feil_ : undefined}
            maxLength={props.maxLength || 400}
            textareaClass={textareaClass || "skjema-texarea--normal"}
            tellerTekst={tellerTekst}
            required={props.required}
        />
    );
};

export default TextareaEnhanced;
