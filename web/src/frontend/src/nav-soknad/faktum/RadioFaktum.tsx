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
	visPanel?: boolean;
	className?: string;
}

type RadioFaktumProps = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

class RadioFaktum extends React.Component<RadioFaktumProps, {}> {

	constructor(props: RadioFaktumProps) {
		super(props);
	}

	onChange() {
		const { value, property } = this.props;
		this.props.setFaktumVerdiOgLagre(value, property)
	}

	checked(): boolean {
		const { value, property} = this.props;
		return property
			? this.props.getPropertyVerdi() === value
			: this.props.getFaktumVerdi() === value
	}

	renderRadio() {
		const { faktumKey, value, disabled, property, required, intl} = this.props;
		const tekster = getRadioFaktumTekst(intl, faktumKey, value, property);
		const id = this.props.id ? this.props.id : faktumKey.replace(/\./g, "_");

		return (
			<Radio
				className="soknadsosialhjelp"
				id={id}
				name={this.props.getName()}
				checked={this.checked()}
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

	render() {
		const { visPanel, className } = this.props;
		let classNames = "inputPanel " + className;
		if (this.checked()) {
			classNames += " inputPanel__checked";
		}
		if(visPanel) {
			return (
				<div
					className={classNames}
					onClick={() => this.onChange()}
				>
					{this.renderRadio()}
				</div>
			);
		} else {
			return this.renderRadio();
		}
	}
}

export default injectIntl(faktumComponent()(RadioFaktum));
