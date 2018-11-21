import * as React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import { Faktum } from "../../../../nav-soknad/types";
import RadioFaktum from "../../../../nav-soknad/faktum/RadioFaktum";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import SporsmalFaktum from "../../../../nav-soknad/faktum/SporsmalFaktum";
import { getFaktumVerdi } from "../../../../nav-soknad/utils";
import { finnFaktum } from "../../../../nav-soknad/utils";
import { connect } from "react-redux";
import { State } from "../../../redux/reducers";
import { DispatchProps } from "../../../../nav-soknad/redux/reduxTypes";
import AdresseVisning from "./AdresseVisning";
import SoknadsmottakerInfoPanel from "./SoknadsmottakerInfoPanel";
import AdresseAutocomplete from "../../../../nav-soknad/components/adresseAutocomplete/adresseAutcomplete";
import {
	SoknadsMottakerStatus,
	hentSoknadsmottakerAction,
	AdresseKategori,
	settSoknadsmottakerStatus
} from "./oppholdsadresseReducer";
import { ValideringActionKey } from "../../../../nav-soknad/validering/types";
import { setFaktumValideringsfeil } from "../../../../nav-soknad/redux/valideringActions";
import VelgSoknadsmottaker from "./VelgSoknadsmottaker";
import FinnNavKontorSpinner from "./FinnNavKontorSpinner";
import { getIntlTextOrKey } from "../../../../nav-soknad/utils/intlUtils";
import {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";

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
	soknadsmottaker: any; // Soknadsmottaker
	soknadsmottakerStatus: SoknadsMottakerStatus;
	soknadsmottakere: any[];
}

