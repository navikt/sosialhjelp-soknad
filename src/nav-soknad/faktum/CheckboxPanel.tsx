import * as React from "react";
import {Checkbox} from "nav-frontend-skjema";

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
        const {id, name, checked, disabled, className, label} = this.props;
        let classNames = "inputPanel " + (className ? className : "");
        if (checked) {
            classNames += " inputPanel__checked";
        }
        return (
            <div className={classNames} onClick={(evt: any) => this.onChange(evt)} id={id + "_klikkbar_div"}>
                <div className="inputPanel__checkbox_wrapper ">
                    <Checkbox
                        id={id}
                        name={name}
                        checked={checked}
                        disabled={disabled}
                        onChange={(evt: any) => this.onClick(evt)}
                        label={label}
                    />
                </div>
            </div>
        );
    }
}

export default CheckboxPanel;
