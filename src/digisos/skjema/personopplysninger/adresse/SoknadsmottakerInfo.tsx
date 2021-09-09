import * as React from "react";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../../nav-soknad/components/svg/DigisosFarger";
import {SoknadsMottakerStatus} from "./AdresseTypes";
import {soknadsmottakerStatus} from "./AdresseUtils";
import {FormattedMessage} from "react-intl";
import {useSelector} from "react-redux";
import {State} from "../../../redux/reducers";
import Lenke from "nav-frontend-lenker";
import {Alert} from "@navikt/ds-react";

const SoknadsmottakerInfo = (props: {skjul: boolean}) => {
    const soknadsdata = useSelector((state: State) => state.soknadsdata);

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

    if (mottakerStatus === SoknadsMottakerStatus.GYLDIG) {
        // GRØNN
        tekst = `Søknaden vil bli sendt til: ${enhetsnavn}, ${kommunenavn} kommune.`;
        informasjonspanel = (
            <Informasjonspanel ikon={InformasjonspanelIkon.BREVKONVOLUTT} farge={farge} synlig={erSynlig}>
                {tekst}
            </Informasjonspanel>
        );
    } else if (mottakerStatus === SoknadsMottakerStatus.UGYLDIG) {
        // ORANSJE
        informasjonspanel = (
            <Alert variant="warning">
                <FormattedMessage
                    id="adresse.alertstripe.advarsel.v2"
                    values={{
                        kommuneNavn: kommunenavn,
                        a: (msg: string) => (
                            <Lenke href="https://www.nav.no/sosialhjelp/sok-papir" target="_blank">
                                {msg}
                            </Lenke>
                        ),
                    }}
                />
            </Alert>
        );
    } else if (mottakerStatus === SoknadsMottakerStatus.MOTTAK_ER_MIDLERTIDIG_DEAKTIVERT) {
        informasjonspanel = (
            <Alert variant="error">
                <FormattedMessage
                    id="adresse.alertstripe.feil.v2"
                    values={{
                        kommuneNavn: kommunenavn,
                        a: (msg: string) => (
                            <Lenke href="https://www.nav.no/sosialhjelp/sok-papir" target="_blank">
                                {msg}
                            </Lenke>
                        ),
                    }}
                />
            </Alert>
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
