import * as React from "react";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import { Element } from "nav-frontend-typografi";
import AriaStatus from "../../../nav-soknad/components/aria/AriaStatus";

import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import {
	DispatchProps,
	SoknadAppState
} from "../../../nav-soknad/redux/reduxTypes";
import { finnFakta, finnFaktum } from "../../../nav-soknad/utils";
import { Faktum } from "../../../nav-soknad/types";
import {
	opprettFaktum
	// slettFaktum
} from "../../../nav-soknad/redux/faktaActions";
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

const Fade: React.StatelessComponent<any> = ({ children, ...props }) => (
	<CSSTransition timeout={500} {...props} classNames="fade">
		{children}
	</CSSTransition>
);

interface State {
	listState: string;
}

class Barneinfo extends React.Component<Props, State> {
	list: HTMLElement;
	forsteBarn: Barn;

	constructor(props: Props) {
		super(props);
		this.leggTilBarn = this.leggTilBarn.bind(this);
		this.fjernBarn = this.fjernBarn.bind(this);
		this.state = {
			listState: "Her kommer status"
		};
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

	fjernBarn(faktumId: number) {
		// this.props.dispatch(slettFaktum(faktumId));
		this.setState({
			listState: "Barn fjernet"
		});
		if (this.forsteBarn) {
			// this.forsteBarn.focus();
		}
	}

	render() {
		const { fakta, faktumKey, intl } = this.props;
		const alleBarn = finnFakta(faktumKey, fakta);
		const visFjernlenke = alleBarn.length > 1;
		return (
			<div>
				<AriaStatus live="polite" visible={true} atomic={false}>
					{this.state.listState}
				</AriaStatus>
				<Element className="blokk-s">
					<FormattedMessage id="familie.barn.true.listetittel" />
				</Element>
				<ol className="barneliste" tabIndex={-1} ref={c => (this.list = c)}>
					<TransitionGroup>
						{alleBarn.map((barnFaktum: Faktum, index: number) => (
							<Fade key={barnFaktum.faktumId}>
								<li>
									<Barn
										ref={c => (index === 0 ? (this.forsteBarn = c) : null)}
										fakta={fakta}
										faktum={barnFaktum}
										barnNummer={index + 1}
										onFjernBarn={this.fjernBarn}
										fjernBarnTekst={intl.formatMessage({
											id: "familie.barn.true.barn.fjern"
										})}
										fjernBarnAlterantivTekst={intl.formatMessage({
											id: "familie.barn.true.barn.fjernAlternativTekst"
										})}
										dispatch={this.props.dispatch}
										visFjernlenke={visFjernlenke}
									/>
								</li>
							</Fade>
						))}
					</TransitionGroup>
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
