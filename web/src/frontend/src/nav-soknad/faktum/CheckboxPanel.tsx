import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Checkbox } from "nav-frontend-skjema";


interface OwnProps {
    id: string;
    name: string;
    checked: boolean;
    disabled: boolean;
    label: any;
    onClick: (s: string) => void;
    required?: boolean;
    className?: string;
    feilkode?: string;
}


type CheckboxFaktumProps = OwnProps & InjectedIntlProps;


class CheckboxPanel extends React.Component<CheckboxFaktumProps, {checked: boolean}> {

    render() {
        const { id, name, checked, disabled, required, onClick, label, className } = this.props;
        let classNames = "inputPanel " + (className ? className : "");
        if (checked) {
            classNames += " inputPanel__checked";
        }

        return (
            <div
                className={classNames}
                onClick={(evt:any) => onClick(evt)}
            >
                <div className="inputPanel__checkbox_wrapper ">
                    <Checkbox
                        id={id}
                        name={name}
                        checked={checked}
                        disabled={disabled}
                        required={required}
                        label={label}
                    />
                </div>
            </div>
        );
    }
}

export default injectIntl(CheckboxPanel);
