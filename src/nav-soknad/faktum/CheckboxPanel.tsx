import * as React from "react";
import {CheckboksPanel} from "nav-frontend-skjema";

interface Props {
    id: string;
    name: string;
    checked: boolean;
    disabled?: boolean;
    className?: string;
    label: React.ReactNode | any;
    onClick: (checked: boolean) => void;
}

class CheckboxPanel extends React.Component<Props, {checked: boolean}> {
    onChange(evt: any) {
        const checked = !this.props.checked;
        this.props.onClick(checked);
        evt.preventDefault();
    }

    onClick(evt: any) {
        evt.preventDefault();
    }

    render() {
        const {id, name, checked, disabled, label} = this.props;

        return (
            <CheckboksPanel
                id={id}
                name={name}
                checked={checked}
                disabled={disabled}
                onChange={(evt: any) => this.onClick(evt)}
                onClick={(evt: any) => this.onChange(evt)}
                label={label}
            />
        );
    }
}

export default CheckboxPanel;
