import * as React from "react";
import { RouterProps, withRouter, Redirect, matchPath } from "react-router";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Location } from "history";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";

import { Innholdstittel } from "nav-frontend-typografi";

import AppTittel from "../components/apptittel/AppTittel";
import Feiloppsummering from "../components/validering/Feiloppsummering";
import StegIndikator from "../components/stegIndikator";
import Knapperad from "../components/knapperad";
import { SkjemaConfig, SkjemaStegType, SkjemaSteg, Faktum } from "../types";
import { DispatchProps, SoknadAppState } from "../redux/reduxTypes";
import { getProgresjonFaktum } from "../utils";
import { setFaktum, lagreFaktum } from "../redux/faktaActions";
import {
	clearFaktaValideringsfeil,
	setFaktaValideringsfeil
} from "../redux/valideringActions";
import { Valideringsfeil, FaktumValideringsregler } from "../validering/types";
import { validerAlleFaktum } from "../validering/utils";
import {
	gaTilbake,
	gaVidere,
	getIntlTextOrKey,
	scrollToTop,
	getStegUrl,
	oppdaterFaktumMedVerdier
} from "../utils";
import { avbrytSoknad } from "../redux/soknadActions";

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
	progresjonPending?: boolean;
	valideringer: FaktumValideringsregler[];
	visFeilmeldinger?: boolean;
	valideringsfeil?: Valideringsfeil[];
	stegValidertCounter?: number;
}

type Props = OwnProps &
	StateProps &
	RouterProps &
	InjectedRouterProps &
	InjectedIntlProps &
	DispatchProps;

interface UrlParams {
	brukerbehandlingId: string;
	steg: string;
}

class StegMedNavigasjon extends React.Component<Props, {}> {
	stegTittel: HTMLElement;

	constructor(props: Props) {
		super(props);
		this.handleGaVidere = this.handleGaVidere.bind(this);
	}

	componentDidMount() {
		scrollToTop();
		if (this.stegTittel) {
			this.stegTittel.focus();
		}
	}

	handleGaVidere(aktivtSteg: SkjemaSteg, brukerBehandlingId: string) {
		if (aktivtSteg.type === SkjemaStegType.oppsummering) {
			this.props.history.push("/kvittering");
			return;
		}

		const valideringsfeil = validerAlleFaktum(
			this.props.fakta,
			this.props.valideringer
		);
		if (valideringsfeil.length === 0) {
			this.props.dispatch(clearFaktaValideringsfeil());
			if (aktivtSteg.stegnummer === this.props.progresjon) {
				const faktum = oppdaterFaktumMedVerdier(
					getProgresjonFaktum(this.props.fakta),
					`${aktivtSteg.stegnummer + 1}`
				);
				this.props.dispatch(setFaktum(faktum));
				lagreFaktum(faktum, this.props.dispatch).then(() => {
					gaVidere(
						aktivtSteg.stegnummer,
						brukerBehandlingId,
						this.props.history,
						this.props.skjemaConfig
					);
				});
			} else {
				gaVidere(
					aktivtSteg.stegnummer,
					brukerBehandlingId,
					this.props.history,
					this.props.skjemaConfig
				);
			}
		} else {
			this.props.dispatch(setFaktaValideringsfeil(valideringsfeil));
		}
	}

	handleGaTilbake(aktivtSteg: number, brukerBehandlingId: string) {
		this.props.dispatch(clearFaktaValideringsfeil());
		gaTilbake(
			aktivtSteg,
			brukerBehandlingId,
			this.props.history,
			this.props.skjemaConfig
		);
	}

	render() {
		const { skjemaConfig, intl, children, progresjon } = this.props;
		const stegConfig = skjemaConfig.steg.find(
			s => s.key === this.props.stegKey
		);
		const brukerBehandlingId = this.props.match.params.brukerBehandlingId;
		const erOppsummering = stegConfig.type === SkjemaStegType.oppsummering;
		const stegTittel = getIntlTextOrKey(intl, `${this.props.stegKey}.tittel`);
		const synligeSteg = skjemaConfig.steg.filter(
			s => s.type === SkjemaStegType.skjema
		);

		const localMatch = matchPath(this.props.location.pathname, {
			path: "/skjema/:brukerbehandlingId/:steg"
		});
		const { steg } = localMatch.params as UrlParams;
		const maksSteg = progresjon;
		if (parseInt(steg, 10) > maksSteg) {
			return <Redirect to={getStegUrl(brukerBehandlingId, maksSteg)} />;
		}

		return (
			<div>
				<DocumentTitle
					title={intl.formatMessage({ id: this.props.skjemaConfig.tittelId })}
				/>
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
									aktivtSteg={stegConfig.stegnummer}
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
							gaViderePending={this.props.progresjonPending}
							gaVidereLabel={
								erOppsummering
									? getIntlTextOrKey(intl, "skjema.knapper.send")
									: undefined
							}
							gaVidere={() =>
								this.handleGaVidere(stegConfig, brukerBehandlingId)}
							gaTilbake={() =>
								this.handleGaTilbake(stegConfig.stegnummer, brukerBehandlingId)}
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
		progresjonPending: state.fakta.progresjonPending,
		valideringer: state.validering.valideringsregler,
		visFeilmeldinger: state.validering.visValideringsfeil,
		valideringsfeil: state.validering.feil,
		stegValidertCounter: state.validering.stegValidertCounter
	};
};

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(
	injectIntl(withRouter(StegMedNavigasjon))
);
