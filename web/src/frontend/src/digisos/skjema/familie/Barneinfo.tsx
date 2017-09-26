import * as React from "react";
import {
	FaktumComponentProps,
	SoknadAppState
} from "../../../nav-soknad/redux/faktaReducer";
import { finnFakta, finnFaktum } from "../../../nav-soknad/redux/faktaUtils";
import { connect } from "react-redux";
import { DispatchProps } from "../../../nav-soknad/redux/faktaTypes";
import { Faktum } from "../../redux/types";
import { opprettFaktum } from "../../../nav-soknad/redux/faktaActions";
import Barn from "./Barn";
import LeggTilLenke from "../../../nav-soknad/components/leggTilLenke/leggtillenke";
import { injectIntl, InjectedIntlProps } from "react-intl";

interface OwnProps {
	faktumKey: string;
	nummer: number;
	parentFaktumKey: string;
}

class Barneinfo extends React.Component<
	OwnProps & FaktumComponentProps & DispatchProps & InjectedIntlProps,
	{}
> {
	componentDidMount() {
		const { fakta, faktumKey, parentFaktumKey } = this.props;
		const parentFaktum = finnFaktum(parentFaktumKey, fakta);
		const faktum = finnFaktum(faktumKey, fakta);
		if (!faktum) {
			this.props.dispatch(
				opprettFaktum({ key: faktumKey, parrentFaktum: parentFaktum.faktumId })
			);
		}
	}

	render() {
		const { fakta, faktumKey, parentFaktumKey, intl } = this.props;
		const alleBarn = finnFakta(faktumKey, fakta);
		const parrentFaktum = finnFaktum(parentFaktumKey, fakta);
		const leggTilBarn = (): any =>
			this.props.dispatch(
				opprettFaktum({
					key: faktumKey,
					parrentFaktum: parrentFaktum.faktumId
				})
			);
		return (
			<div>
				{alleBarn.map((barnFaktum: Faktum) => (
					<Barn fakta={fakta} faktum={barnFaktum} key={barnFaktum.faktumId} />
				))}
				<LeggTilLenke leggTil={leggTilBarn} lenketekst={intl.formatMessage({id: "familie.barn.true.barn.leggtil"})}/>
			</div>
		);
	}
}

interface StateFromProps {
	fakta: Faktum[];
}

export default connect<
	StateFromProps,
	{},
	OwnProps
>((state: SoknadAppState) => {
	return {
		fakta: state.fakta.data
	};
})(injectIntl(Barneinfo));
