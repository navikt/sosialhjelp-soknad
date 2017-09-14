import * as React from "react";
import { Checkbox, Feil } from "nav-frontend-skjema";
import { injectIntl, InjectedIntlProps } from "react-intl";
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
	feil?: Feil;
}

export const createCheckboxFaktumKey = (key: string, option: string) =>
	`${key}.${option}`;

class CheckboxFaktum extends React.Component<
	OwnProps & InjectedFaktumComponentProps & InjectedIntlProps,
	{}
> {
	render() {
		const { faktumKey, disabled, feil, fakta, intl } = this.props;
		const tekster = getFaktumCheckboksTekst(intl, faktumKey);
		const checked = faktumIsSelected(getFaktumVerdi(fakta, faktumKey));
		return (
			<Checkbox
				name={faktumKey}
				checked={checked}
				disabled={disabled}
				onChange={(evt: any) =>
					this.props.setFaktumVerdi(boolToString(evt.target.checked))}
				label={
					<LabelMedHjelpetekst
						id={faktumKey}
						label={tekster.label}
						hjelpetekst={tekster.hjelpetekst}
					/>
				}
				feil={feil}
			/>
		);
	}
}

export default injectIntl(faktumComponent()(CheckboxFaktum));
