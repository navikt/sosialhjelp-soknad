import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import {
	DispatchProps,
	SoknadAppState
} from "../../../nav-soknad/redux/reduxTypes";
import { finnFakta, finnFaktum } from "../../../nav-soknad/utils";
import { Faktum } from "../../../nav-soknad/types";
import { opprettFaktum } from "../../../nav-soknad/redux/faktaActions";
import LeggTilLenke from "../../../nav-soknad/components/leggTilLenke/leggtillenke";

import Barn from "./Barn";

interface OwnProps {
	faktumKey: string;
	nummer: number;
	parentFaktumKey: string;
}

type Props = OwnProps &
	FaktumComponentProps &
	DispatchProps &
	InjectedIntlProps;

class Barneinfo extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.leggTilBarn = this.leggTilBarn.bind(this);
	}

	componentDidMount() {
		const { fakta, faktumKey } = this.props;
		const faktum = finnFaktum(faktumKey, fakta);
		if (!faktum) {
			this.leggTilBarn();
		}
	}

	leggTilBarn() {
		const parentFaktum = finnFaktum(
			this.props.parentFaktumKey,
			this.props.fakta
		);
		this.props.dispatch(
			opprettFaktum({
				key: this.props.faktumKey,
				parrentFaktum: parentFaktum.faktumId
			})
		);
	}

	render() {
		const { fakta, faktumKey, intl } = this.props;
		const alleBarn = finnFakta(faktumKey, fakta);
		const visFjernlenke = alleBarn.length > 1;
		return (
			<div>
				<ol className="barneliste">
					{alleBarn.map((barnFaktum: Faktum) => (
						<li key={barnFaktum.faktumId}>
							<Barn
								fakta={fakta}
								faktum={barnFaktum}
								key={barnFaktum.faktumId}
								fjernBarnTekst={intl.formatMessage({
									id: "familie.barn.true.barn.fjern"
								})}
								dispatch={this.props.dispatch}
								visFjernlenke={visFjernlenke}
							/>
						</li>
					))}
				</ol>
				<LeggTilLenke
					leggTil={this.leggTilBarn}
					lenketekst={intl.formatMessage({
						id: "familie.barn.true.barn.leggtil"
					})}
				/>
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
