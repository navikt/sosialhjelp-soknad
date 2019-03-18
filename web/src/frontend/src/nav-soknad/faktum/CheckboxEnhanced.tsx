import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Checkbox } from "nav-frontend-skjema";


interface OwnProps {
    id: string;
    name: string;
    checked: boolean;
    disabled: boolean;
    label: any;
    visPanel: boolean;
    onClick: (s: string) => void;
    required?: boolean;
    className?: string;
    feilkode?: string;
}


type CheckboxFaktumProps = OwnProps & InjectedIntlProps;


class CheckboxEnhanced extends React.Component<CheckboxFaktumProps, {checked: boolean}> {


    renderCheckbox() {

        const { id, name, checked, disabled, required, onClick, label} = this.props;

        return (
            <Checkbox
                id={id}
                name={name}
                checked={checked}
                disabled={disabled}
                required={required}
                onChange={(evt: any) => onClick(evt)}
                label={label}
            />
        );
    }

    render() {
        const visPanel = (this.props.visPanel != null ? this.props.visPanel : true);
        const { className, checked, onClick } = this.props;

        let classNames = "inputPanel " + (className ? className : "");
        if (checked) {
            classNames += " inputPanel__checked";
        }

        if(visPanel) {
            return (
                <div
                    className={classNames}
                    onClick={(evt: any) => onClick(evt)}
                >
                    <div className="inputPanel__checkbox_wrapper ">
                        {this.renderCheckbox()}
                    </div>
                </div>
            );
        } else {
            return this.renderCheckbox();
        }
    }

}

export default injectIntl(CheckboxEnhanced);
