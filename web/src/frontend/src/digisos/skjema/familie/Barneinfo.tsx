import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import {
	DispatchProps,
	SoknadAppState
} from "../../../nav-soknad/redux/reduxTypes";
import { finnFakta, finnFaktum } from "../../../nav-soknad/utils";
import { Faktum } from "../../../nav-soknad/types";
import {
	opprettFaktum,
	slettFaktum
} from "../../../nav-soknad/redux/fakta/faktaActions";
import Lenkeknapp from "../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
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

interface State {
	listState: string;
}

const createBarnRef = (idx: number) => `barn-${idx}`;

class Barneinfo extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.leggTilBarn = this.leggTilBarn.bind(this);
		this.fjernBarn = this.fjernBarn.bind(this);
		this.resetListState = this.resetListState.bind(this);
		this.state = {
			listState: ""
		};
	}

	resetListState() {
		this.setState({ listState: "" });
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

	/** Denne funksjonen kalles kun når det er mer en ett barn i listen. */
	fjernBarn(faktum: Faktum, fjernetBarnListIndex: number) {
		this.props.dispatch(slettFaktum(faktum.faktumId));
		/** Sett fokus på barnet i listen som er foran det som er fjernet */
		const barn = this.refs[createBarnRef(fjernetBarnListIndex - 1)] as Barn;
		if (barn) {
			barn.focus();
		}
	}

	render() {
		const { fakta, faktumKey, intl } = this.props;
		const alleBarn = finnFakta(faktumKey, fakta);
		const visFjernlenke = alleBarn.length > 1;
		return (
			<div>
				<ol className="barneliste">
					{alleBarn.map((barnFaktum: Faktum, index: number) => (
						<li key={barnFaktum.faktumId}>
							<Barn
								ref={createBarnRef(index)}
								fakta={fakta}
								faktum={barnFaktum}
								barnNummer={index + 1}
								onFjernBarn={faktumId => this.fjernBarn(barnFaktum, index)}
								fjernBarnTekst={intl.formatMessage({
									id: "familie.barn.true.barn.fjern"
								})}
								fjernBarnAlterantivTekst={intl.formatMessage({
									id: "familie.barn.true.barn.fjernalternativtekst"
								})}
								dispatch={this.props.dispatch}
								visFjernBarn={visFjernlenke}
							/>
						</li>
					))}
				</ol>
				<Lenkeknapp onClick={this.leggTilBarn} style="add">
					{intl.formatMessage({
						id: "familie.barn.true.barn.leggtil"
					})}
				</Lenkeknapp>
			</div>
		);
	}
}

interface StateFromProps {
	fakta: Faktum[];
}

export default connect<StateFromProps, {}, OwnProps>(
	(state: SoknadAppState) => {
		return {
			fakta: state.fakta.data
		};
	}
)(injectIntl(Barneinfo));
