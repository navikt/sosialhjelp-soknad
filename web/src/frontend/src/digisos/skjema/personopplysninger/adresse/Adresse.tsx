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
import { ValideringActionKey } from "../../../../nav-soknad/validering/types";
import SporsmalFaktum from "../../../../nav-soknad/faktum/SporsmalFaktum";
import SoknadsmottakerInfo from "./SoknadsmottakerInfo";
import { SoknadsMottakerStatus } from "../tps/oppholdsadresseReducer";
import { formaterSoknadsadresse } from "./AdresseUtils";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class AdresseView extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.ADRESSER);
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.NAV_ENHETER);

	}

	onClickRadio(adresseKategori: AdresseKategori) {
		const { soknadsdata, brukerBehandlingId, oppdaterSoknadsdataSti, lagreSoknadsdata } = this.props;
		const adresser = soknadsdata.personalia.adresser;
		adresser.valg = adresseKategori;
		oppdaterSoknadsdataSti(SoknadsSti.ADRESSER, adresser);
		if (adresseKategori === AdresseKategori.SOKNAD) {
			oppdaterSoknadsdataSti(SoknadsSti.NAV_ENHETER, []);
		} else {
			const payload = {"valg": adresseKategori};
			lagreSoknadsdata(brukerBehandlingId, SoknadsSti.ADRESSER, payload, (navEnheter: NavEnhet[]) => {
				if (navEnheter.length === 1) {
					const valgtNavEnhet: NavEnhet = navEnheter[0];
					valgtNavEnhet.valgt = true;
					lagreSoknadsdata(brukerBehandlingId, SoknadsSti.NAV_ENHETER, valgtNavEnhet);
				}
				oppdaterSoknadsdataSti(SoknadsSti.NAV_ENHETER, navEnheter);
			});
		}
	}

	velgAnnenAdresse(adresse: Adresse) {
		const { brukerBehandlingId, lagreSoknadsdata, oppdaterSoknadsdataSti } = this.props;
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
			lagreSoknadsdata(brukerBehandlingId, SoknadsSti.ADRESSER, payload, (navEnheter: NavEnhet[]) => {
				if (navEnheter.length === 1) {
					const valgtNavEnhet: NavEnhet = navEnheter[0];
					valgtNavEnhet.valgt = true;
					lagreSoknadsdata(brukerBehandlingId, SoknadsSti.NAV_ENHETER, valgtNavEnhet);
				}
				oppdaterSoknadsdataSti(SoknadsSti.NAV_ENHETER, navEnheter);
			});
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
	}

	soknadsmottakerStatus(): SoknadsMottakerStatus {
		const { soknadsdata } = this.props;
		const navEnheter = soknadsdata.personalia.navEnheter;
		const valgtNavEnhet = navEnheter.find((navEnhet: NavEnhet ) => navEnhet.valgt);
		if (valgtNavEnhet || navEnheter.length === 1) {
			return SoknadsMottakerStatus.GYLDIG;
		}
		return	SoknadsMottakerStatus.IKKE_VALGT;
	}

	render() {
		const { soknadsdata } = this.props;
		const adresser = soknadsdata.personalia.adresser;
		const navEnheter = soknadsdata.personalia.navEnheter;
		const valgtNavEnhet = navEnheter.find((navEnhet: NavEnhet ) => navEnhet.valgt);

		const folkeregistrertAdresse = adresser && adresser.folkeregistrert &&  adresser.folkeregistrert.gateadresse;
		const midlertidigAdresse = adresser && adresser.midlertidig && adresser.midlertidig.gateadresse;
		const soknadAdresse: Gateadresse = adresser && adresser.soknad && adresser.soknad.gateadresse;
		const formatertSoknadAdresse = formaterSoknadsadresse(soknadAdresse);

		return (
			<div className="sosialhjelp-oppholdsadresse skjema-sporsmal" id="soknadsmottaker"
			     style={{border: "2px dotted red"}}
			>
				<SporsmalFaktum
					id="soknadsmottaker"
					faktumKey="soknadsmottaker"
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
								label={
									<div className="finnNavKontor__label">
										<FormattedMessage id="kontakt.system.oppholdsadresse.folkeregistrertAdresse"/>
										<AdresseDetaljer adresse={folkeregistrertAdresse}/>
									</div>
								}
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
						label={
							<div className="finnNavKontor__label">
								<FormattedMessage id="kontakt.system.oppholdsadresse.valg.soknad" />
							</div>
						}
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
					soknadsmottakerStatus={this.soknadsmottakerStatus()}
					enhetsnavn={valgtNavEnhet && valgtNavEnhet.enhetsnavn}
					kommunenavn={valgtNavEnhet && valgtNavEnhet.kommunenavn}
					/>
			</div>);
	}
}

export {AdresseView};

export default connectSoknadsdataContainer(injectIntl(AdresseView));