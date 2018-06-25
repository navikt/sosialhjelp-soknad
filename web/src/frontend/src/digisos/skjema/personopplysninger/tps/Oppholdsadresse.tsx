import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Faktum } from "../../../../nav-soknad/types";
import RadioFaktum from "../../../../nav-soknad/faktum/RadioFaktum";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import SporsmalFaktum from "../../../../nav-soknad/faktum/SporsmalFaktum";
import { getFaktumVerdi, oppdaterFaktumMedVerdier } from "../../../../nav-soknad/utils";
import { finnFaktum } from "../../../../nav-soknad/utils";
import { connect } from "react-redux";
import { State } from "../../../redux/reducers";
import { DispatchProps } from "../../../../nav-soknad/redux/reduxTypes";
import AdresseVisning from "./AdresseVisning";
import SoknadsmottakerInfoPanel from "./SoknadsmottakerInfoPanel";
import AdresseAutocomplete from "../../../../nav-soknad/components/adresseAutocomplete/adresseAutcomplete";
import {
	SoknadsMottakerStatus,
	hentSoknadsmottakerAction, settSoknadsmottakerStatus, velgAdresseFraSoketreff, AdresseKategori, settAdresseKategori
} from "./oppholdsadresseReducer";
// import { ValideringActionKey } from "../../../../nav-soknad/validering/types";

export interface Adresse {
	"adresse": null | string;
	"husnummer": null | string;
	"husbokstav": null | string;
	"kommunenummer": null | string;
	"kommunenavn": null | string;
	"postnummer": null | string;
	"poststed": null | string;
	"geografiskTilknytning":  null | string;
	"gatekode": null | string;
	"bydel": null | string;
	"type": null | string;
}

export interface Soknadsmottaker {
	"enhetsId": null | string;
	"enhetsnavn": null | string;
	"kommunenummer": null | string;
	"kommunenavn": null | string;
	"bydelsnummer": null | string;
	"sosialOrgnr": null | string;
	"features": {
		"ettersendelse":  null | string;
	};
}

interface AdresseProperties {
	kilde?: string;
	gaardsnummer?: string;
	postnummer?: string;
	poststed?: string;
}

interface OwnProps {
	fakta: Faktum[];
	visUtvidetAdressesok: boolean;
	brukerBehandlingId: string;
	valgtAdresse: Adresse | null;
	soknadsmottaker: any;
	soknadsmottakerStatus: SoknadsMottakerStatus;
	adresseKategori: AdresseKategori;
}

export function faktumHarLogvligAdresse(faktum: any) {
	return faktum != null &&
		typeof faktum.properties !== "undefined" &&
		typeof faktum.properties.sosialOrgnr !== "undefined" &&
		faktum.properties.sosialOrgnr !== null &&
		faktum.properties.sosialOrgnr !== "";
}

type Props = OwnProps & InjectedIntlProps & DispatchProps;

class Oppholdsadresse extends React.Component<Props, {}> {

	finnOppholdsadressevalg() {
		// Midlertidig løsning. Skal erstattes med at man kan vente på at adressefaktumet er blitt oppdatert.
		const a = Array.from(document.getElementsByName("kontakt_system_oppholdsadresse_valg"))
			.filter(e => (e as any).checked);
		if (a.length > 0) {
			return (a[0] as any).value;
		} else {
			return null;
		}
	}
	settAdresseOgSoknadsmottaker(brukerBehandlingId: string, adresseFaktum: Faktum, fakta: Faktum[] ) {
		// TODO Detektere om vi har folkeregistrert|midlertidig|soknad
		const soknadsmottakerFaktum = finnFaktum("soknadsmottaker", this.props.fakta);
		// const oppholdsadressevalg = getFaktumVerdi(this.props.fakta, "kontakt.system.oppholdsadresse.valg")

		this.props.dispatch(hentSoknadsmottakerAction(
			this.props.brukerBehandlingId,
			adresseFaktum,
			soknadsmottakerFaktum,
			this.finnOppholdsadressevalg(),
			this.props.fakta,
			this.props.adresseKategori
		));
	}

	settAdresseFaktum(adresse: Adresse) {
		this.props.dispatch(settSoknadsmottakerStatus(SoknadsMottakerStatus.IKKE_VALGT));

		let adresseFaktum = finnFaktum("kontakt.adresse.bruker", this.props.fakta);

		if (adresse) {
			const properties = [
				"type", "husnummer", "husbokstav", "kommunenummer",
				"kommunenavn", "postnummer", "poststed", "geografiskTilknytning",
			];
			properties.map((property: string) => {
				adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, adresse[property], property);
			});
			adresseFaktum = oppdaterFaktumMedVerdier(adresseFaktum, adresse.adresse, "gatenavn");
		} else {
			adresseFaktum = null;
		}

