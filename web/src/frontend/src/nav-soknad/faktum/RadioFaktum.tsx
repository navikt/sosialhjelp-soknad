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
import NavFrontendSpinner from "nav-frontend-spinner";

interface OwnProps {
	value: string;
	faktumKey: string;
	disabled?: boolean;
	id?: string;
	label?: any;
	onChange?: any;
	visPanel?: boolean;
	className?: string;
	visSpinner?: boolean;
}

type RadioFaktumProps = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

class RadioFaktum extends React.Component<RadioFaktumProps, {}> {
	constructor(props: RadioFaktumProps) {
		super(props);
	}

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

	defaultOnChange(value: string, property: string) {
		this.props.setFaktumVerdiOgLagre(value, property)
	}

	checked(): boolean {
		const { value, property} = this.props;
		return property
			? this.props.getPropertyVerdi() === value
			: this.props.getFaktumVerdi() === value
	}

	determineOnChange() {
		if (this.props.onChange != null) {
			return this.props.onChange;
		}

		const { value, property } = this.props;
		
		return () => {
			return this.defaultOnChange(value, property);
		}
	}

	renderRadio() {
		const { faktumKey, value, disabled, property, required, intl } = this.props;
		const onChange = this.determineOnChange();

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

	render() {
		const visPanel = (this.props.visPanel != null ? this.props.visPanel : true);
		const { className, visSpinner } = this.props;
		const onChange = this.determineOnChange();
		
		let classNames = "inputPanel " + className;
		if (this.checked()) {
			classNames += " inputPanel__checked";
		}
		if (visSpinner) {
			classNames += " inputPanel--disabled";
		}
		if(visPanel) {
			return (
				<div
					className={classNames}
					onClick={() => onChange()}
				>
					{this.renderRadio()}
					{visSpinner && <div className="inputPanel__spinner"><NavFrontendSpinner type="M" /></div>}
				</div>
			);
		} else {
			return this.renderRadio();
		}
	}
}

export default injectIntl(faktumComponent()(RadioFaktum));
