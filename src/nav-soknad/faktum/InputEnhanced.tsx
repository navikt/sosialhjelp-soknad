import * as React from "react";
import {injectIntl} from "react-intl";
import {Feil, Input, InputBredde} from "nav-frontend-skjema";
import {
    getInputFaktumTekst,
    IntlProps,
    replaceDotWithUnderscore,
} from "../utils";
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

class InputEnhanced extends React.Component<Props & IntlProps, {}> {
    getName(): string {
        return `${this.props.faktumKey}`.replace(/\./g, "_");
    }

    render() {
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
        } = this.props;
        const tekster = getInputFaktumTekst(intl, textKey ? textKey : faktumKey);

        const feil_: Feil | undefined = getFeil(feil, intl, faktumKey, faktumIndex);

        return (
            <Input
                id={
                    this.props.id
                        ? replaceDotWithUnderscore(this.props.id)
                        : faktumKey
                }
                className={
                    "input--xxl faktumInput  " +
                    (this.props.className ? this.props.className : "")
                }
                type={type}
                autoComplete="off"
                name={this.getName()}
                disabled={disabled}
                value={this.props.verdi}
                onChange={(evt: any) => this.props.onChange(evt.target.value)}
                onBlur={() => this.props.onBlur()}
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
    }
}

const mapStateToProps = (state: State) => ({
    feil: state.validering.feil,
});

export default connect(mapStateToProps)(injectIntl(InputEnhanced));
