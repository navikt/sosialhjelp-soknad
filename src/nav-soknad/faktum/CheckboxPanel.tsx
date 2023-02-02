import * as React from "react";
import {Checkbox} from "@navikt/ds-react";

interface CheckboxPanelProps {
    id: string;
    name: string;
    checked: boolean;
    disabled?: boolean;
    className?: string;
    label: React.ReactNode | any;
    onClick: (checked: boolean) => void;
}

export const CheckboxPanel = ({id, name, checked, disabled, label, onClick}: CheckboxPanelProps) => (
    <Checkbox
        id={id}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={({target: {checked}}) => onClick(checked)}
    >
        {label}
    </Checkbox>
);

export default CheckboxPanel;
