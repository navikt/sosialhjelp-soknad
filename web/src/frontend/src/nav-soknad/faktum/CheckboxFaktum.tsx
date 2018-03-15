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
}

export const createCheckboxFaktumKey = (key: string, option: string) =>
	`${key}.${option}`;

class CheckboxFaktum extends React.Component<
	OwnProps & InjectedFaktumComponentProps & InjectedIntlProps,
	{}
> {
	render() {
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
				onChange={(evt: any) => {
					const value = boolToString(evt.target.checked);
					this.props.setFaktumVerdiOgLagre(value);
					if (this.props.onChange != null) {
						this.props.onChange(value);
					}
				}}
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
}

export default injectIntl(faktumComponent()(CheckboxFaktum));
