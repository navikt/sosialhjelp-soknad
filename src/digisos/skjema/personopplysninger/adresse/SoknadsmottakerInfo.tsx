import * as React from "react";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../../nav-soknad/components/svg/DigisosFarger";
import {SoknadsMottakerStatus} from "./AdresseTypes";
import {soknadsmottakerStatus} from "./AdresseUtils";
import {FormattedMessage} from "react-intl";
import {useSelector} from "react-redux";
import {State} from "../../../redux/reducers";
import {Alert, Link} from "@navikt/ds-react";

const SoknadsmottakerInfo = (props: {skjul: boolean}) => {
    const soknadsdata = useSelector((state: State) => state.soknadsdata);

    const valgtNavEnhet = soknadsdata.personalia.navEnhet;
    const enhetsnavn = valgtNavEnhet?.enhetsnavn ?? "";
    const kommunenavn = valgtNavEnhet?.kommunenavn ?? "";

    const mottakerStatus: SoknadsMottakerStatus = soknadsmottakerStatus(soknadsdata);

    if (props.skjul) {
        return null;
    }
    if (mottakerStatus === SoknadsMottakerStatus.GYLDIG) {
        // GRØNN
        const tekst = `Søknaden vil bli sendt til: ${enhetsnavn}, ${kommunenavn} kommune.`;
        return (
            <Informasjonspanel ikon={InformasjonspanelIkon.BREVKONVOLUTT} farge={DigisosFarge.SUKSESS}>
                {tekst}
            </Informasjonspanel>
        );
    }
    if (mottakerStatus === SoknadsMottakerStatus.UGYLDIG) {
        // ORANSJE
        return (
            <Alert variant="warning">
                <FormattedMessage
                    id="adresse.alertstripe.advarsel.v2"
                    values={{
                        kommuneNavn: kommunenavn,
                        a: (msg) => (
                            <Link href="https://www.nav.no/sosialhjelp/sok-papir" target="_blank">
                                {msg}
                            </Link>
                        ),
                    }}
                />
            </Alert>
        );
    }
    if (mottakerStatus === SoknadsMottakerStatus.MOTTAK_ER_MIDLERTIDIG_DEAKTIVERT) {
        return (
            <Alert variant="error">
                <FormattedMessage
                    id="adresse.alertstripe.feil.v2"
                    values={{
                        kommuneNavn: kommunenavn,
                        a: (msg) => (
                            <Link href="https://www.nav.no/sosialhjelp/sok-papir" target="_blank">
                                {msg}
                            </Link>
                        ),
                    }}
                />
            </Alert>
        );
    }
    return null;
};

export default SoknadsmottakerInfo;
