import * as React from "react";
import { Radio } from "nav-frontend-skjema";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import { getRadioFaktumTekst, getFaktumVerdi } from "../utils";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";

interface OwnProps {
	option: string;
	faktumKey: string;
	disabled?: boolean;
}

class RadioFaktum extends React.Component<
	OwnProps & InjectedFaktumComponentProps & InjectedIntlProps,
	{}
> {
	render() {
		const { faktumKey, option, disabled, fakta, intl } = this.props;
		const tekster = getRadioFaktumTekst(intl, faktumKey, option);
		return (
			<Radio
				name={faktumKey}
				checked={getFaktumVerdi(fakta, faktumKey) === option}
				disabled={disabled}
				value={option}
				onChange={(evt: any) => this.props.setFaktumVerdi(option)}
				label={
					<LabelMedHjelpetekst
						id={`${faktumKey}.${option}`}
						label={tekster.label}
						hjelpetekst={tekster.hjelpetekst}
					/>
				}
			/>
		);
	}
}

export default injectIntl(faktumComponent()(RadioFaktum));
