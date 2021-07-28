import React from "react";
import {RadioPanel} from "nav-frontend-skjema";
import {getRadioFaktumTekst} from "../utils";
import NavFrontendSpinner from "nav-frontend-spinner";
import TextPlaceholder from "../components/animasjoner/placeholder/TextPlaceholder";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import {useIntl} from "react-intl";

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

const RadioEnhanced = (props: Props) => {
    const intl = useIntl();

    const determineLabel = (id: string, faktumKey: string, tekster: any, value: string) => {
        if (props.visPlaceholder) {
            return <TextPlaceholder lines={1} style={{marginTop: "4px", width: "4rem"}} />;
        }
        if (props.label != null) {
            return props.label;
        }
        return (
            <LabelMedHjelpetekst
                labelId={id + "_label"}
                id={`${faktumKey}.${value}`}
                label={tekster.label}
                hjelpetekst={tekster.hjelpetekst}
            />
        );
    };

    const checked = (): boolean => {
        return !!props.checked;
    };

    if (props.visSpinner) {
        return (
            <div className="inputPanel__spinner">
                <NavFrontendSpinner type="M" />
            </div>
        );
    }

    const tekster = getRadioFaktumTekst(intl, props.faktumKey ? props.faktumKey : "", props.value, props.property);
    const id = props.id ? props.id : props.faktumKey ? props.faktumKey.replace(/\./g, "_") : "";

    return (
        <div className={props.className}>
            <RadioPanel
                id={id}
                name={props.name}
                checked={checked()}
                disabled={props.disabled}
                value={props.value}
                required={props.required}
                onChange={props.onChange}
                label={determineLabel(id, props.faktumKey ? props.faktumKey : "", tekster, props.value)}
            />
        </div>
    );
};

export default RadioEnhanced;
