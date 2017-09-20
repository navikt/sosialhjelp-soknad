import * as React from "react";
import { FaktumComponentProps, SoknadAppState } from "../../../nav-soknad/redux/faktaReducer";
import { finnFakta, finnFaktum } from "../../../nav-soknad/redux/faktaUtils";
import { connect } from "react-redux";
import { DispatchProps } from "../../../nav-soknad/redux/faktaTypes";
import { Faktum } from "../../redux/types";
import { opprettFaktum } from "../../../nav-soknad/redux/faktaActions";
import Barn from "./Barn";

interface OwnProps {
	faktumKey: string;
	nummer: number;
	parrentFaktumKey: string;
}

class Barneinfo extends React.Component<OwnProps & FaktumComponentProps & DispatchProps, {}> {
	componentDidMount() {
		const {fakta, faktumKey, parrentFaktumKey} = this.props;
		const parrentFaktum = finnFaktum(parrentFaktumKey, fakta);
		try {
			finnFaktum(faktumKey, fakta);
		} finally {
			this.props.dispatch(opprettFaktum({key: faktumKey, parrentFaktum: parrentFaktum.faktumId}));
		}
	}

	render() {
		const {fakta, faktumKey, parrentFaktumKey} = this.props;
		const alleBarn = finnFakta(faktumKey, fakta);
		const parrentFaktum = finnFaktum(parrentFaktumKey, fakta);
		const leggTilBarn = (): any => this.props.dispatch(opprettFaktum({
			key: faktumKey,
			parrentFaktum: parrentFaktum.faktumId
		}));
		return (
			<div>
				{alleBarn.map((barnFaktum: Faktum, index) => (<Barn fakta={fakta} faktum={barnFaktum} key={"barn-" + index}/>))}
				<a href="javascript:void(0);" onClick={leggTilBarn()}>Legg til barn </a>
			</div>
		);
	}
}

interface StateFromProps {
	fakta: Faktum[];
}

export default connect<StateFromProps, {}, OwnProps>((state: SoknadAppState) => {
	return {
		fakta: state.fakta.data
	};
})(Barneinfo);
