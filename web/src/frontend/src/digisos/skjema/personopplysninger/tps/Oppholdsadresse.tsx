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
import NavAutocomplete, { Adresse } from "../../../../nav-soknad/components/navAutocomplete/navAutocomplete";
import { connect } from "react-redux";
import { State } from "../../../redux/reducers";
import { ValideringActionKey } from "../../../../nav-soknad/validering/types";
import Informasjonspanel from "../../../../nav-soknad/components/informasjonspanel";
import { DispatchProps } from "../../../../nav-soknad/redux/reduxTypes";
import { lagreFaktum } from "../../../../nav-soknad/redux/fakta/faktaActions";
import { fetchToJson } from "../../../../nav-soknad/utils/rest-utils";
// import {fetchToJson} from "../../../../nav-soknad/utils/rest-utils";

interface OwnProps {
	fakta: Faktum[];
	visUtvidetAdressesok: boolean;
	brukerBehandlingId: string;
}

type Props = OwnProps & InjectedIntlProps & DispatchProps;

interface AdresseProperties {
	kilde?: string;
	gaardsnummer?: string;
	postnummer?: string;
	poststed?: string;
}

interface StateProps {
	data: Adresse;
	visInformasjonsPanel: boolean; // TODO Rename til visSoknadsMottakerPanel
	soknadsmottaker: any;
}

class Oppholdsadresse extends React.Component<Props, StateProps> {

	constructor(props: Props) {
		super(props);
		this.state = {
			data: null,
			visInformasjonsPanel: false,
			soknadsmottaker: {}
		};
	}

	settAdresseFaktum(adresse: Adresse) {
		let faktum = finnFaktum("kontakt.adresse.bruker", this.props.fakta);
		const properties = [
			"type", "husnummer", "husbokstav", "kommunenummer",
			"kommunenavn", "postnummer", "poststed", "geografiskTilknytning",
		];
		properties.map((property: string) => {
			if (adresse[property]) {
				faktum = oppdaterFaktumMedVerdier(faktum, adresse[property], property);
			}
		});
		faktum = oppdaterFaktumMedVerdier(faktum, adresse.adresse, "gatenavn");
		this.props.dispatch(lagreFaktum(faktum));
	}

	oppdaterValgtSoknadsmottaker(soknadsmottaker: any) {
		let faktum = finnFaktum("soknadsmottaker", this.props.fakta);
		const properties = [
			"enhetsId", "enhetsnavn", "kommunenummer", "kommunenavn", "sosialOrgnr"
		];
		properties.map((property: string) => {
			if (soknadsmottaker[property]) {
				faktum = oppdaterFaktumMedVerdier(faktum, soknadsmottaker[property], property);
			}
		});
		this.props.dispatch(lagreFaktum(faktum));
	}

	invalidateValgtSoknadsmottaker() {
		this.oppdaterValgtSoknadsmottaker({
			"enhetsId": null,
			"enhetsnavn": null,
			"kommunenummer": null,
			"kommunenavn": null,
			"sosialOrgnr": null
		});
	}

	beregnSoknadsmottaker(brukerBehandlingId: string) {
		fetchToJson("soknadsmottaker/" + brukerBehandlingId)
		.then((response: any) => {
			if (response && response.toString().length > 0) {
				this.setState({ soknadsmottaker: response, visInformasjonsPanel: true });
				this.oppdaterValgtSoknadsmottaker(response);
			} else {
				this.setState({ soknadsmottaker: {}, visInformasjonsPanel: false });
				this.invalidateValgtSoknadsmottaker();
			}
		})
		.catch((error: any) => {
			console.error(error);
		});
	}

	handleNavAutoCompleteData(adresse: Adresse) {
		this.setState({data: adresse});
		if (adresse && adresse.adresse && adresse.adresse.length > 0) {
			this.settAdresseFaktum(adresse);
			this.beregnSoknadsmottaker(this.props.brukerBehandlingId);
		}
	}

	render() {
		const intl = this.props.intl;
		const fakta = this.props.fakta;
		const folkeregistrertAdresseFaktum = finnFaktum("kontakt.system.folkeregistrert.adresse", this.props.fakta);
		const adresseFaktum = finnFaktum("kontakt.system.adresse", this.props.fakta);

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
							onChange={() => this.beregnSoknadsmottaker(this.props.brukerBehandlingId)}
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
							onChange={() => this.beregnSoknadsmottaker(this.props.brukerBehandlingId)}
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
						onChange={() => this.beregnSoknadsmottaker(this.props.brukerBehandlingId)}
						value="soknad"/>
					<Underskjema
						visible={getFaktumVerdi(fakta, "kontakt.system.oppholdsadresse.valg") === "soknad"}
					>
						<div className="utvidetAddresseSok">
							<SporsmalFaktum faktumKey="kontakt.system.kontaktinfo">
								<NavAutocomplete onDataVerified={(data: any) => this.handleNavAutoCompleteData(data)}/>
							</SporsmalFaktum>
							{/*<button*/}
								{/*onClick={() => {*/}
									{/*this.setState({visInformasjonsPanel: !this.state.visInformasjonsPanel});*/}
								{/*}}>*/}
									{/*{!this.state.visInformasjonsPanel && (<span>Vis informasjonspanel</span>)}*/}
									{/*{this.state.visInformasjonsPanel && (<span>Skjult informasjonspanel</span>)}*/}
							{/*</button>*/}
						</div>
					</Underskjema>
				</SporsmalFaktum>
			</SporsmalFaktum>

			{this.state.visInformasjonsPanel && (
				<Informasjonspanel
					icon={<img src="/soknadsosialhjelp/statisk/bilder/konvolutt.svg"/>}
				>
					Søknaden vil bli sendt til
					&nbsp;{ this.state.soknadsmottaker && this.state.soknadsmottaker.enhetsnavn },
					&nbsp;{ this.state.soknadsmottaker && this.state.soknadsmottaker.kommunenavn }

				</Informasjonspanel>
			)}

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
		brukerBehandlingId: state.soknad.data.brukerBehandlingId
	};
})(injectIntl(Oppholdsadresse));
