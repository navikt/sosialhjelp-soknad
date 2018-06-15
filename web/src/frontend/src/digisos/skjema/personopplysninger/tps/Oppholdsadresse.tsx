import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Faktum } from "../../../../nav-soknad/types";
import RadioFaktum from "../../../../nav-soknad/faktum/RadioFaktum";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import SporsmalFaktum from "../../../../nav-soknad/faktum/SporsmalFaktum";
import {
	getFaktumVerdi, oppdaterFaktumMedVerdier
} from "../../../../nav-soknad/utils";
import Detaljeliste, {
	ElementProps,
	DetaljelisteElement
} from "../../../../nav-soknad/components/detaljeliste";
import { finnFaktum } from "../../../../nav-soknad/utils";
import NavAutocomplete from "../../../../nav-soknad/components/navAutocomplete/navAutocomplete";
import { connect } from "react-redux";
import { State } from "../../../redux/reducers";
import { ValideringActionKey } from "../../../../nav-soknad/validering/types";
import Informasjonspanel from "../../../../nav-soknad/components/informasjonspanel";
import { DispatchProps } from "../../../../nav-soknad/redux/reduxTypes";
import { lagreFaktum } from "../../../../nav-soknad/redux/fakta/faktaActions";
import { fetchToJson } from "../../../../nav-soknad/utils/rest-utils";
import { velgAdresseFraSoketreff, velgFolkeregistrertAdresse } from "./oppholdsadresseReducer";

interface OwnProps {
	fakta: Faktum[];
	visUtvidetAdressesok: boolean;
	brukerBehandlingId: string;
	oppholdsadresse: any;
}

type Props = OwnProps & InjectedIntlProps & DispatchProps;

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

interface StateProps {
	adresseFolkeregistrert: Adresse;
	adresseValgt: Adresse;
	visInformasjonsPanel: boolean; // TODO Rename til visSoknadsMottakerPanel
	soknadsmottaker: null | Soknadsmottaker;
}

class Oppholdsadresse extends React.Component<Props, StateProps> {

	constructor(props: Props) {
		super(props);

		this.state = {
			adresseFolkeregistrert: null,
			adresseValgt: null,
			soknadsmottaker: null,
			visInformasjonsPanel: false
		};
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
	}

	oppdaterValgtSoknadsmottaker(soknadsmottaker: any) {
		let faktum = finnFaktum("soknadsmottaker", this.props.fakta);
		const properties = [
			"enhetsId",
			"enhetsnavn",
			"kommunenummer",
			"kommunenavn",
			"sosialOrgnr"
		];
		properties.map((property: string) => {
			faktum = oppdaterFaktumMedVerdier(faktum, soknadsmottaker[property], property);
		});
		this.props.dispatch(lagreFaktum(faktum));
	}

	slettSoknadsmottakerFraFaktumAdresse() {
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
			"type": "gateadresse"
		};

