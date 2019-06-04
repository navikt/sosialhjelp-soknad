import * as React from "react";
import { RouterProps, withRouter } from "react-router";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Location } from "history";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import { Innholdstittel } from "nav-frontend-typografi";
import ApplikasjonsfeilDialog from "../containers/ApplikasjonsfeilDialog";
import Feiloppsummering from "../components/validering/Feiloppsummering";
import StegIndikator from "../components/stegIndikator";
import Knapperad from "../components/knapperad";
import { SkjemaConfig, SkjemaStegType, SkjemaSteg } from "../types";
import { DispatchProps, SoknadAppState } from "../redux/reduxTypes";
import { setVisBekreftMangler } from "../redux/oppsummering/oppsummeringActions";
import {
	clearFaktaValideringsfeil,
	setFaktaValideringsfeil
} from "../redux/valideringActions";
import { Valideringsfeil, FaktumValideringsregler } from "../validering/types";
import { getIntlTextOrKey, scrollToTop } from "../utils";
import { avbrytSoknad, sendSoknad } from "../redux/soknad/soknadActions";
import { gaVidere, gaTilbake } from "../redux/navigasjon/navigasjonActions";
import {loggInfo} from "../redux/navlogger/navloggerActions";
import AppBanner from "../components/appHeader/AppHeader";
import {Soknadsdata} from "../redux/soknadsdata/soknadsdataReducer";

const stopEvent = (evt: React.FormEvent<any>) => {
	evt.stopPropagation();
	evt.preventDefault();
};

interface OwnProps {
	stegKey: string;
	skjemaConfig: SkjemaConfig;
	pending?: boolean;
	ikon?: React.ReactNode;
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
	nextButtonPending?: boolean;
	valideringer: FaktumValideringsregler[];
	visFeilmeldinger?: boolean;
	valideringsfeil?: Valideringsfeil[];
	stegValidertCounter?: number;
	oppsummeringBekreftet?: boolean;
	fodselsnummer: string;
	soknadsdata: Soknadsdata;
}

type Props = OwnProps &
	StateProps &
	RouterProps &
	InjectedRouterProps &
	InjectedIntlProps &
	DispatchProps;

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

	loggAdresseTypeTilGrafana(){
		const adresseTypeValg = this.props.soknadsdata.personalia.adresser.valg;
		if (adresseTypeValg){
			this.props.dispatch(loggInfo("klikk--" + adresseTypeValg));
		}
	}

	sendSoknad(brukerBehandlingId: string) {
		this.props.dispatch(sendSoknad(brukerBehandlingId));
	}

	handleGaVidere(aktivtSteg: SkjemaSteg, brukerBehandlingId: string) {
		if (aktivtSteg.type === SkjemaStegType.oppsummering) {
			if (this.props.oppsummeringBekreftet) {
				this.loggAdresseTypeTilGrafana();
				this.sendSoknad(brukerBehandlingId);
			} else {
				this.props.dispatch(setVisBekreftMangler(true));
			}
			return;
		}

		const valideringsfeil = this.props.valideringsfeil;

		if (valideringsfeil.length === 0) {
			this.props.dispatch(clearFaktaValideringsfeil());
			this.props.dispatch(gaVidere(aktivtSteg.stegnummer));
		} else {
			this.props.dispatch(setFaktaValideringsfeil(valideringsfeil));
		}
	}

	// fjernDuplikateValideringsfeil(valideringsfeil: Valideringsfeil[]) {
	// 	let forrigeValideringsfeil: Valideringsfeil = null;
	// 	let duplikatIndex = null;
	// 	valideringsfeil.forEach((feil: Valideringsfeil, index: number) => {
	// 		if (forrigeValideringsfeil !== null &&
	// 			feil.faktumKey === forrigeValideringsfeil.faktumKey &&
	// 			feil.feilkode === forrigeValideringsfeil.feilkode) {
	// 			duplikatIndex = index;
	// 			this.fjernValideringsfeil(valideringsfeil, index);
	// 		}
	// 		forrigeValideringsfeil = feil;
	// 	});
	// 	if (duplikatIndex) {
	// 		valideringsfeil = this.fjernValideringsfeil(valideringsfeil, duplikatIndex);
	// 	}
	// 	return valideringsfeil;
	// }
	//
	// fjernValideringsfeil(items: Valideringsfeil[], i: number): Valideringsfeil[] {
	// 	return items.slice(0, i-1).concat(items.slice(i, items.length));
	// }

	handleGaTilbake(aktivtSteg: number) {
		this.props.dispatch(clearFaktaValideringsfeil());
		this.props.dispatch(gaTilbake(aktivtSteg));
	}

	render() {
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

		return (
			<div className="app-digisos informasjon-side">
				<AppBanner/>
				<ApplikasjonsfeilDialog />
				<DocumentTitle title={`${stegTittel} - ${documentTitle}`} />

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
									aktivtSteg={aktivtStegConfig.stegnummer}
									steg={synligeSteg.map(s => ({
										tittel: intl.formatMessage({ id: `${s.key}.tittel` })
									}))}
								/>
							</div>
						) : null}
						<div className="skjema-steg__ikon">
							{this.props.ikon}
						</div>
						<div
							className="skjema-steg__tittel"
							tabIndex={-1}
							ref={c => (this.stegTittel = c)}
						>
							<Innholdstittel className="sourceSansProBold">{stegTittel}</Innholdstittel>
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
	return {
		nextButtonPending: false, // TODO: Må settes til true ved første trykke på send søknad
		oppsummeringBekreftet: state.oppsummering.bekreftet,
		valideringer: state.validering.valideringsregler,
		visFeilmeldinger: state.validering.visValideringsfeil,
		valideringsfeil: state.validering.feil,
		stegValidertCounter: state.validering.stegValidertCounter,
		fodselsnummer: state.soknadsdata.personalia.basisPersonalia.fodselsnummer,
		soknadsdata: state.soknadsdata
	};
};

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(injectIntl(withRouter(StegMedNavigasjon as any) as any) as any);
