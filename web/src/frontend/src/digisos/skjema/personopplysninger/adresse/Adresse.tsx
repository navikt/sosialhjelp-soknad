import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import * as React from "react";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { getFaktumSporsmalTekst, getIntlTextOrKey } from "../../../../nav-soknad/utils";
import Sporsmal, { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import AdresseDetaljer from "./AdresseDetaljer";
import { AdresseKategori } from "./AdresseTypes";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import AdresseTypeahead, { Adresse } from "./AdresseTypeahead";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class AdresseView extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.ADRESSER);
	}

	onClickRadio(adresseKategori: AdresseKategori) {
		const { soknadsdata, brukerBehandlingId } = this.props;
		const adresser = soknadsdata.personalia.adresser;
		adresser.valg = adresseKategori;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.ADRESSER, adresser);
		if (adresseKategori !== AdresseKategori.SOKNAD) {
			const payload = {"valg": adresseKategori};
			this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.ADRESSER, payload, (response: any) => {
				console.warn("Debbug: PUT response: " + JSON.stringify(response, null, 4));
			});
		}
	}

	/*
	export interface Adresse {
	"adresse": null | string;
	"husnummer": null | string;
	"husbokstav": null | string;
	"kommunenummer": null | string;
	"kommunenavn": null | string;
	"postnummer": null | string;
	"poststed": null | string;
	"geografiskTilknytning": null | string;
	"gatekode": null | string;
	"bydel": null | string;
	"type": null | string;
	 */
	velgAnnenAdresse(adresse: Adresse) {
		const { brukerBehandlingId } = this.props;
		console.warn("Adresse: typeahead: velgVerdi() " + JSON.stringify(adresse, null, 4));
		const payload = {
			"valg": "soknad",
			"type": "gateadresse",
			"gateadresse": {
				"type": "gateadresse",
				"kommunenummer": adresse.kommunenummer,
				"postnummer": adresse.postnummer,
				"poststed": adresse.poststed,
				"gatenavn": adresse.adresse,
				"husnummer": adresse.husnummer,
				"husbokstav": adresse.husbokstav
			}
		};
		this.props.lagreSoknadsdata(brukerBehandlingId, SoknadsSti.ADRESSER, payload, (response: any) => {
			console.warn("Debbug: PUT response: " + JSON.stringify(response, null, 4));
		});
	}

	render() {
		const { soknadsdata } = this.props;
		const adresser = soknadsdata.personalia.adresser;
		const folkeregistrertAdresse = adresser && adresser.folkeregistrert &&  adresser.folkeregistrert.gateadresse;
		const midlertidigAdresse = adresser && adresser.midlertidig && adresser.midlertidig.gateadresse;
		const soknadAdresse = adresser && adresser.soknad && adresser.soknad.gateadresse;
		let formatertSoknadAdresse = "";
		if (soknadAdresse) {
			formatertSoknadAdresse = soknadAdresse.gatenavn +
			" " + soknadAdresse.husnummer +
			" " +
			soknadAdresse.husbokstav + ", " +
			soknadAdresse.postnummer + " " + soknadAdresse.poststed;
		}

		return (
			<div className="sosialhjelp-oppholdsadresse skjema-sporsmal" id="soknadsmottaker"
			     style={{border: "2px dotted red"}}
			>
				<Sporsmal
					tekster={getFaktumSporsmalTekst(this.props.intl, "soknadsmottaker")}
					// noValidateOnBlur={true} // TODO Legg på denne?
					// validerFunc={[ (value) => {
					// 	// TODO Legg på sjekk på at adresse er valgt!
					// 	// if (this.props.soknadsmottakerStatus !== SoknadsMottakerStatus.GYLDIG) {
					// 	// 	return ValideringActionKey.PAKREVD;
					// 	// }
					// 	return null;
					// } ]}
				>
					{folkeregistrertAdresse && (
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
					)}
					{midlertidigAdresse && (
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
										onVelgVerdi={(adresse: Adresse) => this.velgAnnenAdresse(adresse)}
									/>

								</Sporsmal>
							</div>
						</Underskjema>
					</div>
				</Sporsmal>
			</div>);
	}
}

export {AdresseView};

export default connectSoknadsdataContainer(injectIntl(AdresseView));