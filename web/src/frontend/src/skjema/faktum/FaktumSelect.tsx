import * as React from "react";
import { Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../reducer";
import { setFaktumVerdi } from "../actions";
import { DispatchProps } from "../types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import { getFaktumInputTekst } from "../utils";
import { Select, SelectBredde } from "nav-frontend-skjema";

interface StateProps {
	faktum: FaktumMap;
}

interface OwnProps {
	faktumKey: string;
	disabled?: boolean;
	feil?: Feil;
	bredde?: SelectBredde;
	labelFunc?: (label: string) => React.ReactNode;
}

class FaktumSelect extends React.Component<
	OwnProps & StateProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const {
			faktumKey,
			disabled,
			bredde,
			labelFunc,
			faktum,
			children,
			dispatch,
			intl
		} = this.props;
		const tekster = getFaktumInputTekst(intl, faktumKey);
		return (
			<Select
				name={faktumKey}
				disabled={disabled}
				value={faktum.get(faktumKey)}
				bredde={bredde}
				onChange={(evt: any) =>
					dispatch(setFaktumVerdi(faktumKey, evt.target.value))}
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

export default connect((state: { faktum: FaktumState }, props: OwnProps) => {
	return {
		faktum: state.faktum.faktum,
		faktumKey: props.faktumKey
	};
})(injectIntl(FaktumSelect));
