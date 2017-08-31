import * as React from "react";
import { connect } from "react-redux";
import Steg from "../../../skjema/components/steg";
import { DispatchProps } from "../../../skjema/types";
import {
	FaktumComponentProps,
	FaktumStoreState
} from "../../../skjema/reducer";
import { hentOppsummering } from "../../../redux/soknad/actions";

type Props = FaktumComponentProps & DispatchProps;

class Oppsummering extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
	}
	componentDidMount() {
		this.props.dispatch(hentOppsummering("1000B8FNi"));
	}
	render() {
		return (
			<Steg tittelId="oppsummering.tittel">
				Oppsummering lastes inn og vises her
				<div className="skjema-oppsummering" />
			</Steg>
		);
	}
}

export default connect((state: FaktumStoreState) => {
	return {
		fakta: state.faktumStore.fakta
	};
})(Oppsummering);
