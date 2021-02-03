import * as React from "react";
import {RadioPanel} from "nav-frontend-skjema";
import {injectIntl} from "react-intl";
import {getRadioFaktumTekst, IntlProps} from "../utils";
import NavFrontendSpinner from "nav-frontend-spinner";
import TextPlaceholder from "../components/animasjoner/placeholder/TextPlaceholder";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";

interface Props {
    value: string;
    checked?: null | boolean;
    faktumKey?: string;
    disabled?: boolean;
    id: string;
    label?: any;
    onChange: any;
    className?: string;
    visSpinner?: boolean;
    property?: any; // TODO: Slette?
    required?: boolean;
    name: string;
    visPlaceholder?: boolean;
}

class RadioEnhanced extends React.Component<Props & IntlProps, {}> {
    determineLabel(id: string, faktumKey: string, tekster: any, value: string) {
        if (this.props.visPlaceholder) {
            return <TextPlaceholder lines={1} style={{marginTop: "4px", width: "4rem"}} />;
        }
        if (this.props.label != null) {
            return this.props.label;
        }
        return (
            <LabelMedHjelpetekst
                labelId={id + "_label"}
                id={`${faktumKey}.${value}`}
                label={tekster.label}
                hjelpetekst={tekster.hjelpetekst}
            />
        );
    }

    checked(): boolean {
        const {checked} = this.props;
        return !!checked;
    }

    handleOnChange(event: any) {
        if (this.props.onChange != null) {
            this.props.onChange();
        }
        event.preventDefault();
    }

    renderRadio() {
        const {faktumKey, value, disabled, property, required, intl} = this.props;
        const tekster = getRadioFaktumTekst(intl, faktumKey ? faktumKey : "", value, property);
        const id = this.props.id ? this.props.id : faktumKey ? faktumKey.replace(/\./g, "_") : "";
        return (
            <div className={this.props.className}>
                <RadioPanel
                    id={id}
                    name={this.props.name}
                    checked={this.checked()}
                    disabled={disabled}
                    value={value}
                    required={required}
                    onChange={(event: any) => this.handleOnChange(event)}
                    label={this.determineLabel(id, faktumKey ? faktumKey : "", tekster, value)}
                />
            </div>
        );
    }

    render() {
        const {visSpinner} = this.props;

        return (
            <>
                {this.renderRadio()}
                {visSpinner && (
                    <div className="inputPanel__spinner">
                        <NavFrontendSpinner type="M" />
                    </div>
                )}
            </>
        );
    }
}

export default injectIntl(RadioEnhanced);
