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
import { lagreFaktum } from "../../../../nav-soknad/redux/fakta/faktaActions";
import AdresseVisning from "./AdresseVisning";
import SoknadsmottakerInfoPanel from "./SoknadsmottakerInfoPanel";
import AdresseAutocomplete from "../../../../nav-soknad/components/adresseAutocomplete/adresseAutcomplete";
import {
	SoknadsMottakerStatus,
	settSoknadsmottakerStatus,
	velgAdresseFraSoketreff,
	hentSoknadsmottakerAction
} from "./oppholdsadresseReducer";

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
	valgtAdresse: Adresse;
	soknadsmottaker: any;
	soknadsmottakerStatus: SoknadsMottakerStatus;
}

type Props = OwnProps & InjectedIntlProps & DispatchProps;

class Oppholdsadresse extends React.Component<Props, {}> {

	componentWillReceiveProps(nextProps: any) {
		const faktumSoknadsMottaker = finnFaktum("soknadsmottaker", this.props.fakta);
		const ENHETSID = "enhetsId";
		const SOSIALORGNR = "sosialOrgnr";
		if ( this.props.soknadsmottakerStatus === SoknadsMottakerStatus.IKKE_VALGT ) {
			const faktum = finnFaktum("soknadsmottaker", this.props.fakta);
			this.props.dispatch(hentSoknadsmottakerAction(this.props.brukerBehandlingId, faktum));
			this.props.dispatch(settSoknadsmottakerStatus(SoknadsMottakerStatus.VALGT));
		}
		if (faktumSoknadsMottaker.properties[SOSIALORGNR]) {
			this.props.dispatch(settSoknadsmottakerStatus(SoknadsMottakerStatus.GYLDIG));
		} else if (faktumSoknadsMottaker.properties[ENHETSID]) {
			this.props.dispatch(settSoknadsmottakerStatus(SoknadsMottakerStatus.UGYLDIG));
		} else {
			this.props.dispatch(settSoknadsmottakerStatus(SoknadsMottakerStatus.VALGT));
		}
	}

	settAdresseFaktum(adresse: Adresse) {
		let faktum = finnFaktum("kontakt.adresse.bruker", this.props.fakta);
		const properties = [
			"type", "husnummer", "husbokstav", "kommunenummer",
			"kommunenavn", "postnummer", "poststed", "geografiskTilknytning",
		];
		properties.map((property: string) => {
			faktum = oppdaterFaktumMedVerdier(faktum, adresse[property], property);
		});
		faktum = oppdaterFaktumMedVerdier(faktum, adresse.adresse, "gatenavn");
		this.props.dispatch(lagreFaktum(faktum));
		this.props.dispatch(settSoknadsmottakerStatus(SoknadsMottakerStatus.IKKE_VALGT));
	}

	settSoknadsmottaterFraFaktumAdresse(faktumKey: string) {
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
		if (adresse && adresse.adresse && adresse.adresse.length > 0) {
			this.settAdresseFaktum(adresse);
		}
	}

	settInnTomAdresse() {
		const adresse: Adresse = {
			"adresse": null,
			"husnummer": null,
			"husbokstav": null,
			"kommunenummer": null,
			"kommunenavn": null,
			"postnummer": null,
			"poststed": null,
			"geografiskTilknytning": null,
			"gatekode": null,
			"bydel": null,
			"type" : "gateadresse"
		};
		return adresse;
	}

	brukValgtAdresse() {
		if (this.props.valgtAdresse) {
			this.settAdresseFaktum(this.props.valgtAdresse);
		} else {
			this.settAdresseFaktum(this.settInnTomAdresse());
		}
	}

	hentSoknadsmottakerMidlertidig() { // TODO: fiks denne.
		console.warn("debug hentSoknadsmottakerMidlertidig...her må gjøre noe.");
	}

	handleVelgAutocompleteAdresse(adresse: Adresse) {
		if (adresse && adresse.adresse && adresse.adresse.length > 0) {
			this.settAdresseFaktum(adresse);
			this.props.dispatch(velgAdresseFraSoketreff(adresse));
		} else {
			this.settAdresseFaktum(this.settInnTomAdresse());
		}
	}

	render() {
		const fakta = this.props.fakta;
		const folkeregistrertAdresseFaktum = finnFaktum("kontakt.system.folkeregistrert.adresse", this.props.fakta);
		const adresseFaktum = finnFaktum("kontakt.system.adresse", this.props.fakta);
		const adressesokAdresseFaktum = finnFaktum("kontakt.adresse.bruker", this.props.fakta);

		// TODO Finn en bedre å måte å detektere på om bruker får lov til å trykke på "Gi videre knapp"
		const gaaVidereFaktum = finnFaktum("soknadsmottaker", this.props.fakta);
		// const gaaVidereFaktum = finnFaktum("kontakt.system.oppholdsadresse.valg", this.props.fakta);
		console.warn("gaaVidereFaktum: " + JSON.stringify(gaaVidereFaktum.properties, null, 4));

		return (<div className="sosialhjelp-oppholdsadresse">
			<SporsmalFaktum faktumKey="kontakt.system.oppholdsadresse" style="system">
				<SporsmalFaktum
					faktumKey="kontakt.system.oppholdsadresse.valg"
					validerFunc={[(value) => {
						if (value == null) {
							return ValideringActionKey.PAKREVD;
						}

						// return ValideringActionKey.PAGREVD if soknadsmottaker ikke OK...
						return null;
					}]}
				>
					{ Object.getOwnPropertyNames(folkeregistrertAdresseFaktum.properties).length !== 0 && (
						<RadioFaktum
							id="oppholdsadresse_folkeregistrert"
							faktumKey="kontakt.system.oppholdsadresse.valg"
							value="folkeregistrert"
							onChange={() => this.settSoknadsmottaterFraFaktumAdresse("kontakt.system.folkeregistrert.adresse")}
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
