import * as React from "react";
import { Radio } from "nav-frontend-skjema";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import { getRadioFaktumTekst } from "../utils";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";
import { CheckboxFaktumTekst } from "../types/index";

interface OwnProps {
	value: string;
	faktumKey: string;
	disabled?: boolean;
	id?: string;
	label?: any;
	onChange?: any;
}

class RadioFaktum extends React.Component<
	OwnProps & InjectedFaktumComponentProps & InjectedIntlProps,
	{}
> {
	determineLabel(id: string, faktumKey: string, tekster: CheckboxFaktumTekst, value: string) {
		if (this.props.label != null) {
			return this.props.label;
		}
		return <LabelMedHjelpetekst
			labelId={id + "_label"}
			id={`${faktumKey}.${value}`}
			label={tekster.label}
			hjelpetekst={tekster.hjelpetekst}
		/>;
	}

	render() {
		const { faktumKey, value, disabled, property, required, intl, onChange } = this.props;
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
				onChange={(evt: any) => {
					this.props.setFaktumVerdiOgLagre(value, property);
					if (onChange != null) {
						onChange(evt);
					}
				}}
				label={
					this.determineLabel(id, faktumKey, tekster, value)
				}
			/>
		);
	}
}

export default injectIntl(faktumComponent()(RadioFaktum));
