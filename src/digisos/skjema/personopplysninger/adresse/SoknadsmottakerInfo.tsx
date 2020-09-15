import * as React from "react";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../../nav-soknad/components/svg/DigisosFarger";
import {SoknadsMottakerStatus} from "./AdresseTypes";
import {soknadsmottakerStatus} from "./AdresseUtils";
import AlertStripe from "nav-frontend-alertstriper";
import {FormattedHTMLMessage} from "react-intl";
import {useSelector} from "react-redux";
import {State} from "../../../redux/reducers";
import {finnBehandlendeKommunenavn} from "../../../data/kommuner";

const SoknadsmottakerInfo = (props: {skjul: boolean}) => {
    const soknadsdata = useSelector((state: State) => state.soknadsdata);

    const valgtNavEnhet = soknadsdata.personalia.navEnhet;
    let enhetsnavn = "";
    let kommunenavn = "";
    if (valgtNavEnhet) {
        enhetsnavn = valgtNavEnhet.enhetsnavn;
        kommunenavn = finnBehandlendeKommunenavn(valgtNavEnhet);
    }
    let erSynlig: boolean = true;
    let farge: DigisosFarge = DigisosFarge.SUKSESS;
    let tekst: string = "";

    const mottakerStatus: SoknadsMottakerStatus = soknadsmottakerStatus(soknadsdata);

    let informasjonspanel: JSX.Element | null = null;

    if (mottakerStatus === SoknadsMottakerStatus.GYLDIG) {
        // GRØNN
        tekst = `Søknaden vil bli sendt til: ${enhetsnavn}, ${kommunenavn}.`;
        informasjonspanel = (
            <Informasjonspanel ikon={InformasjonspanelIkon.BREVKONVOLUTT} farge={farge} synlig={erSynlig}>
                {tekst}
            </Informasjonspanel>
        );
    } else if (mottakerStatus === SoknadsMottakerStatus.UGYLDIG) {
        // ORANSJE
        informasjonspanel = (
            <AlertStripe type="advarsel">
                <FormattedHTMLMessage
                    id="adresse.alertstripe.advarsel"
                    values={{
                        kommuneNavn: kommunenavn,
                    }}
                />
            </AlertStripe>
        );
    } else if (mottakerStatus === SoknadsMottakerStatus.MOTTAK_ER_MIDLERTIDIG_DEAKTIVERT) {
        informasjonspanel = (
            <AlertStripe type="feil">
                <FormattedHTMLMessage
                    id="adresse.alertstripe.feil"
                    values={{
                        kommuneNavn: kommunenavn,
                    }}
                />
            </AlertStripe>
        );
    } else if (erSynlig) {
        erSynlig = false;
    }
    if (props.skjul === true) {
        erSynlig = false;
    }

    if (erSynlig) {
        return informasjonspanel;
    }
    return null;
};

export default SoknadsmottakerInfo;
