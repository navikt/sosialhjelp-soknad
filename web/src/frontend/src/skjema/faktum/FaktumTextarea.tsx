import * as React from "react";
import { Textarea, Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumStoreState, FaktumComponentProps } from "../reducer";
import { setFaktumVerdi } from "../actions";
import { DispatchProps } from "../types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getFaktumInputTekst, getIntlTextOrKey } from "../utils";

interface OwnProps {
	faktumKey: string;
	labelId?: string;
	disabled?: boolean;
	feil?: Feil;
}

class FaktumTextarea extends React.Component<
	OwnProps & FaktumComponentProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const {
			faktumKey,
			labelId,
			disabled,
			feil,
			fakta,
			dispatch,
			intl
		} = this.props;
		const tekster = getFaktumInputTekst(intl, faktumKey);
		return (
			<Textarea
				label={labelId ? getIntlTextOrKey(intl, labelId) : tekster.label}
				value={fakta.get(faktumKey) || ""}
				name={faktumKey}
				disabled={disabled}
				onChange={(evt: any) =>
					dispatch(setFaktumVerdi(faktumKey, evt.target.value))}
				feil={feil}
			/>
		);
	}
}

export default connect((state: FaktumStoreState, props: OwnProps) => {
	return {
		fakta: state.faktumStore.fakta,
		faktumKey: props.faktumKey
	};
})(injectIntl(FaktumTextarea));
