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
	faktumKey: string;
	option: string;
	disabled?: boolean;
	feil?: Feil;
}

class CheckboxFaktum extends React.Component<
	OwnProps & InjectedFaktumComponentProps & InjectedIntlProps,
	{}
> {
	render() {
		const { faktumKey, option, disabled, feil, fakta, intl } = this.props;
		const key = `${faktumKey}.${option}`;
		const tekster = getFaktumCheckboksTekst(intl, key);
		const checked = faktumIsSelected(getFaktumVerdi(fakta, key));
		return (
			<Checkbox
				name={key}
				checked={checked}
				disabled={disabled}
				value={option}
				onChange={(evt: any) =>
					this.props.setFaktumVerdi(boolToString(evt.target.checked))}
				label={
					<LabelMedHjelpetekst
						id={key}
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
