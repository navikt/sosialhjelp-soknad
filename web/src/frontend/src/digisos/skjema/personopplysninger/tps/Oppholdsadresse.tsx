import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Faktum } from "../../../../nav-soknad/types";
import RadioFaktum from "../../../../nav-soknad/faktum/RadioFaktum";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import SporsmalFaktum from "../../../../nav-soknad/faktum/SporsmalFaktum";
import {
	getFaktumVerdi
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

interface Props {
	fakta: Faktum[];
}

interface AdresseProperties {
	kilde?: string;
	gaardsnummer?: string;
	postnummer?: string;
	poststed?: string;
}

const Oppholdsadresse: React.StatelessComponent<Props & InjectedIntlProps> = ({
	fakta,
	intl
}) => {
	const folkeregistrertAdresseFaktum = finnFaktum("kontakt.system.folkeregistrert.adresse", fakta);
	const adresseFaktum = finnFaktum("kontakt.system.adresse", fakta);

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

	/* <DetaljelisteElement {...getProperty(faktum, "adresse")} /> */
	const visAdresse = (faktum: Faktum) => {
		const adresseProperties = faktum.properties as AdresseProperties;
		return <Detaljeliste>
				{getPropertyWithoutName(faktum, "adresse")}
				{adresseProperties.postnummer != null && adresseProperties.poststed != null &&
					<li className="detaljeliste__element">{adresseProperties.postnummer} {adresseProperties.poststed}</li>
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

	const NavKontorInformasjon = (props: {children: any, style?: string}) => {
		const faktum = finnFaktum("kontakt.system.oppholdsadresse.valg", fakta);
		if (faktum.value == null) {
			return null;
		}
		if (faktum.value === "soknad") {
			return null;
		}

		const ikon = (props.style === "feil") ? "konvolutt-feil.svg" : "konvolutt.svg";
		return (
			<Informasjonspanel style={props.style} icon={(<img src={"/soknadsosialhjelp/statisk/bilder/" + ikon} />)}>
				{props.children}
			</Informasjonspanel>
		);
	};

	return (<div>
		<SporsmalFaktum faktumKey="kontakt.system.oppholdsadresse" style="system">
			<SporsmalFaktum faktumKey="kontakt.system.oppholdsadresse.valg"
				validerFunc={[(value) => {
					if (value == null) {
						return ValideringActionKey.PAKREVD;
					}
					return null;
				}]}
			>
				{Object.getOwnPropertyNames(folkeregistrertAdresseFaktum.properties).length !== 0 &&
					<RadioFaktum id="oppholdsadresse_folkeregistrert"
						faktumKey="kontakt.system.oppholdsadresse.valg"
						value="folkeregistrert"
						label={
							<div>
								<div className="detaljeliste__element" style={{fontWeight: 600}}>Folkeregistrert adresse:</div>
								{visAdresse(folkeregistrertAdresseFaktum)}
							</div>
						}
					/>
				}
				{Object.getOwnPropertyNames(adresseFaktum.properties).length !== 0
					&& (adresseFaktum.properties as AdresseProperties).kilde !== "folkeregister" &&
					<RadioFaktum id="oppholdsadresse_midlertidig"
						faktumKey="kontakt.system.oppholdsadresse.valg"
						value="midlertidig"
						label={
							<div>
								<div style={{fontWeight: 600}}>Midlertidig adresse:</div>
								{visAdresse(adresseFaktum)}
							</div>
						}
					/>
				}
				<RadioFaktum id="oppholdsadresse_soknad" faktumKey="kontakt.system.oppholdsadresse.valg" value="soknad" />
				<Underskjema
					visible={getFaktumVerdi(fakta, "kontakt.system.oppholdsadresse.valg") === "soknad"}
				>
					<SporsmalFaktum faktumKey="kontakt.system.oppholdsadresse.soknad">
						<NavAutocomplete/>
					</SporsmalFaktum>
				</Underskjema>
			</SporsmalFaktum>
		</SporsmalFaktum>
		<NavKontorInformasjon style="feil">TODO: Søknaden sendes til Oslo kommune</NavKontorInformasjon>
	</div>);
};

export default connect((state: State, props: any) => {
	return {
		adresseliste: state.soknad.restStatus,
		startSoknadPending: state.soknad.startSoknadPending,
		faktaRestStatus: state.fakta.restStatus,
		navEnheter: state.kommuner.data,
		kommunerRestStatus: state.kommuner.restStatus
	};
})(injectIntl(Oppholdsadresse));

// export default injectIntl(Oppholdsadresse);
