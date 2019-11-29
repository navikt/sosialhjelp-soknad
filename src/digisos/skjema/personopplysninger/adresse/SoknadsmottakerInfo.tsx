import * as React from "react";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../../nav-soknad/components/svg/DigisosFarger";
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import {
    SoknadsMottakerStatus
} from "./AdresseTypes";
import {soknadsmottakerStatus} from "./AdresseUtils";
import AlertStripe from "nav-frontend-alertstriper";
import {FormattedHTMLMessage} from "react-intl";

type Props = SoknadsdataContainerProps;

class SoknadsmottakerInfo extends React.Component<Props, {}> {

    render() {
        const {soknadsdata} = this.props;
        const valgtNavEnhet = soknadsdata.personalia.navEnhet;
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
                        id="adresse.alertstripe.advarsel.utenurl"
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
                    <FormattedHTMLMessage
                        id="adresse.alertstripe.feil.utenurl"
                        values={
                            {
                                kommuneNavn: kommunenavn
                            }}
                    />
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
