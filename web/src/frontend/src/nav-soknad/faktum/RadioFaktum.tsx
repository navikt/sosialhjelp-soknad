import * as React from "react";
import { Radio } from "nav-frontend-skjema";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import { getRadioFaktumTekst } from "../utils";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";

interface OwnProps {
	value: string;
	faktumKey: string;
	disabled?: boolean;
}

class RadioFaktum extends React.Component<
	OwnProps & InjectedFaktumComponentProps & InjectedIntlProps,
	{}
> {
	render() {
		const { faktumKey, value, disabled, required, intl } = this.props;
		const tekster = getRadioFaktumTekst(intl, faktumKey, value);
		return (
			<Radio
				name={this.props.getName()}
				checked={this.props.getFaktumVerdi() === value}
				disabled={disabled}
				value={value}
				required={required}
				onChange={(evt: any) => this.props.setFaktumVerdi(value)}
				label={
					<LabelMedHjelpetekst
						id={`${faktumKey}.${value}`}
						label={tekster.label}
						hjelpetekst={tekster.hjelpetekst}
					/>
				}
			/>
		);
	}
}

export default injectIntl(faktumComponent()(RadioFaktum));
