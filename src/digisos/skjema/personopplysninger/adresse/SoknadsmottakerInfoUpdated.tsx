import * as React from "react";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../../nav-soknad/components/svg/DigisosFarger";
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import {NavEnhet, SoknadsMottakerStatus} from "./AdresseTypes";
import {soknadsmottakerStatus} from "./AdresseUtils";
import AlertStripe from "nav-frontend-alertstriper";
import {FormattedHTMLMessage} from "react-intl";

type Props = SoknadsdataContainerProps;


class SoknadsmottakerInfo extends React.Component<Props, {}> {

    render() {
        const {soknadsdata} = this.props;
        const mottakerStatus = soknadsmottakerStatus(soknadsdata);
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
        if (mottakerStatus === SoknadsMottakerStatus.GYLDIG) {
            tekst = `Søknaden vil bli sendt til: ${enhetsnavn}, ${kommunenavn} kommune.`;
        } else if (mottakerStatus === SoknadsMottakerStatus.UGYLDIG) {
            farge = DigisosFarge.FEIL;
            tekst = "Søknaden er ikke tilgjengelig digitalt i din kommune. Ta kontakt direkte med ditt NAV-kontor.";
        } else if (mottakerStatus === SoknadsMottakerStatus.MANGLER_NAV_KONTOR) {
            farge = DigisosFarge.FEIL;
            tekst = "Kan ikke finne NAV-kontor for angitt adresse. Rett eventuelle feil i adressen eller ta direkte kontakt med ditt lokale NAV-kontor.";
        } else if (erSynlig === true) {
            erSynlig = false;
        }
        if (this.props.skjul === true) {
            erSynlig = false;
        }

        // return (
        // 	<Informasjonspanel
        // 		ikon={InformasjonspanelIkon.BREVKONVOLUTT}
        // 		farge={farge}
        // 		synlig={erSynlig}
        // 	>
        // 		{tekst}
        // 	</Informasjonspanel>
        // );


		// adresse.alertstripe.suksess=Søknaden vil bli sendt til: {navkontorNavn}, {kommuneNavn} kommune.
		const tekstSuksess = (
			<FormattedHTMLMessage
				id="adresse.alertstripe.suksess"
				values={
					{
						navkontorNavn: "NAV Frogner",
						kommuneNavn: "Frogner"
					}}
			/>
		);
        // adresse.alertstripe.advarsel={kommuneNavn} kommune kan ikke ta i mot digitale søknader ennå. Du kan <a href="FIXMEtrenger-riktig-link" target="_blank">søke på papirskjema</a>.
		// adresse.alertstripe.advarsel.fixme={kommuneNavn} kommune kan ikke ta i mot digitale søknader ennå.
        const tekstAdvarsel = (
			<FormattedHTMLMessage
				id="adresse.alertstripe.advarsel.fixme"
				values={
					{
						kommuneNavn: "Frogner"
					}}
			/>

		);
		// adresse.alertstripe.feil=Vi kan desverre ikke ta i mot digitale søknader akkuratt nå. <a href="FIXMEtrenger-riktig-link" target="_blank">Søk på papirskjema</a>, eller prøv igjen senere.
		// adresse.alertstripe.feil.fixme=Vi kan desverre ikke ta i mot digitale søknader akkuratt nå.
		const tekstFeil = (
			<FormattedHTMLMessage id="adresse.alertstripe.feil.fixme"/>
		);






		return (
            <div>
                <AlertStripe type="suksess">
					{ tekstSuksess }

                </AlertStripe>
                <br/>

                <AlertStripe type="advarsel">
					{ tekstAdvarsel }
                </AlertStripe>
                <br/>
                <AlertStripe type="feil">
					{ tekstFeil }
                </AlertStripe>
                <br/>
            </div>

        )
    }
}

export default connectSoknadsdataContainer(SoknadsmottakerInfo);
