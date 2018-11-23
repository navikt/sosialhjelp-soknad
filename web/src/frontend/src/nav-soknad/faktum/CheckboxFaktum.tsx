import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Checkbox } from "nav-frontend-skjema";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import {
	getFaktumCheckboksTekst,
	faktumIsSelected,
	boolToString,
	getFaktumVerdi
} from "../utils";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";

interface OwnProps {
	disabled?: boolean;
	feilkode?: string;
	onChange?: (s: string) => void;
	id?: string;
	className?: string;
	visPanel?: boolean;
}

type CheckboxFaktumProps = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

export const createCheckboxFaktumKey = (key: string, option: string) =>
	`${key}.${option}`;

class CheckboxFaktum extends React.Component<CheckboxFaktumProps, {checked: boolean}> {

	constructor(props: CheckboxFaktumProps) {
		super(props);
		const { faktumKey,fakta } = this.props;
		const checked = faktumIsSelected(getFaktumVerdi(fakta, faktumKey));
		this.state = {
			checked
		}
	}

	onChange(evt: any) {
		const checked = !this.state.checked;
		this.updateValue(checked);
		evt.preventDefault();
	}

	onClick(evt: any) {
		const visPanel = (this.props.visPanel != null ? this.props.visPanel : true);
		if (visPanel) {
			evt.preventDefault();
		} else {
			const checked = evt.target.checked;
			this.updateValue(checked);
		}
	}

	updateValue(checked: boolean) {
		const value = boolToString(checked);
		this.setState({checked});
		this.props.setFaktumVerdiOgLagre(value);
		if (this.props.onChange != null) {
			this.props.onChange(value);
		}
	}

	renderCheckbox() {
		const { faktumKey, disabled, fakta, required, intl } = this.props;
		const tekster = getFaktumCheckboksTekst(intl, faktumKey);
		const checked = faktumIsSelected(getFaktumVerdi(fakta, faktumKey));
		return (
			<Checkbox
				id={this.props.id ? this.props.id : faktumKey + "_checkbox"}
				name={this.props.getName()}
				checked={checked}
				disabled={disabled}
				required={required}
				onChange={(evt: any) => this.onClick(evt)}
				label={
					<LabelMedHjelpetekst
						id={faktumKey}
						label={tekster.label}
						hjelpetekst={tekster.hjelpetekst}
					/>
				}
				feil={this.props.getFeil(intl)}
			/>
		);
	}

	render() {
		const visPanel = (this.props.visPanel != null ? this.props.visPanel : true);
		const {className, fakta, faktumKey } = this.props;
		const checked = faktumIsSelected(getFaktumVerdi(fakta, faktumKey));
		let classNames = "inputPanel " + (className ? className : "");
		if (checked) {
			classNames += " inputPanel__checked";
		}
		if(visPanel) {
			return (
				<div
					className={classNames}
					onClick={(evt: any) => this.onChange(evt)}
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

export default injectIntl(faktumComponent()(CheckboxFaktum));
