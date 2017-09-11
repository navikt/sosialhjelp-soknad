import * as React from "react";
import { Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { SoknadAppState, FaktumComponentProps } from "../redux/faktaReducer";
import { setFaktumVerdi } from "../redux/faktaActions";
import { DispatchProps } from "../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import { getInputFaktumTekst, getFaktumVerdi } from "../utils";
import { Select, SelectBredde } from "nav-frontend-skjema";
import { finnFaktum } from "../redux/faktaUtils";

interface OwnProps {
	faktumKey: string;
	disabled?: boolean;
	feil?: Feil;
	bredde?: SelectBredde;
	labelFunc?: (label: string) => React.ReactNode;
}

class FaktumSelect extends React.Component<
	OwnProps & FaktumComponentProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const {
			faktumKey,
			disabled,
			bredde,
			labelFunc,
			fakta,
			children,
			dispatch,
			intl
		} = this.props;
		const tekster = getInputFaktumTekst(intl, faktumKey);
		return (
			<Select
				name={faktumKey}
				disabled={disabled}
				value={getFaktumVerdi(fakta, faktumKey)}
				bredde={bredde}
				onChange={(evt: any) =>
					dispatch(setFaktumVerdi(finnFaktum(faktumKey, this.props.fakta ), evt.target.value))}
				label={
					<LabelMedHjelpetekst
						id={faktumKey}
						label={labelFunc ? labelFunc(tekster.label) : tekster.label}
						hjelpetekst={tekster.hjelpetekst}
					/>
				}
			>
				{children}
			</Select>
		);
	}
}

export default connect((state: SoknadAppState, props: OwnProps) => {
	return {
		fakta: state.faktum.data,
		faktumKey: props.faktumKey
	};
})(injectIntl(FaktumSelect));
