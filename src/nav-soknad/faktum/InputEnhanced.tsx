import * as React from "react";
import {useIntl} from "react-intl";
import {Feil, Input, InputBredde} from "nav-frontend-skjema";
import {getInputFaktumTekst, replaceDotWithUnderscore,} from "../utils";
import {State} from "../../digisos/redux/reducers";
import {connect} from "react-redux";
import {getFeil} from "../utils/enhancedComponentUtils";
import {Valideringsfeil} from "../../digisos/redux/validering/valideringActionTypes";

export type InputTypes = "text" | "number" | "email" | "tel";

const DEFAULT_MAX_LENGTH = 50;

export interface Props {
    verdi: string;
    onChange: (verdi: string) => void;
    onBlur: () => void;
    onFocus?: () => void;
    faktumKey: string;
    textKey?: string;
    required: boolean;
    feil: Valideringsfeil[];

    disabled?: boolean;
    pattern?: string;
    maxLength?: number;
    minLength?: number;
    bredde?: InputBredde;
    step?: string;
    type?: InputTypes;
    inputRef?: (c: any) => HTMLInputElement;
    id?: string;
    className?: string;
    getName?: () => string;
    faktumIndex?: number;
    getFeil?: () => Feil;
    autoFocus?: boolean;
}

const InputEnhanced = (props: Props) => {
    const intl = useIntl();
    const getName = (): string => {
        return `${props.faktumKey}`.replace(/\./g, "_");
    };

    const {
        faktumKey,
        textKey,
        faktumIndex,
        type,
        disabled,
        pattern,
        required,
        step,
        maxLength = DEFAULT_MAX_LENGTH,
        bredde,
        feil,
        autoFocus,
    } = props;
    const tekster = getInputFaktumTekst(intl, textKey ? textKey : faktumKey);

    const feil_: Feil | undefined = getFeil(feil, intl, faktumKey, faktumIndex);

    return (
        <Input
            id={
                props.id
                    ? replaceDotWithUnderscore(props.id)
                    : faktumKey
            }
            className={
                "input--xxl faktumInput  " +
                (props.className ? props.className : "")
            }
            type={type}
            autoComplete="off"
            name={getName()}
            disabled={disabled}
            value={props.verdi}
            onChange={(evt: any) => props.onChange(evt.target.value)}
            onBlur={() => props.onBlur()}
            onFocus={() => {
                return props.onFocus ? props.onFocus() : null;
            }}
            label={tekster.label}
            placeholder={tekster.pattern}
            feil={feil_}
            maxLength={maxLength}
            bredde={bredde}
            pattern={pattern}
            required={required}
            step={step}
            noValidate={
                true /* Unngå at nettleser validerer og evt. fjerner verdien */
            }
            autoFocus={autoFocus}
        />
    );
};

const mapStateToProps = (state: State) => ({
    feil: state.validering.feil,
});

export default connect(mapStateToProps)(InputEnhanced);
