import * as React from "react";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../../nav-soknad/components/svg/DigisosFarger";
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import {
    NavEnhet,
    SoknadsMottakerStatus
} from "./AdresseTypes";
import {soknadsmottakerStatus} from "./AdresseUtils";
import AlertStripe from "nav-frontend-alertstriper";
import {FormattedHTMLMessage} from "react-intl";

// adresse.alertstripe.advarsel={kommuneNavn} kommune kan ikke ta i mot digitale søknader ennå. Du kan <a href="FIXMEtrenger-riktig-link" target="_blank">søke på papirskjema</a>.
// adresse.alertstripe.advarsel.fixme={kommuneNavn} kommune kan ikke ta i mot digitale søknader ennå.

// adresse.alertstripe.feil=Vi kan desverre ikke ta i mot digitale søknader akkuratt nå. <a href="FIXMEtrenger-riktig-link" target="_blank">Søk på papirskjema</a>, eller prøv igjen senere.
// adresse.alertstripe.feil.fixme=Vi kan desverre ikke ta i mot digitale søknader akkuratt nå.

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
                    <FormattedHTMLMessage
                        id="adresse.alertstripe.advarsel.fixme"
                        values={
                            {
                                kommuneNavn: kommunenavn
                            }}
                    />
                </AlertStripe>
            )
        } else if (mottakerStatus === SoknadsMottakerStatus.MOTTAK_ER_MIDLERTIDIG_DEAKTIVERT) {
            informasjonspanel = (
                <AlertStripe type="feil">
                    <FormattedHTMLMessage id="adresse.alertstripe.feil.fixme"/>
                </AlertStripe>
            )
        } else if (erSynlig) {
            erSynlig = false;
        }
        if (this.props.skjul === true) {
            erSynlig = false;
        }

        if (erSynlig) {
            return (
                informasjonspanel
            );
        }
        return null;
    }
}

export default connectSoknadsdataContainer(SoknadsmottakerInfo);
