import * as React from "react";
import {Radio} from "nav-frontend-skjema";
import {injectIntl, InjectedIntlProps} from "react-intl";
import {getRadioFaktumTekst} from "../utils";
import {CheckboxFaktumTekst} from "../types/index";
import NavFrontendSpinner from "nav-frontend-spinner";
import TextPlaceholder from "../components/animasjoner/placeholder/TextPlaceholder";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";

interface OwnProps {
    value: string;
    checked?: null | boolean;
    faktumKey?: string;
    disabled?: boolean;
    id?: string;
    label?: any;
    onChange: any;
    className?: string;
    visSpinner?: boolean;
    property?: any; // TODO: Slette?
    required?: boolean;
    getName?: () => string;
    visPlaceholder?: boolean;
}

type RadioFaktumProps = OwnProps & InjectedIntlProps;

class RadioEnhanced extends React.Component<RadioFaktumProps, {}> {
    constructor(props: RadioFaktumProps) {
        super(props);
    }

    determineLabel(id: string, faktumKey: string, tekster: CheckboxFaktumTekst, value: string) {
        if (this.props.visPlaceholder) {
            return <TextPlaceholder lines={1} style={{marginTop: "4px", width: "4rem"}}/>
        }
        if (this.props.label != null) {
            return this.props.label;
        }
        return <LabelMedHjelpetekst
            labelId={id + "_label"}
            id={`${faktumKey}.${value}`}
            label={tekster.label}
            hjelpetekst={tekster.hjelpetekst}
        />;
    }

    checked(): boolean {
        const {checked} = this.props;
        return !!(checked);
    }

    handleOnClick(event: any) {
        if (this.props.onChange != null) {
            this.props.onChange();
        }
        event.preventDefault();
    }

    renderRadio() {
        const {faktumKey, value, disabled, property, required, intl} = this.props;
        const tekster = getRadioFaktumTekst(intl, faktumKey ? faktumKey : "", value, property);
        const id = this.props.id ? this.props.id : (faktumKey ? faktumKey.replace(/\./g, "_") : "");
        const name = this.props.getName ? this.props.getName() : this.props.faktumKey + "-" + this.props.value;
        return (
            <Radio
                className="soknadsosialhjelp"
                id={id}
                name={name}
                checked={this.checked()}
                disabled={disabled}
                value={value}
                required={required}
                label={
                    this.determineLabel(id, faktumKey ? faktumKey : "", tekster, value)
                }
                readOnly={true}
            />
        );
    }

    renderMockRadio() {
        const {faktumKey, value, property, intl} = this.props;
        const tekster = getRadioFaktumTekst(intl, faktumKey ? faktumKey : "", value, property);
        const id = this.props.id ? this.props.id : ( faktumKey ? faktumKey.replace(/\./g, "_") : "");
        return (
            <div className="radio-button-wrapper">
                {this.determineLabel(id, faktumKey ? faktumKey : "", tekster, value)}
            </div>

        );
    }

    render() {
        const {className, visSpinner} = this.props;
        let classNames = "inputPanel " + className;

        if (this.checked()) {
            classNames += " inputPanel__checked";
        }
        if (visSpinner) {
            classNames += " inputPanel--disabled";
        }

        return (
            <div
                className={classNames}
                onClick={(event: any) => this.handleOnClick(event)}
            >
                {this.renderRadio()}
                {visSpinner && <div className="inputPanel__spinner"><NavFrontendSpinner type="M"/></div>}
            </div>
        );
    }
}

export default injectIntl(RadioEnhanced);
