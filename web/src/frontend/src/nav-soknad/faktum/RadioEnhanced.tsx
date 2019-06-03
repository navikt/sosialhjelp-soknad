import * as React from "react";
import { Radio } from "nav-frontend-skjema";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getRadioFaktumTekst } from "../utils";
import { CheckboxFaktumTekst } from "../types/index";
import NavFrontendSpinner from "nav-frontend-spinner";
import TextPlaceholder from "../components/animasjoner/placeholder/TextPlaceholder";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";

interface OwnProps {
	value: string;
	checked?: null | boolean;
	faktumKey?: string;
	disabled?: boolean;
	id?: string;
	label?: any;
	onChange?: any;
	visPanel?: boolean;
	className?: string;
	visSpinner?: boolean;
	property?: any; // TODO: Slette?
	required?: boolean;
	getName?: () => string;
	visPlaceholder?: boolean;
}

type RadioFaktumProps = OwnProps & InjectedIntlProps;

class RadioEnhanced extends React.Component<RadioFaktumProps, {}> {
	constructor(props: RadioFaktumProps) {
		super(props);
	}

	determineLabel(id: string, faktumKey: string, tekster: CheckboxFaktumTekst, value: string) {
		if (this.props.visPlaceholder) {
			return <TextPlaceholder lines={1} style={{marginTop: "4px", width: "4rem"}}/>
		}
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
		console.warn("defaultOnChange()");
	}

	checked(): boolean {
		const { checked } = this.props;
		return (checked && checked === true) ? true : false;
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
		const name = this.props.getName ? this.props.getName() : this.props.faktumKey + "-" + this.props.value;
		return (
			<Radio
				className="soknadsosialhjelp"
				id={id}
				name={name}
				checked={this.checked()}
				disabled={disabled}
				value={"false"}
				required={required}
				onChange={(evt: any) => {
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

	renderMockRadio() {
		const { faktumKey, value, property, intl } = this.props;
		const tekster = getRadioFaktumTekst(intl, faktumKey, value, property);
		const id = this.props.id ? this.props.id : faktumKey.replace(/\./g, "_");
		return (
			<div className="radio-button-wrapper">
				{this.determineLabel(id, faktumKey, tekster, value)}
			</div>

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

export default injectIntl(RadioEnhanced);