		this.settAdresseOgSoknadsmottaker(
			this.props.brukerBehandlingId,
			adresseFaktum,
			this.props.fakta
		);
	}

	brukSystemAdresse(faktumKey: string) {
		const faktum = finnFaktum(faktumKey, this.props.fakta);
		const GATENAVN = "gatenavn";
		const HUSNUMMER = "husnummer";
		const HUSBOKSTAV = "husbokstav";
		const KOMMUNENUMMER = "kommunenummer";
		const KOMMUNENAVN = "kommunenavn";
		const POSTNUMMER = "postnummer";
		const POSTSTED = "poststed";

		// Denne må kunne håndtere andre typer adresse som matrikkeladresse
		const adresse: Adresse = {
			"adresse": faktum.properties[GATENAVN],
			"husnummer": faktum.properties[HUSNUMMER],
			"husbokstav": faktum.properties[HUSBOKSTAV],
			"kommunenummer": faktum.properties[KOMMUNENUMMER],
			"kommunenavn": faktum.properties[KOMMUNENAVN],
			"postnummer": faktum.properties[POSTNUMMER],
			"poststed": faktum.properties[POSTSTED],
			"geografiskTilknytning": null,
			"gatekode": null,
			"bydel": null,
			"type": "gateadresse"
		};
		//
		this.settAdresseFaktum(adresse);
	}

	brukValgtAdresse() {
		if (this.props.valgtAdresse) {
			this.settAdresseFaktum(this.props.valgtAdresse);
		} else {
			this.settAdresseFaktum(null);
		}
	}

	hentSoknadsmottakerMidlertidig() { // TODO: fiks denne.
		console.warn("debug hentSoknadsmottakerMidlertidig...her må gjøre noe.");
	}

	handleVelgAutocompleteAdresse(adresse: Adresse) {
		this.props.dispatch(velgAdresseFraSoketreff(adresse));
		if (adresse && adresse.adresse && adresse.adresse.length > 0) {
			this.settAdresseFaktum(adresse);
		} else {
			this.settAdresseFaktum(null);
			this.props.dispatch(velgAdresseFraSoketreff(null));
		}
	}

	brukFolkeregistrertAdresse() {
		this.props.dispatch(settAdresseKategori(AdresseKategori.FOLKEREGISTRERT));
		this.brukSystemAdresse("kontakt.system.folkeregistrert.adresse");
	}

	// brukMidlertidigAdresse() {
	//
	// }

	render() {
		const fakta = this.props.fakta;
		const folkeregistrertAdresseFaktum = finnFaktum("kontakt.system.folkeregistrert.adresse", this.props.fakta);
		const adresseFaktum = finnFaktum("kontakt.system.adresse", this.props.fakta);
		const adressesokAdresseFaktum = finnFaktum("kontakt.adresse.bruker", this.props.fakta);

		return (<div className="sosialhjelp-oppholdsadresse">
			<SporsmalFaktum faktumKey="kontakt.system.oppholdsadresse" style="system">
				<SporsmalFaktum

					faktumKey="soknadsmottaker"
					validerFunc={[(value) => {
						// const soknadsmottakerFaktum = finnFaktum("soknadsmottaker", this.props.fakta);
						// if (!faktumHarLogvligAdresse(soknadsmottakerFaktum)) {
						// 	return ValideringActionKey.PAKREVD;
						// }
						return null;
					}]}
				>
					{ Object.getOwnPropertyNames(folkeregistrertAdresseFaktum.properties).length !== 0 && (
						<RadioFaktum
							id="oppholdsadresse_folkeregistrert"
							faktumKey="kontakt.system.oppholdsadresse.valg"
							value="folkeregistrert"
							deaktiverLagring={true}
							onChange={() => this.brukFolkeregistrertAdresse()}
							label={
								<div>
									<div
										className="detaljeliste__element"
										style={{fontWeight: 600}}>Folkeregistrert adresse:
									</div>
									<AdresseVisning faktum={folkeregistrertAdresseFaktum}/>

								</div>
							}
						/>
					)}
					{ Object.getOwnPropertyNames(adresseFaktum.properties).length !== 0
					&& (adresseFaktum.properties as AdresseProperties).kilde !== "folkeregister" && (
						<RadioFaktum
							id="oppholdsadresse_midlertidig"
							faktumKey="kontakt.system.oppholdsadresse.valg"
							value="midlertidig"
							deaktiverLagring={true}
							onChange={() => this.brukSystemAdresse("kontakt.system.adresse")}
							label={
								<div>
									<div style={{fontWeight: 600}}>Midlertidig adresse:</div>
									<AdresseVisning faktum={adresseFaktum}/>

								</div>
							}
						/>
					)}
					<RadioFaktum
						id="oppholdsadresse_soknad"
						faktumKey="kontakt.system.oppholdsadresse.valg"
						deaktiverLagring={true}
						onChange={() => this.brukValgtAdresse()}
						value="soknad"/>
					<Underskjema
						visible={getFaktumVerdi(fakta, "kontakt.system.oppholdsadresse.valg") === "soknad"}
					>
						<div className="utvidetAddresseSok">
							<SporsmalFaktum
								faktumKey="kontakt.system.kontaktinfo"
								tittelRenderer={tittel => `${"Hvor oppholder du deg nå?"}`}
							>
								<AdresseAutocomplete
									adresseFaktum={adressesokAdresseFaktum}
									onValgtVerdi={(adresse: any) => this.handleVelgAutocompleteAdresse(adresse)}
								/>
							</SporsmalFaktum>
						</div>
					</Underskjema>
				</SporsmalFaktum>
			</SporsmalFaktum>
			<SoknadsmottakerInfoPanel
				soknadsmottakerStatus={this.props.soknadsmottakerStatus}
				soknadsmottakerFaktum={finnFaktum("soknadsmottaker", this.props.fakta)}
			/>
		</div>);
	}

}

export default connect((state: State, props: any) => {
	return {
		adresseliste: state.soknad.restStatus,
		startSoknadPending: state.soknad.startSoknadPending,
		faktaRestStatus: state.fakta.restStatus,
		navEnheter: state.kommuner.data,
		kommunerRestStatus: state.kommuner.restStatus,
		brukerBehandlingId: state.soknad.data.brukerBehandlingId,
		valgtAdresse: state.oppholdsadresse.valgtAdresse,
		soknadsmottaker: state.oppholdsadresse.soknadsmottaker,
		soknadsmottakerStatus: state.oppholdsadresse.soknadsmottakerStatus,
		adresseKategori: state.oppholdsadresse.adresseKategori

	};
})(injectIntl(Oppholdsadresse));
