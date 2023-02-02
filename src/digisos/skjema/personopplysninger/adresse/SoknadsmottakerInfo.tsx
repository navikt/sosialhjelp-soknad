import * as React from "react";
import Informasjonspanel from "../../../../nav-soknad/components/Informasjonspanel";
import {FormattedMessage} from "react-intl";
import {Alert, Link} from "@navikt/ds-react";
import {NavEnhetFrontend} from "../../../../generated/model";

const SoknadsmottakerInfo = ({navEnhet}: {navEnhet?: NavEnhetFrontend}) => {
    if (!navEnhet) return null;

    const {enhetsnavn, kommunenavn, isMottakDeaktivert, isMottakMidlertidigDeaktivert} = navEnhet;

    if (isMottakMidlertidigDeaktivert) {
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

    if (isMottakDeaktivert) {
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

    return (
        <Informasjonspanel ikon={"konvolutt"} farge={"suksess"}>
            {`Søknaden vil bli sendt til: ${enhetsnavn}, ${kommunenavn} kommune.`}
        </Informasjonspanel>
    );
};

export default SoknadsmottakerInfo;
