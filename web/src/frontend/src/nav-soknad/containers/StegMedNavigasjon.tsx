import * as React from "react";
import { RouterProps, withRouter } from "react-router";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Location } from "history";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";

import { Innholdstittel } from "nav-frontend-typografi";

import AppTittel from "../components/apptittel/AppTittel";
import Feiloppsummering from "../components/validering/Feiloppsummering";
import StegIndikator from "../components/stegIndikator";
import Knapperad from "../components/knapperad";
import { SkjemaConfig, SkjemaStegType, Faktum, REST_STATUS } from "../types";
import { DispatchProps, SoknadAppState } from "../redux/reduxTypes";
import { getProgresjonFaktum } from "../redux/faktaUtils";
import { setFaktumVerdi, setProgresjonPending } from "../redux/faktaActions";
import {
	clearFaktaValideringsfeil,
	setFaktaValideringsfeil
} from "../redux/valideringActions";
import { Valideringsfeil, FaktumValideringsregler } from "../validering/types";
import { validerAlleFaktum } from "../validering/utils";
import { gaTilbake, gaVidere, avbryt, getIntlTextOrKey } from "../utils";

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

class StegMedNavigasjon extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.handleGaVidere = this.handleGaVidere.bind(this);
	}

	handleGaVidere(aktivtSteg: number, brukerBehandlingId: string) {
		if (aktivtSteg === 9) {
			this.props.history.push("/kvittering");
			return;
		}

		const valideringsfeil = validerAlleFaktum(
			this.props.fakta,
			this.props.valideringer
		);
		if (valideringsfeil.length === 0) {
			this.props.dispatch(clearFaktaValideringsfeil());
			if (aktivtSteg === this.props.progresjon + 1) {
				this.props.dispatch(setProgresjonPending(true));
				this.props
					.dispatch(
						setFaktumVerdi(
							getProgresjonFaktum(this.props.fakta),
							`${aktivtSteg + 1}`
						)
					)
					.then(() => {
						this.props.dispatch(setProgresjonPending(false));
						gaVidere(
							aktivtSteg,
							brukerBehandlingId,
							this.props.history,
							this.props.skjemaConfig
						);
					});
			} else {
				gaVidere(
					aktivtSteg,
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
		const { skjemaConfig, intl, children } = this.props;
		const stegConfig = skjemaConfig.steg.find(
			s => s.key === this.props.stegKey
		);
		const brukerBehandlingId = this.props.match.params.brukerBehandlingId;
		const erOppsummering = stegConfig.type === SkjemaStegType.oppsummering;
		const stegTittel = getIntlTextOrKey(intl, `${this.props.stegKey}.tittel`);

		return (
			<div>
				<DocumentTitle title={this.props.skjemaConfig.tittelId} />
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
									steg={skjemaConfig.steg.map(steg => ({
										tittel: stegTittel
									}))}
								/>
							</div>
						) : null}
						<div className="skjema-steg__tittel">
							<Innholdstittel>{stegTittel}</Innholdstittel>
						</div>
						{children}
						<Knapperad
							gaViderePending={this.props.progresjonPending}
							gaVidereLabel={erOppsummering ? "Send søknad" : undefined}
							gaVidere={() =>
								this.handleGaVidere(stegConfig.stegnummer, brukerBehandlingId)}
							gaTilbake={() =>
								this.handleGaTilbake(stegConfig.stegnummer, brukerBehandlingId)}
							avbryt={() => avbryt(skjemaConfig)}
						/>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: SoknadAppState): StateProps => {
	const dataLoaded = state.fakta.restStatus === REST_STATUS.OK;
	let progresjon = 0;
	if (dataLoaded) {
		const faktum = getProgresjonFaktum(state.fakta.data);
		progresjon = parseInt(faktum.value as string, 10);
	}
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
