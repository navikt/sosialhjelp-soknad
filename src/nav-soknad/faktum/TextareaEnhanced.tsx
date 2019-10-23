import * as React from "react";
import {Feil, Textarea} from "nav-frontend-skjema";
import {injectIntl, IntlShape} from "react-intl";
import {getInputFaktumTekst, getIntlTextOrKey, IntlProps} from "../utils";
import {State} from "../../digisos/redux/reducers";
import {connect} from "react-redux";
import {Valideringsfeil} from "../../digisos/redux/validering/valideringActionTypes";

interface OwnProps {
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
    property?: string;
    faktumId?: number;
    getName?: () => string;
    getFeil?: (intl: IntlShape) => Feil; // Fjern
    onChange?: (event: any) => any;
    onBlur?: () => void;
    feil?: any; // Type??
}

type Props = OwnProps & IntlProps;

class TextareaEnhanced extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.tellerTekst = this.tellerTekst.bind(this);
    }

    handleOnChange(evt: any) {
        if(this.props.onChange){
            this.props.onChange(evt);
        }
    }

    handleOnBlur() {
        if(this.props.onBlur){
            this.props.onBlur();
        }
    }

    tellerTekst(antallTegn: number, maxLength: number): string {
        const antallTegnIgjen = maxLength - antallTegn;
        if (antallTegnIgjen > 25) {
            return "";
        } else if (antallTegn > maxLength) {
            return this.props.intl.formatMessage(
                {
                    id: "textarea.overmaks"
                },
                {antall: antallTegn - maxLength}
            );
        }
        return this.props.intl.formatMessage(
            {
                id: "textarea.undermaks"
            },
            {antall: maxLength - antallTegn}
        );
    }

    getName(): string {
        return `${this.props.faktumKey}`.replace(/\./g, "_");
    }

    getFeil(): Feil | null {
        const {faktumKey} = this.props;
        const feilkode = this.props.feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey);
        return !feilkode ? null : {feilmelding: this.props.intl.formatHTMLMessage({id: feilkode.feilkode})};
    }

    render() {
        const {
            labelId,
            disabled,
            textareaClass,
            maxLength,
            intl,
            faktumKey,
            property,
            value,
        } = this.props;
        const tekster = getInputFaktumTekst(intl, faktumKey, property);

        let label = labelId ? getIntlTextOrKey(intl, labelId) : tekster.label;
        label = this.props.hideLabel ? "" : label;

        const feil_ = this.getFeil();
        return (
            <Textarea
                id={this.props.id}
                label={label}
                placeholder={this.props.placeholder}
                value={value}
                name={this.getName()}
                disabled={disabled}
                onChange={this.handleOnChange}
                onBlur={this.handleOnBlur}
                feil={feil_ ? feil_ : undefined}
                maxLength={maxLength || 400}
                textareaClass={textareaClass || "skjema-texarea--normal"}
                tellerTekst={this.tellerTekst}
                required={this.props.required}
            />
        );
    }
}

const mapStateToProps = (state: State) => ({
    feil: state.validering.feil,
});

export default connect(
    mapStateToProps
)(injectIntl(TextareaEnhanced));
