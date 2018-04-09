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
	id?: string;
}

class RadioFaktum extends React.Component<
	OwnProps & InjectedFaktumComponentProps & InjectedIntlProps,
	{}
> {
	render() {
		const { faktumKey, value, disabled, property, required, intl } = this.props;
		const tekster = getRadioFaktumTekst(intl, faktumKey, value, property);
		const id = this.props.id ? this.props.id : faktumKey.replace(/\./g, "_");
		return (
			<Radio
				id={id}
				name={this.props.getName()}
				checked={
					property
						? this.props.getPropertyVerdi() === value
						: this.props.getFaktumVerdi() === value
				}
				disabled={disabled}
				value={value}
				required={required}
				onChange={(evt: any) =>
					this.props.setFaktumVerdiOgLagre(value, property)}
				label={
					<LabelMedHjelpetekst
						labelId={id + "_label"}
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
