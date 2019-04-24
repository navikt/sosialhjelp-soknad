import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import * as React from "react";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { getIntlTextOrKey } from "../../../../nav-soknad/utils";
import Sporsmal, { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import AdresseDetaljer from "./AdresseDetaljer";
import { AdresseKategori, Gateadresse, NavEnhet } from "./AdresseTypes";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import AdresseTypeahead, { Adresse } from "./AdresseTypeahead";
import SoknadsmottakerVelger from "./SoknadsmottakerVelger";
import { ValideringActionKey, Valideringsfeil } from "../../../../nav-soknad/validering/types";
import SporsmalFaktum from "../../../../nav-soknad/faktum/SporsmalFaktum";
import SoknadsmottakerInfo from "./SoknadsmottakerInfo";
import { SoknadsMottakerStatus } from "../tps/oppholdsadresseReducer";
import { formaterSoknadsadresse } from "./AdresseUtils";
import { REST_STATUS } from "../../../../nav-soknad/types";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";

interface OwnProps {
	disableLoadingAnimation?: boolean;
}

type Props = SoknadsdataContainerProps & InjectedIntlProps & OwnProps;

interface State {
	oppstartsModus: boolean
}

class AdresseView extends React.Component<Props, State> {

	FAKTUM_KEY = "soknadsmottaker";

	constructor(props: Props) {
		super(props);
		this.state = {
			oppstartsModus: props.disableLoadingAnimation === true ? false : true
		};
	}

	componentDidMount() {
		const { soknadsdata } = this.props;
		const restStatus: REST_STATUS = soknadsdata.restStatus.personalia.adresser;
		if (restStatus === REST_STATUS.INITIALISERT) {
			this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.ADRESSER);
			this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.NAV_ENHETER);
		}
	}

	componentDidUpdate(prevProps: Readonly<Props>) {
		const restStatus: REST_STATUS = prevProps.soknadsdata.restStatus.personalia.adresser;
		if (restStatus === REST_STATUS.OK && this.state.oppstartsModus === true) {
			this.setState({oppstartsModus: false});
		}
	}

	onClickRadio(adresseKategori: AdresseKategori) {
		const { soknadsdata, oppdaterSoknadsdataSti } = this.props;
		const restStatus: REST_STATUS = soknadsdata.restStatus.personalia.adresser;
		if (restStatus === REST_STATUS.INITIALISERT || restStatus === REST_STATUS.PENDING){
			return;
		}
		const adresser = soknadsdata.personalia.adresser;
		adresser.valg = adresseKategori;
		oppdaterSoknadsdataSti(SoknadsSti.ADRESSER, adresser);
		if (adresseKategori === AdresseKategori.SOKNAD) {
			oppdaterSoknadsdataSti(SoknadsSti.NAV_ENHETER, []);
			const soknad: any = {
				"type": "gateadresse",
				"gateadresse": null,
				"matrikkeladresse": null,
				"ustrukturert": null

			};
			oppdaterSoknadsdataSti(SoknadsSti.ADRESSER + "/soknad", soknad);
		} else {
			this.lagreAdresseValg(adresser);
		}
	}

	lagreAdresseValg(payload: any) {
		const { brukerBehandlingId, oppdaterSoknadsdataSti, lagreSoknadsdata } = this.props;
		lagreSoknadsdata(brukerBehandlingId, SoknadsSti.ADRESSER, payload, (navEnheter: NavEnhet[]) => {
			if (navEnheter.length === 1) {
				const valgtNavEnhet: NavEnhet = navEnheter[0];
				valgtNavEnhet.valgt = true;
				lagreSoknadsdata(brukerBehandlingId, SoknadsSti.NAV_ENHETER, valgtNavEnhet);
				this.slettEventuelleValideringsfeil();
			}
			oppdaterSoknadsdataSti(SoknadsSti.NAV_ENHETER, navEnheter);
		});
	}

	velgAnnenAdresse(adresse: Adresse) {
		const { oppdaterSoknadsdataSti } = this.props;
		if (adresse) {
			const payload = {
				"valg": "soknad",
				"soknad": {
					"type": "gateadresse",
					"gateadresse": {
						"kommunenummer": adresse.kommunenummer,
						"postnummer": adresse.postnummer,
						"poststed": adresse.poststed,
						"gatenavn": adresse.adresse,
						"husnummer": adresse.husnummer,
						"husbokstav": adresse.husbokstav
					}
				}
			};
			this.lagreAdresseValg(payload);
			const soknad: any = {
				"type": "gateadresse",
				"gateadresse": {
					"landkode": "NOR",
					"kommunenummer": adresse.kommunenummer,
					"adresselinjer": [],
					"bolignummer": null,
					"postnummer": adresse.postnummer,
					"poststed": adresse.poststed,
					"gatenavn": adresse.adresse,
					"husnummer": adresse.husnummer,
					"husbokstav": adresse.husbokstav
				},
				"matrikkeladresse": null,
				"ustrukturert": null

			};
			oppdaterSoknadsdataSti(SoknadsSti.ADRESSER + "/soknad", soknad);
		}
	}

	onVelgSoknadsmottaker(valgtNavEnhet: NavEnhet) {
		const { brukerBehandlingId, soknadsdata, lagreSoknadsdata, oppdaterSoknadsdataSti } = this.props;
		valgtNavEnhet.valgt = true;
		lagreSoknadsdata(brukerBehandlingId, SoknadsSti.NAV_ENHETER, valgtNavEnhet);
		const navEnheter = soknadsdata.personalia.navEnheter;
		navEnheter.map((navEnhet: NavEnhet) => {
			if (navEnhet.orgnr === valgtNavEnhet.orgnr) {
				navEnhet.valgt = true;
			}
		});
		oppdaterSoknadsdataSti(SoknadsSti.NAV_ENHETER, navEnheter);
		this.slettEventuelleValideringsfeil();
	}

	slettEventuelleValideringsfeil() {
		const feilkode = this.props.feil.find((f: Valideringsfeil) => f.faktumKey === this.FAKTUM_KEY);
		if (feilkode) {
			this.props.setValideringsfeil(null, this.FAKTUM_KEY);
		}
	}
	soknadsmottakerStatus(): SoknadsMottakerStatus {
		const { soknadsdata } = this.props;
		const navEnheter = soknadsdata.personalia.navEnheter;
		const valgtNavEnhet = navEnheter.find((navEnhet: NavEnhet ) => navEnhet.valgt);
		const adresser = soknadsdata.personalia.adresser;

		if (valgtNavEnhet || navEnheter.length === 1) {
			return SoknadsMottakerStatus.GYLDIG;
		}
		if (adresser.valg ) {
			if (adresser.valg === AdresseKategori.MIDLERTIDIG || adresser.valg === AdresseKategori.FOLKEREGISTRERT ) {
				if (navEnheter.length === 0) {
					return SoknadsMottakerStatus.UGYLDIG;
				}
			}
			if (adresser.valg === AdresseKategori.SOKNAD) {
				if (adresser.soknad && navEnheter.length === 0 && adresser.soknad.gateadresse !== null) {
					return SoknadsMottakerStatus.UGYLDIG;
				}
			}
		}
		return	SoknadsMottakerStatus.IKKE_VALGT;
	}

	render() {
		const { soknadsdata } = this.props;
		const restStatus: REST_STATUS = soknadsdata.restStatus.personalia.adresser;
		const adresser = soknadsdata.personalia.adresser;
		const navEnheter = soknadsdata.personalia.navEnheter;
		const valgtNavEnhet = navEnheter.find((navEnhet: NavEnhet ) => navEnhet.valgt);
		const folkeregistrertAdresse = adresser && adresser.folkeregistrert &&  adresser.folkeregistrert.gateadresse;
		const midlertidigAdresse = adresser && adresser.midlertidig && adresser.midlertidig.gateadresse;
		const soknadAdresse: Gateadresse = adresser && adresser.soknad && adresser.soknad.gateadresse;
		const formatertSoknadAdresse = formaterSoknadsadresse(soknadAdresse);
		const visSoknadsmottakerInfo: boolean = (restStatus === REST_STATUS.OK) ? true : false;

		let folkeregistrertAdresseLabel = null;
		let annenAdresseLabel = null;
		let { oppstartsModus } = this.state;
		if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
			oppstartsModus = false;
		}
		if (oppstartsModus) {
			folkeregistrertAdresseLabel = (<TextPlaceholder lines={3}/>);
			annenAdresseLabel = (<TextPlaceholder lines={3}/>);
		} else {
			folkeregistrertAdresseLabel = (
				<div className="finnNavKontor__label">
					<FormattedMessage id="kontakt.system.oppholdsadresse.folkeregistrertAdresse"/>
					<AdresseDetaljer adresse={folkeregistrertAdresse}/>
				</div>
			);
			annenAdresseLabel = (
				<div className="finnNavKontor__label">
					<FormattedMessage id="kontakt.system.oppholdsadresse.valg.soknad" />
				</div>
			);
		}
		return (
			<div className="sosialhjelp-oppholdsadresse skjema-sporsmal" id="soknadsmottaker">
				<SporsmalFaktum
					id="soknadsmottaker"
					faktumKey={this.FAKTUM_KEY}
					noValidateOnBlur={true}
					validerFunc={[ (value) => {
						if (this.soknadsmottakerStatus() !== SoknadsMottakerStatus.GYLDIG) {
							return ValideringActionKey.PAKREVD;
						}
						return null;
					} ]}
				>
					{folkeregistrertAdresse && (
						<span>
							<RadioEnhanced
								id="oppholdsadresse_folkeregistrert"
								value="folkeregistrert"
								onChange={() => this.onClickRadio(AdresseKategori.FOLKEREGISTRERT)}
								checked={adresser.valg === AdresseKategori.FOLKEREGISTRERT}
								label={folkeregistrertAdresseLabel}
							/>
							<SoknadsmottakerVelger
								label={getIntlTextOrKey(this.props.intl,
									"kontakt.system.oppholdsadresse.velgKontor")}
								navEnheter={navEnheter}
								visible={adresser.valg === AdresseKategori.FOLKEREGISTRERT && navEnheter.length > 1}
								onVelgSoknadsmottaker={(navEnhet: NavEnhet) => this.onVelgSoknadsmottaker(navEnhet)}
							/>
						</span>
					)}
					{midlertidigAdresse && (
						<span>
							<RadioEnhanced
								id="oppholdsadresse_midlertidig"
								value="midlertidig"
								onChange={() => this.onClickRadio(AdresseKategori.MIDLERTIDIG)}
								checked={adresser.valg === AdresseKategori.MIDLERTIDIG}
								label={
									<div className="finnNavKontor__label">
										<FormattedMessage id="kontakt.system.oppholdsadresse.midlertidigAdresse" />
										<AdresseDetaljer adresse={midlertidigAdresse}/>
									</div>
								}
							/>
							<SoknadsmottakerVelger
								label={getIntlTextOrKey(this.props.intl,
									"kontakt.system.oppholdsadresse.velgKontor")}
								navEnheter={navEnheter}
								visible={adresser.valg === AdresseKategori.MIDLERTIDIG && navEnheter.length > 1}
								onVelgSoknadsmottaker={(navEnhet: NavEnhet) => this.onVelgSoknadsmottaker(navEnhet)}
							/>
						</span>
					)}
					<RadioEnhanced
						id="oppholdsadresse_soknad"
						value="soknad"
						onChange={() => this.onClickRadio(AdresseKategori.SOKNAD)}
						checked={adresser.valg === AdresseKategori.SOKNAD}
						label={annenAdresseLabel}
					/>
					<div className="skjema-sporsmal--jaNeiSporsmal">
						<Underskjema visible={adresser.valg === AdresseKategori.SOKNAD}>
							<div className="utvidetAddresseSok">
								<Sporsmal
									tittelRenderer={() =>
										getIntlTextOrKey(this.props.intl,
											"kontakt.system.oppholdsadresse.hvorOppholder")
									}
									legendTittelStyle={LegendTittleStyle.FET_NORMAL}
								>
									<div style={{marginBottom: "1rem"}}>
										<FormattedHTMLMessage id="kontakt.system.kontaktinfo.infotekst.tekst"/>
									</div>
									<FormattedHTMLMessage id="kontakt.system.kontaktinfo.infotekst.ekstratekst"/>
									<AdresseTypeahead
										valgtAdresse={formatertSoknadAdresse}
										onVelgAnnenAdresse={(adresse: Adresse) => this.velgAnnenAdresse(adresse)}
									/>
								</Sporsmal>
								{navEnheter.length > 1 && (
									<SoknadsmottakerVelger
										label={getIntlTextOrKey(this.props.intl,
											"kontakt.system.oppholdsadresse.velgKontor")}
										ikkeVisPanel={true}
										navEnheter={navEnheter}
										visible={adresser.valg === AdresseKategori.SOKNAD}
										onVelgSoknadsmottaker={(navEnhet: NavEnhet) => this.onVelgSoknadsmottaker(navEnhet)}
									/>
								)}

							</div>
						</Underskjema>
					</div>
				</SporsmalFaktum>
				<SoknadsmottakerInfo
					synlig={visSoknadsmottakerInfo}
					soknadsmottakerStatus={this.soknadsmottakerStatus()}
					enhetsnavn={valgtNavEnhet && valgtNavEnhet.enhetsnavn}
					kommunenavn={valgtNavEnhet && valgtNavEnhet.kommunenavn}
				/>
			</div>);
	}
}

export {AdresseView};

export default connectSoknadsdataContainer(injectIntl(AdresseView));