function transformAdresse(adresseFaktum: Faktum) {

	const ADRESSE = "adresse";
	const HUSNUMMER = "husnummer";
	const HUSBOKSTAV = "husbokstav";
	const KOMMUNENUMMER = "kommunenummer";
	const KOMMUNENAVN = "kommunenavn";
	const POSTNUMMER = "postnummer";
	const POSTSTED = "poststed";
	const GEOGRAFISKTILKNYTNING = "geografiskTilknytning";
	const GATEKODE = "gatekode";
	const BYDEL = "bydel";
	const TYPE = "type";
	const GATENAVN = "gatenavn";

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
		"type": null
	};

	adresse[ADRESSE] = adresseFaktum.properties[GATENAVN];
	adresse[HUSNUMMER] = adresseFaktum.properties[HUSNUMMER];
	adresse[HUSBOKSTAV] = adresseFaktum.properties[HUSBOKSTAV];
	adresse[KOMMUNENUMMER] = adresseFaktum.properties[KOMMUNENUMMER];
	adresse[KOMMUNENAVN] = adresseFaktum.properties[KOMMUNENAVN];
	adresse[POSTNUMMER] = adresseFaktum.properties[POSTNUMMER];
	adresse[POSTSTED] = adresseFaktum.properties[POSTSTED];
	adresse[GEOGRAFISKTILKNYTNING] = adresseFaktum.properties[GEOGRAFISKTILKNYTNING];
	adresse[GATEKODE] = null;
	adresse[BYDEL] = null;
	adresse[TYPE] = "gateadresse";

	return adresse;
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

	constructor(props: Props) {
		super(props);
		const oppholdsadresseFaktum = finnFaktum("kontakt.system.oppholdsadresse.valg", this.props.fakta);
		if (oppholdsadresseFaktum && oppholdsadresseFaktum.value) {
			this.kjorSagaVedRefresh(oppholdsadresseFaktum);
		}
	}

	kjorSagaVedRefresh(oppholdsadresseFaktum: Faktum) {
		if (oppholdsadresseFaktum.value === "folkeregistrert") {
			this.brukFolkeregistrertAdresse();
		} else if (oppholdsadresseFaktum.value === "midlertidig") {
			this.brukMidlertidigAdresse();
		} else if (oppholdsadresseFaktum.value === "soknad") {
			this.brukSoknadAdresse();
		}
	}

	settAdresseOgSoknadsmottaker(adresse: Adresse, oppholdsadressevalg: string, adresseKategori: AdresseKategori ) {
		this.props.dispatch(setFaktumValideringsfeil(null, "soknadsmottaker"));
		this.props.dispatch(settSoknadsmottakerStatus(SoknadsMottakerStatus.IKKE_VALGT));
		this.props.dispatch(hentSoknadsmottakerAction(
			this.props.brukerBehandlingId,
			this.props.fakta,
			adresse,
			oppholdsadressevalg,
			adresseKategori
		));
	}

	brukFolkeregistrertAdresse() {
		const oppholdsadressevalg = "folkeregistrert";
		const adresseKategori = AdresseKategori.FOLKEREGISTRERT;
		this.settAdresseOgSoknadsmottaker(null, oppholdsadressevalg, adresseKategori);
	}

	brukMidlertidigAdresse() {
		const oppholdsadressevalg = "midlertidig";
		const adresseKategori = AdresseKategori.MIDLERTIDIG;
		this.settAdresseOgSoknadsmottaker(null, oppholdsadressevalg, adresseKategori);
	}

	brukSoknadAdresse() {
		const adresseFaktum = finnFaktum("kontakt.adresse.bruker", this.props.fakta);
		const GATENAVN = "gatenavn";
		const Oppholdsadressevalg = "soknad";
		const adresseKategori = AdresseKategori.SOKNAD;

		if (adresseFaktum.properties[GATENAVN]) {
			const adresse: Adresse = transformAdresse(adresseFaktum);

			this.settAdresseOgSoknadsmottaker(adresse, Oppholdsadressevalg, adresseKategori);
		} else {
			this.settAdresseOgSoknadsmottaker(null, Oppholdsadressevalg, adresseKategori);
		}
	}

	handleVelgAutocompleteAdresse(adresse: Adresse) {
		const adresseKategori = AdresseKategori.SOKNAD;
		const oppholdsadressevalg = "soknad";
		if (adresse && adresse.adresse && adresse.adresse.length > 0) {
			this.settAdresseOgSoknadsmottaker(adresse, oppholdsadressevalg, adresseKategori);
		} else {
			this.settAdresseOgSoknadsmottaker(null, oppholdsadressevalg, adresseKategori);
		}
	}

	render() {
		const fakta = this.props.fakta;
		const folkeregistrertAdresseFaktum = finnFaktum("kontakt.system.folkeregistrert.adresse", this.props.fakta);
		const adresseFaktum = finnFaktum("kontakt.system.adresse", this.props.fakta);
		const adressesokAdresseFaktum = finnFaktum("kontakt.adresse.bruker", this.props.fakta);

		return (
			<div className="sosialhjelp-oppholdsadresse skjema-sporsmal" id="soknadsmottaker">
				<SporsmalFaktum
					id="soknadsmottaker"
					faktumKey="soknadsmottaker"
					noValidateOnBlur={true}
					validerFunc={[ (value) => {
						if (this.props.soknadsmottakerStatus !== SoknadsMottakerStatus.GYLDIG) {
							return ValideringActionKey.PAKREVD;
						}
						return null;
					} ]}
				>
					{Object.getOwnPropertyNames(folkeregistrertAdresseFaktum.properties).length !== 0 && (
						<span>
							<RadioFaktum
								id="oppholdsadresse_folkeregistrert"
								faktumKey="kontakt.system.oppholdsadresse.valg"
								value="folkeregistrert"
								deaktiverLagring={true}
								onChange={() => this.brukFolkeregistrertAdresse()}
								visSpinner={getFaktumVerdi(fakta, "kontakt.system.oppholdsadresse.valg") === "folkeregistrert"
										&& this.props.soknadsmottakere.length === 0
										&& this.props.soknadsmottakerStatus !== SoknadsMottakerStatus.UGYLDIG
										&& this.props.soknadsmottakerStatus !== SoknadsMottakerStatus.MANGLER_NAV_KONTOR}
								label={
									<div className="finnNavKontor__label">
										<FormattedMessage id="kontakt.system.oppholdsadresse.folkeregistrertAdresse"/>
										<AdresseVisning faktum={folkeregistrertAdresseFaktum}/>
									</div>
								}
							/>
							<div className="skjema-sporsmal--jaNeiSporsmal">
								<Underskjema
									visible={this.props.soknadsmottakere.length > 1 && getFaktumVerdi(fakta, "kontakt.system.oppholdsadresse.valg") === "folkeregistrert"}
									collapsable={true}
								>
									<div className="utvidetAddresseSok">
										<VelgSoknadsmottaker
											label={getIntlTextOrKey(this.props.intl, "kontakt.system.oppholdsadresse.velgKontor")}
											fakta={this.props.fakta}
										/>
									</div>
								</Underskjema>
							</div>
						</span>
					)}
					{Object.getOwnPropertyNames(adresseFaktum.properties).length !== 0
					&& (adresseFaktum.properties as AdresseProperties).kilde !== "folkeregister" && (
						<span>
							<RadioFaktum
								id="oppholdsadresse_midlertidig"
								faktumKey="kontakt.system.oppholdsadresse.valg"
								value="midlertidig"
								deaktiverLagring={true}
								onChange={() => this.brukMidlertidigAdresse()}
								visSpinner={getFaktumVerdi(fakta, "kontakt.system.oppholdsadresse.valg") === "midlertidig"
									&& this.props.soknadsmottakere.length === 0
									&& this.props.soknadsmottakerStatus !== SoknadsMottakerStatus.UGYLDIG
									&& this.props.soknadsmottakerStatus !== SoknadsMottakerStatus.MANGLER_NAV_KONTOR}
								label={
									<div>
										<FormattedMessage id="kontakt.system.oppholdsadresse.midlertidigAdresse" />
										<AdresseVisning faktum={adresseFaktum}/>
									</div>
								}
							/>
							<div className="skjema-sporsmal--jaNeiSporsmal">
								<Underskjema
									visible={this.props.soknadsmottakere.length > 1 && getFaktumVerdi(fakta, "kontakt.system.oppholdsadresse.valg") === "midlertidig"}
								>
									<div className="utvidetAddresseSok">
										<VelgSoknadsmottaker
											label={getIntlTextOrKey(this.props.intl, "kontakt.system.oppholdsadresse.velgKontor")}
											fakta={this.props.fakta}
										/>
									</div>
								</Underskjema>
							</div>
						</span>

					)}

					<span>
						<RadioFaktum
							id="oppholdsadresse_soknad"
							faktumKey="kontakt.system.oppholdsadresse.valg"
							deaktiverLagring={true}
							onChange={() => this.brukSoknadAdresse()}
							value="soknad"
						/>
					</span>
					<div className="skjema-sporsmal--jaNeiSporsmal">
						<Underskjema
							visible={getFaktumVerdi(fakta, "kontakt.system.oppholdsadresse.valg") === "soknad"}
						>
							<div className="utvidetAddresseSok">
								<SporsmalFaktum
									faktumKey="kontakt.system.kontaktinfo"
									tittelRenderer={() =>
										getIntlTextOrKey(this.props.intl,
											"kontakt.system.oppholdsadresse.hvorOppholder")
									}
									legendTittelStyle={LegendTittleStyle.FET_NORMAL}
								>
									<AdresseAutocomplete
										adresseFaktum={adressesokAdresseFaktum}
										onValgtVerdi={(adresse: any) => this.handleVelgAutocompleteAdresse(adresse)}
										fakta={this.props.fakta}
									/>

									<FinnNavKontorSpinner
										label={getIntlTextOrKey(this.props.intl, "kontakt.system.oppholdsadresse.finnerKontor")}
										fakta={this.props.fakta}
									/>

									<VelgSoknadsmottaker
										label={getIntlTextOrKey(this.props.intl, "kontakt.system.oppholdsadresse.velgKontor")}
										fakta={this.props.fakta}
									/>

								</SporsmalFaktum>
							</div>
						</Underskjema>
					</div>
				</SporsmalFaktum>
				<SoknadsmottakerInfoPanel
					soknadsmottakerStatus={this.props.soknadsmottakerStatus}
					soknadsmottakerFaktum={finnFaktum("soknadsmottaker", this.props.fakta)}
				/>
			</div>
		);
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
		soknadsmottakere: state.oppholdsadresse.soknadsmottakere

	};
})(injectIntl(Oppholdsadresse));
