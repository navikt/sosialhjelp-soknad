import * as React from "react";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../../nav-soknad/components/svg/DigisosFarger";
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import {
	AdresseKategori,
	Adresser,
	NavEnhet,
	SoknadsMottakerStatus
} from "./AdresseTypes";
import {soknadsmottakerStatus} from "./AdresseUtils";
import AlertStripe from "nav-frontend-alertstriper";
import {FormattedHTMLMessage} from "react-intl";
import {KommuneNummerOgDescription} from "../../../redux/kommuner/kommunerStatusTypes";

// adresse.alertstripe.advarsel={kommuneNavn} kommune kan ikke ta i mot digitale søknader ennå. Du kan <a href="FIXMEtrenger-riktig-link" target="_blank">søke på papirskjema</a>.
// adresse.alertstripe.advarsel.fixme={kommuneNavn} kommune kan ikke ta i mot digitale søknader ennå.
const tekstAdvarsel = (kommuneNavn: string): JSX.Element => (
	<FormattedHTMLMessage
		id="adresse.alertstripe.advarsel.fixme"
		values={
			{
				kommuneNavn: kommuneNavn
			}}
	/>

);
// adresse.alertstripe.feil=Vi kan desverre ikke ta i mot digitale søknader akkuratt nå. <a href="FIXMEtrenger-riktig-link" target="_blank">Søk på papirskjema</a>, eller prøv igjen senere.
// adresse.alertstripe.feil.fixme=Vi kan desverre ikke ta i mot digitale søknader akkuratt nå.
const tekstFeil = (
	<FormattedHTMLMessage id="adresse.alertstripe.feil.fixme"/>
);

const getKommuneNavnByBaseAdresse = (kommuneNummer: string, kommuneinfo: KommuneNummerOgDescription[]): string | undefined => {
	const found: KommuneNummerOgDescription | undefined = kommuneinfo.find((k: KommuneNummerOgDescription) => {
		return k.nummer === kommuneNummer;
	});
	return found ? found.navn : undefined;
};

const getKommuneNavnFraAdresseData = (adresser: Adresser, kommuneInfo: KommuneNummerOgDescription[]): string | undefined => {
	switch (adresser.valg) {
		case AdresseKategori.FOLKEREGISTRERT:{
			if (adresser.folkeregistrert.gateadresse){
				return getKommuneNavnByBaseAdresse(adresser.folkeregistrert.gateadresse.kommunenummer, kommuneInfo);
			}
			if (adresser.folkeregistrert.matrikkeladresse){
				return getKommuneNavnByBaseAdresse(adresser.folkeregistrert.matrikkeladresse.kommunenummer, kommuneInfo);
			}
			return undefined;
		}
		case AdresseKategori.MIDLERTIDIG: {
			if (adresser.midlertidig && adresser.midlertidig.gateadresse){
				return getKommuneNavnByBaseAdresse(adresser.midlertidig.gateadresse.kommunenummer, kommuneInfo);
			}
			if (adresser.midlertidig && adresser.midlertidig.matrikkeladresse){
				return getKommuneNavnByBaseAdresse(adresser.midlertidig.matrikkeladresse.kommunenummer, kommuneInfo);
			}
			return undefined;
		}
		case AdresseKategori.SOKNAD:{
			if (adresser.soknad && adresser.soknad.gateadresse){
				return getKommuneNavnByBaseAdresse(adresser.soknad.gateadresse.kommunenummer, kommuneInfo);
			}
			if (adresser.soknad && adresser.soknad.matrikkeladresse){
				return getKommuneNavnByBaseAdresse(adresser.soknad.matrikkeladresse.kommunenummer, kommuneInfo);
			}
			return undefined;
		}
		default: {
			return undefined;
		}
	}
};


type Props = SoknadsdataContainerProps;

class SoknadsmottakerInfo extends React.Component<Props, {}> {

    render() {
        const {soknadsdata} = this.props;
        const navEnheter = soknadsdata.personalia.navEnheter;
        const valgtNavEnhet = navEnheter.find((navEnhet: NavEnhet) => navEnhet.valgt);
        let enhetsnavn = "";
        let kommunenavn = "";
        if (valgtNavEnhet) {
            enhetsnavn = valgtNavEnhet.enhetsnavn;
            kommunenavn = valgtNavEnhet.kommunenavn;
        }
        let erSynlig: boolean = true;
        let farge: DigisosFarge = DigisosFarge.SUKSESS;
        let tekst: string = "";

        const kommuneNavnFraAdresseData: string | undefined = getKommuneNavnFraAdresseData(this.props.soknadsdata.personalia.adresser, this.props.kommuneInfo.kommuneNummerInformasjon);

        const mottakerStatus: SoknadsMottakerStatus = soknadsmottakerStatus(soknadsdata);

        let informasjonspanel: JSX.Element | null = null;

        if (mottakerStatus === SoknadsMottakerStatus.GYLDIG) { // GRØNN
            tekst = `Søknaden vil bli sendt til: ${enhetsnavn}, ${kommunenavn} kommune.`;
			informasjonspanel = (
				<Informasjonspanel
					ikon={InformasjonspanelIkon.BREVKONVOLUTT}
					farge={farge}
					synlig={erSynlig}
				>
					{tekst}
				</Informasjonspanel>
			);
        } else if (mottakerStatus === SoknadsMottakerStatus.UGYLDIG) { // ORANSJE
            informasjonspanel = (
				<AlertStripe type="advarsel">
					{ kommuneNavnFraAdresseData ? tekstAdvarsel(kommuneNavnFraAdresseData) : "Søknaden er ikke tilgjengelig digitalt i din kommune. Ta kontakt direkte med ditt NAV-kontor." }
				</AlertStripe>
			)
        } else if (mottakerStatus === SoknadsMottakerStatus.MOTTAK_ER_MIDLERTIDIG_DEAKTIVERT) {
			informasjonspanel = (
				<AlertStripe type="feil">
					{ tekstFeil }
				</AlertStripe>
			)
        } else if (erSynlig) {
            erSynlig = false;
        }
        if (this.props.skjul === true) {
            erSynlig = false;
        }

        if(erSynlig){
			return (
				informasjonspanel
			);
		}
        return null;
    }
}

export default connectSoknadsdataContainer(SoknadsmottakerInfo);
