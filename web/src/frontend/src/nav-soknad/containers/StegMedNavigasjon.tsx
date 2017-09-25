import * as React from "react";
import { RouterProps, withRouter } from "react-router";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Location } from "history";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import AppTittel from "../components/apptittel/AppTittel";
import Feiloppsummering from "../components/validering/Feiloppsummering";
import { Innholdstittel } from "nav-frontend-typografi";
import StegIndikator from "../components/stegIndikator";
import Knapperad from "../components/knapperad";
import { SkjemaConfig, SkjemaStegType } from "../soknadTypes";
import { DispatchProps, Faktum } from "../redux/faktaTypes";
import { SoknadAppState } from "../redux/faktaReducer";
import { getIntlTextOrKey } from "../utils";
import {
	clearFaktaValideringsfeil,
	setFaktaValideringsfeil
} from "../redux/valideringActions";
import { Valideringsfeil, FaktumValideringsregler } from "../validering/types";
import { validerAlleFaktum } from "../validering/utils";
import {
	gaTilbake,
	gaVidere,
	avbryt,
	finnBrukerBehandlingIdFraLocation,
	finnStegFraLocation
} from "../utils";

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
}

interface StateProps {
	fakta: Faktum[];
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
			gaVidere(
				aktivtSteg,
				brukerBehandlingId,
				this.props.history,
				this.props.skjemaConfig
			);
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
		const { skjemaConfig, intl, children, location } = this.props;
		const aktivtSteg = finnStegFraLocation(location);
		const brukerBehandlingId = finnBrukerBehandlingIdFraLocation(location);

		const aktivtStegInfo = skjemaConfig.steg.find(
			s => s.stegnummer === aktivtSteg
		);
		const erOppsummering = aktivtStegInfo.type === SkjemaStegType.oppsummering;

		const stegTittel = getIntlTextOrKey(intl, `${this.props.stegKey}.tittel`);
		return (
			<div>
				<DocumentTitle title={this.props.skjemaConfig.tittelId} />
				<AppTittel />
				<div className="skjema-steg skjema-content">
					<div className="skjema-steg__feiloppsummering">
						<Feiloppsummering
							skjemanavn="digisos"
							valideringsfeil={this.props.valideringsfeil}
							stegValidertCounter={this.props.stegValidertCounter}
							visFeilliste={this.props.visFeilmeldinger}
						/>
					</div>
					<div className="skjema-steg__tittel">
						<Innholdstittel>{stegTittel}</Innholdstittel>
					</div>
					<form id="soknadsskjema" onSubmit={stopEvent}>
						{!erOppsummering ? (
							<div className="skjema__stegindikator">
								<StegIndikator
									aktivtSteg={aktivtSteg}
									steg={skjemaConfig.steg.map(steg => ({
										tittel: stegTittel
									}))}
								/>
							</div>
						) : null}
						{children}
						<Knapperad
							gaVidereLabel={erOppsummering ? "Send søknad" : undefined}
							gaVidere={() =>
								this.handleGaVidere(aktivtSteg, brukerBehandlingId)}
							gaTilbake={() =>
								this.handleGaTilbake(aktivtSteg, brukerBehandlingId)}
							avbryt={() => avbryt(skjemaConfig)}
						/>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: SoknadAppState): StateProps => ({
	fakta: state.fakta.data,
	valideringer: state.validering.valideringsregler,
	visFeilmeldinger: state.validering.visValideringsfeil,
	valideringsfeil: state.validering.feil,
	stegValidertCounter: state.validering.stegValidertCounter
});

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(
	injectIntl(withRouter(StegMedNavigasjon))
);
