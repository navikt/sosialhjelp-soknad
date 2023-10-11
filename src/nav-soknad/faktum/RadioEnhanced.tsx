import React from "react";
import {RadioPanel} from "nav-frontend-skjema";
import {getIntlTextOrKey} from "../utils";
import TextPlaceholder from "../components/animasjoner/placeholder/TextPlaceholder";
import {useTranslation} from "react-i18next";

interface Props {
    value: string;
    checked?: null | boolean;
    faktumKey?: string;
    disabled?: boolean;
    id?: string;
    label?: any;
    onChange: any;
    className?: string;
    required?: boolean;
    name?: string;
    visPlaceholder?: boolean;
}

const RadioEnhanced = (props: Props) => {
    const {t} = useTranslation("skjema");

    const determineLabel = (faktumKey: string, label: string, value: string) => {
        if (props.visPlaceholder) {
            return <TextPlaceholder lines={1} style={{marginTop: "4px", width: "4rem"}} />;
        }
        if (props.label != null) {
            return props.label;
        }
        return <span id={`${faktumKey}.${value}`}>{label}</span>;
    };

    const checked = (): boolean => {
        return !!props.checked;
    };

    const label = getIntlTextOrKey(t, props.faktumKey ? `${props.faktumKey}.${props.value}` : "");
    const faktumKey = props.faktumKey ? props.faktumKey.replace(/\./g, "_") : "";
    const id = props.id ? props.id : faktumKey;

    return (
        <RadioPanel
            id={id}
            name={props.name}
            checked={checked()}
            disabled={props.disabled}
            value={props.value}
            required={props.required}
            onChange={props.onChange}
            label={determineLabel(props.faktumKey ? props.faktumKey : "", label, props.value)}
        />
    );
};

export default RadioEnhanced;
