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
import { ValideringActionKey } from "../../../../nav-soknad/validering/types";
import { DispatchProps } from "../../../../nav-soknad/redux/reduxTypes";
import AdresseVisning from "./AdresseVisning";
import SoknadsmottakerInfoPanel from "./SoknadsmottakerInfoPanel";
import AdresseAutocomplete from "../../../../nav-soknad/components/adresseAutocomplete/adresseAutcomplete";
import {
	SoknadsMottakerStatus,
	hentSoknadsmottakerAction, settSoknadsmottakerStatus
} from "./oppholdsadresseReducer";
import { settValgtAdresse } from "../../../../nav-soknad/components/adresseAutocomplete/adresseAutocompleteReducer";

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

	settAdresseOgSoknadsmottaker(brukerBehandlingId: string, adresse: Adresse, adresseFaktum: Faktum, fakta: Faktum[] ) {
		const soknadsmottakerFaktum = finnFaktum("soknadsmottaker", this.props.fakta);
		this.props.dispatch(hentSoknadsmottakerAction(
			this.props.brukerBehandlingId,
			adresse,
			adresseFaktum,
			soknadsmottakerFaktum,
			this.props.fakta
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
			console.warn("adresse = null. Sendes til sagan.");
		}

		this.settAdresseOgSoknadsmottaker(
			this.props.brukerBehandlingId,
			adresse,
			adresseFaktum,
			this.props.fakta
		);
	}

	brukFolkeregistrertAdresse(faktumKey: string) {
		const faktum = finnFaktum(faktumKey, this.props.fakta);
		const GATENAVN = "gatenavn";
		const HUSNUMMER = "husnummer";
		const HUSBOKSTAV = "husbokstav";
		const KOMMUNENUMMER = "kommunenummer";
		const KOMMUNENAVN = "kommunenavn";
		const POSTNUMMER = "postnummer";
		const POSTSTED = "poststed";

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
		this.settAdresseFaktum(adresse);
	}

	// settInnTomAdresse() {
	// 	const adresse: Adresse = {
	// 		"adresse": null,
	// 		"husnummer": null,
	// 		"husbokstav": null,
	// 		"kommunenummer": null,
	// 		"kommunenavn": null,
	// 		"postnummer": null,
	// 		"poststed": null,
	// 		"geografiskTilknytning": null,
	// 		"gatekode": null,
	// 		"bydel": null,
	// 		"type" : "gateadresse"
	// 	};
	// 	return adresse;
	// }

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
		this.props.dispatch(settValgtAdresse(adresse));
		if (adresse && adresse.adresse && adresse.adresse.length > 0) {
			this.settAdresseFaktum(adresse);
		} else {
			this.settAdresseFaktum(null);
		}
	}

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
						const soknadsmottakerFaktum = finnFaktum("soknadsmottaker", this.props.fakta);
						if (!faktumHarLogvligAdresse(soknadsmottakerFaktum)) {
							return ValideringActionKey.PAKREVD;

						}
						// if (this.props.soknadsmottakerStatus === SoknadsMottakerStatus.UGYLDIG){
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
							onChange={() => this.brukFolkeregistrertAdresse("kontakt.system.folkeregistrert.adresse")}
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
							onChange={() => this.hentSoknadsmottakerMidlertidig()}
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
		soknadsmottakerStatus: state.oppholdsadresse.soknadsmottakerStatus

	};
})(injectIntl(Oppholdsadresse));
