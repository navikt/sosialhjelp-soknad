import * as React from "react";
import { Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumStoreState, FaktumComponentProps } from "../reducer";
import { setFaktumVerdi } from "../actions";
import { DispatchProps } from "../types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import { getFaktumInputTekst } from "../utils";
import { Select, SelectBredde } from "nav-frontend-skjema";

interface OwnProps {
	faktumKey: string;
	disabled?: boolean;
	feil?: Feil;
	bredde?: SelectBredde;
	labelFunc?: (label: string) => React.ReactNode;
	onChange?: (event: any) => any;
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
			intl,
			onChange
		} = this.props;
		const tekster = getFaktumInputTekst(intl, faktumKey);
		return (
			<Select
				name={faktumKey}
				disabled={disabled}
				value={fakta.get(faktumKey)}
				bredde={bredde}
				onChange={(evt: any) => {
						dispatch(setFaktumVerdi(faktumKey, evt.target.value));
						if (onChange) {
							onChange(evt);
						}
					}
				}
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
