import * as React from "react";
// import { RouterProps, withRouter, Redirect, matchPath } from "react-router";
import { RouterProps, withRouter } from "react-router";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Location } from "history";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";

import { Innholdstittel } from "nav-frontend-typografi";

import AppTittel from "../components/apptittel/AppTittel";
import ApplikasjonsfeilDialog from "../containers/ApplikasjonsfeilDialog";
import Feiloppsummering from "../components/validering/Feiloppsummering";
import StegIndikator from "../components/stegIndikator";
import Knapperad from "../components/knapperad";
import { SkjemaConfig, SkjemaStegType, SkjemaSteg, Faktum } from "../types";
import { DispatchProps, SoknadAppState } from "../redux/reduxTypes";
import { getProgresjonFaktum } from "../utils";
import { setVisBekreftMangler } from "../redux/oppsummering/oppsummeringActions";
import {
	clearFaktaValideringsfeil,
	setFaktaValideringsfeil
} from "../redux/valideringActions";
import { Valideringsfeil, FaktumValideringsregler } from "../validering/types";
import { validerAlleFaktum } from "../validering/utils";
// import { getIntlTextOrKey, scrollToTop, getStegUrl } from "../utils";
import { getIntlTextOrKey, scrollToTop } from "../utils";
import { avbrytSoknad, sendSoknad } from "../redux/soknad/soknadActions";
import { gaVidere, gaTilbake } from "../redux/navigasjon/navigasjonActions";

const stopEvent = (evt: React.FormEvent<any>) => {
	evt.stopPropagation();
	evt.preventDefault();
};

interface OwnProps {
	stegKey: string;
	skjemaConfig: SkjemaConfig;
	pending?: boolean;
}

interface InjectedRouterProps {
	location: Location;
	match: {
		params: {
			brukerBehandlingId: string;
		};
		url: string;
	};
}

interface StateProps {
	fakta: Faktum[];
	progresjon: number;
	nextButtonPending?: boolean;
	valideringer: FaktumValideringsregler[];
	visFeilmeldinger?: boolean;
	valideringsfeil?: Valideringsfeil[];
	stegValidertCounter?: number;
	oppsummeringBekreftet?: boolean;
}

type Props = OwnProps &
	StateProps &
	RouterProps &
	InjectedRouterProps &
	InjectedIntlProps &
	DispatchProps;

// interface UrlParams {
// 	brukerbehandlingId: string;
// 	steg: string;
// }

class StegMedNavigasjon extends React.Component<Props, {}> {
	stegTittel: HTMLElement;

	constructor(props: Props) {
		super(props);
		this.handleGaVidere = this.handleGaVidere.bind(this);
		this.sendSoknad = this.sendSoknad.bind(this);
	}

	componentDidMount() {
		scrollToTop();
		if (this.stegTittel) {
			this.stegTittel.focus();
		}
	}

	sendSoknad(brukerBehandlingId: string) {
		this.props.dispatch(sendSoknad(brukerBehandlingId));
	}

	handleGaVidere(aktivtSteg: SkjemaSteg, brukerBehandlingId: string) {
		if (aktivtSteg.type === SkjemaStegType.oppsummering) {
			if (this.props.oppsummeringBekreftet) {
				this.sendSoknad(brukerBehandlingId);
			} else {
				this.props.dispatch(setVisBekreftMangler(true));
			}
			return;
		}

		const valideringsfeil = validerAlleFaktum(
			this.props.fakta,
			this.props.valideringer
		);
		if (valideringsfeil.length === 0) {
			this.props.dispatch(clearFaktaValideringsfeil());
			this.props.dispatch(gaVidere(aktivtSteg.stegnummer));
		} else {
			this.props.dispatch(setFaktaValideringsfeil(valideringsfeil));
		}
	}

	handleGaTilbake(aktivtSteg: number) {
		this.props.dispatch(clearFaktaValideringsfeil());
		this.props.dispatch(gaTilbake(aktivtSteg));
	}

	render() {
		// const { skjemaConfig, intl, children, progresjon } = this.props;
		const { skjemaConfig, intl, children } = this.props;
		const aktivtStegConfig = skjemaConfig.steg.find(
			s => s.key === this.props.stegKey
		);
		const brukerBehandlingId = this.props.match.params.brukerBehandlingId;
		const erOppsummering =
			aktivtStegConfig.type === SkjemaStegType.oppsummering;
		const stegTittel = getIntlTextOrKey(intl, `${this.props.stegKey}.tittel`);
		const documentTitle = intl.formatMessage({
			id: this.props.skjemaConfig.tittelId
		});
		const synligeSteg = skjemaConfig.steg.filter(
			s => s.type === SkjemaStegType.skjema
		);

		/*
			const localMatch = matchPath(this.props.location.pathname, {
				path: "/skjema/:brukerbehandlingId/:steg"
			});
			const { steg } = localMatch.params as UrlParams;
			const maksSteg = progresjon;
		if (parseInt(steg, 10) > maksSteg && location.hash.indexOf("force") < 0) {
			return <Redirect to={getStegUrl(brukerBehandlingId, maksSteg)} />;
		}
		*/

		return (
			<div>
				<ApplikasjonsfeilDialog />
				<DocumentTitle title={`${stegTittel} - ${documentTitle}`} />
				<AppTittel />
				<div className="skjema-steg skjema-content">
					<div className="skjema-steg__feiloppsummering">
						<Feiloppsummering
							skjemanavn={this.props.skjemaConfig.skjemanavn}
							valideringsfeil={this.props.valideringsfeil}
							stegValidertCounter={this.props.stegValidertCounter}
							visFeilliste={this.props.visFeilmeldinger}
						/>
					</div>
					<form id="soknadsskjema" onSubmit={stopEvent}>
						{!erOppsummering ? (
							<div className="skjema__stegindikator">
								<StegIndikator
									dispatch={this.props.dispatch}
									aktivtSteg={aktivtStegConfig.stegnummer}
									steg={synligeSteg.map(s => ({
										tittel: intl.formatMessage({ id: `${s.key}.tittel` })
									}))}
								/>
							</div>
						) : null}
						<div
							className="skjema-steg__tittel"
							tabIndex={-1}
							ref={c => (this.stegTittel = c)}
						>
							<Innholdstittel>{stegTittel}</Innholdstittel>
						</div>
						{children}
						<Knapperad
							gaViderePending={this.props.nextButtonPending}
							gaVidereLabel={
								erOppsummering
									? getIntlTextOrKey(intl, "skjema.knapper.send")
									: undefined
							}
							gaVidere={() =>
								this.handleGaVidere(aktivtStegConfig, brukerBehandlingId)}
							gaTilbake={
								aktivtStegConfig.stegnummer > 1
									? () => this.handleGaTilbake(aktivtStegConfig.stegnummer)
									: null
							}
							avbryt={() => this.props.dispatch(avbrytSoknad())}
						/>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: SoknadAppState): StateProps => {
	const faktum = getProgresjonFaktum(state.fakta.data);
	const progresjon = parseInt((faktum.value || 1) as string, 10);
	return {
		fakta: state.fakta.data,
		progresjon,
		nextButtonPending:
			state.fakta.progresjonPending || state.soknad.sendSoknadPending,
		oppsummeringBekreftet: state.oppsummering.bekreftet,
		valideringer: state.validering.valideringsregler,
		visFeilmeldinger: state.validering.visValideringsfeil,
		valideringsfeil: state.validering.feil,
		stegValidertCounter: state.validering.stegValidertCounter
	};
};

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(injectIntl(withRouter(StegMedNavigasjon as any) as any) as any);