		this.settAdresseFaktum(adresse);
		this.hentSoknadsmottaker(this.props.brukerBehandlingId);
	}

	settSoknadsmottaterFraFaktumAdresse(faktumKey: string) {
		this.setState({
			visInformasjonsPanel: false
		});

		const faktum = finnFaktum(faktumKey, this.props.fakta);

		const ADRESSE = "adresse";
		const GATENAVN = "gatenavn";
		const HUSBOKSTAV = "husbokstav";
		const KOMMUNENUMMER = "kommunenummer";
		const KOMMUNENAVN = "kommunenavn";
		const POSTNUMMER = "postnummer";
		const POSTSTED = "poststed";

		const adresse: Adresse = {
			"adresse": faktum.properties[ADRESSE],
			"husnummer": faktum.properties[GATENAVN],
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

		console.warn("Du klikket på radio folkeregister. Adressen er:");
		console.warn(JSON.stringify(adresse, null, 4));


		this.props.dispatch(velgFolkeregistrertAdresse(adresse));

		if (adresse && adresse.adresse && adresse.adresse.length > 0) {
			this.settAdresseFaktum(adresse);
			this.hentSoknadsmottaker(this.props.brukerBehandlingId);
		}

		this.setState({
			adresseFolkeregistrert: adresse,
		});
	}

	brukValgtAdresse() {
		this.setState({
			visInformasjonsPanel: false,
			soknadsmottaker: null
		});
		// this.slettSoknadsmottakerFraFaktumAdresse();

		console.error(JSON.stringify(this.state.adresseValgt, null, 4));

		if (this.state.adresseValgt) {
			this.props.dispatch(velgAdresseFraSoketreff(this.state.adresseValgt));
			this.settAdresseFaktum(this.state.adresseValgt);
			this.hentSoknadsmottaker(this.props.brukerBehandlingId);
		}
	}

	hentSoknadsmottaker(brukerBehandlingId: string) {
		fetchToJson("soknadsmottaker/" + brukerBehandlingId)
		.then((response: any) => {
			if (response && response.toString().length > 0) {
				this.setState({
					soknadsmottaker: response,
					visInformasjonsPanel: true
				});
				this.oppdaterValgtSoknadsmottaker(response);
				console.warn(JSON.stringify(response, null, 4));
			} else {
				this.setState({
					soknadsmottaker: null,
					visInformasjonsPanel: false
				});
				console.warn("soknadsmottaker: null !!!!!!!!!!!! altså respons fra zero-...nothing... blæ");
			}
		})
		.catch((error: any) => {
			console.error(error);
		});
	}

	hentSoknadsmottakerMidlertidig(){
		this.hentSoknadsmottaker(this.props.brukerBehandlingId);
		console.error("DANGER ! DANGER ! ^^");
	}

	handleVelgAutocompleteAdresse(adresse: Adresse) {
		console.error("adresse fra autocomplete");
		console.warn(JSON.stringify(adresse, null, 4));
		this.setState({
			adresseValgt: null,
			soknadsmottaker: null,
			visInformasjonsPanel: false
		});

		if (adresse && adresse.adresse && adresse.adresse.length > 0) {
			this.props.dispatch(velgAdresseFraSoketreff(adresse));
			this.settAdresseFaktum(adresse);
			this.hentSoknadsmottaker(this.props.brukerBehandlingId);
			this.setState({
				adresseValgt: adresse,
			});
			console.warn("adressen ble lagret på valgt adresse...");
		} else {
			this.setState({
				adresseValgt: null,
				visInformasjonsPanel: false
			});
		}
	}

	renderInformasjonsPanel() {
		let style: any = null;
		let tekst: any = "";

		const SOSIALORGNR = "sosialOrgnr";
		const KOMMUNENAVN = "kommunenavn";
		const ENHETSNAVN = "enhetsnavn";

		if (this.state.soknadsmottaker && this.state.visInformasjonsPanel) {
			if (this.state.soknadsmottaker[SOSIALORGNR] === null) {
				style = "feil";
				tekst = "Søknaden er ikke tilgjengelig digitalt i din kommune. Ta kontakt direkte med ditt NAV kontor. Les mer";
			} else {
				tekst = "Søknaden vil bli sendt til: "
					+ this.state.soknadsmottaker[ENHETSNAVN]
					+ ", "
					+ this.state.soknadsmottaker[KOMMUNENAVN]
					+ " kommune.";
			}

			return (
				<Informasjonspanel
					icon={<img src="/soknadsosialhjelp/statisk/bilder/konvolutt.svg"/>}
					style={style}
				>
					{tekst}
				</Informasjonspanel>
			);
		} else {
			return null;
		}

	}

	render() {
		const intl = this.props.intl;
		const fakta = this.props.fakta;
		const folkeregistrertAdresseFaktum = finnFaktum("kontakt.system.folkeregistrert.adresse", this.props.fakta);
		const adresseFaktum = finnFaktum("kontakt.system.adresse", this.props.fakta);
		const adressesokAdresseFaktum = finnFaktum("kontakt.adresse.bruker", this.props.fakta);

		const getProperty = (faktum: Faktum, key: string): ElementProps => {
			if (faktum.properties[key] == null) {
				return null;
			}
			return ({
				tittel: intl.formatMessage({
					id: "kontakt.system.adresse." + key + ".label"
				}),
				verdi: faktum.properties[key]
			});
		};

		const getPropertyWithoutName = (faktum: Faktum, key: string) => {
			if (faktum.properties[key] == null) {
				return null;
			}
			return <li className="detaljeliste__element">{faktum.properties[key]}</li>;
		};

		const visAdresse = (faktum: Faktum) => {
			const adresseProperties = faktum.properties as AdresseProperties;
			return <Detaljeliste>
				{getPropertyWithoutName(faktum, "adresse")}
				{adresseProperties.postnummer != null && adresseProperties.poststed != null && (
					<li className="detaljeliste__element">{adresseProperties.postnummer} {adresseProperties.poststed}</li>
				)

				}
				<DetaljelisteElement {...getProperty(faktum, "eiendomsnavn")} />
				{adresseProperties.gaardsnummer != null &&
					<DetaljelisteElement {...getProperty(faktum, "kommunenummer")} />
				}
				<DetaljelisteElement {...getProperty(faktum, "gaardsnummer")} />
				<DetaljelisteElement {...getProperty(faktum, "bruksnummer")} />
				<DetaljelisteElement {...getProperty(faktum, "festenummer")} />
				<DetaljelisteElement {...getProperty(faktum, "seksjonsnummer")} />
				<DetaljelisteElement {...getProperty(faktum, "undernummer")} />
			</Detaljeliste>;
		};

		return (<div className="sosialhjelp-oppholdsadresse">
			<SporsmalFaktum faktumKey="kontakt.system.oppholdsadresse" style="system">
				<SporsmalFaktum
					faktumKey="kontakt.system.oppholdsadresse.valg"
					validerFunc={[(value) => {
						if (value == null) {
							return ValideringActionKey.PAKREVD;
						}
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
									{visAdresse(folkeregistrertAdresseFaktum)}
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
									{visAdresse(adresseFaktum)}
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
							<SporsmalFaktum faktumKey="kontakt.system.kontaktinfo">
								<NavAutocomplete
									adresseFaktum={adressesokAdresseFaktum}
									onValgtVerdi={(adresse: any) => this.handleVelgAutocompleteAdresse(adresse)}
								/>
							</SporsmalFaktum>
						</div>
					</Underskjema>
				</SporsmalFaktum>
			</SporsmalFaktum>

			{/*{ this.state.soknadsmottaker && this.state.visInformasjonsPanel && <ul>*/}
				{/*<li>{ this.state.soknadsmottaker.enhetsnavn }</li>*/}
				{/*<li>{ this.state.soknadsmottaker.kommunenavn }</li>*/}
				{/*<li>{ this.state.soknadsmottaker.sosialOrgnr }</li>*/}
			{/*</ul> }*/}

			{this.state.visInformasjonsPanel && this.renderInformasjonsPanel()}

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
		oppholdsadresse: state.oppholdsadresse
	};
})(injectIntl(Oppholdsadresse));
