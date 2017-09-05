import * as React from "react";
import { Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumStoreState, FaktumComponentProps } from "../redux/reducer";
import { setFaktumVerdi } from "../redux/actions";
import { DispatchProps } from "../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import { getInputFaktumTekst } from "../utils";
import { Select, SelectBredde } from "nav-frontend-skjema";

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
				value={fakta.get(faktumKey) && fakta.get(faktumKey).value}
				bredde={bredde}
				onChange={(evt: any) =>
					dispatch(setFaktumVerdi(faktumKey, evt.target.value))}
				label={
					<LabelMedHjelpetekst
						id={faktumKey}
						label={labelFunc ? labelFunc(tekster.label) : tekster.label}
						hjelpetekst={tekster.hjelpetekst}
					/>
				}>
				{children}
			</Select>
		);
	}
}

export default connect((state: FaktumStoreState, props: OwnProps) => {
	return {
		fakta: state.faktumStore.fakta,
		faktumKey: props.faktumKey
	};
})(injectIntl(FaktumSelect));
