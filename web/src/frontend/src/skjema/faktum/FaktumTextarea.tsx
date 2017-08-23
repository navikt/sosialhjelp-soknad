import * as React from "react";
import { Textarea, Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../reducer";
import { setFaktumVerdi } from "../actions";
import { DispatchProps } from "../types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getFaktumTextareaTekst, getIntlTextOrKey } from "../utils";

interface StateProps {
	faktum: FaktumMap;
}

interface OwnProps {
	faktumKey: string;
	labelId?: string;
	disabled?: boolean;
	feil?: Feil;
}

class FaktumTextarea extends React.Component<
	OwnProps & StateProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const {
			faktumKey,
			labelId,
			disabled,
			feil,
			faktum,
			dispatch,
			intl
		} = this.props;
		const tekster = getFaktumTextareaTekst(intl, faktumKey);
		return (
			<Textarea
				label={labelId ? getIntlTextOrKey(intl, labelId) : tekster.label}
				value={faktum.get(faktumKey) || ""}
				name={faktumKey}
				disabled={disabled}
				onChange={(evt: any) =>
					dispatch(setFaktumVerdi(faktumKey, evt.target.value))}
				feil={feil}
			/>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: OwnProps) => {
	return {
		faktum: state.faktum.faktum,
		faktumKey: props.faktumKey
	};
})(injectIntl(FaktumTextarea));
