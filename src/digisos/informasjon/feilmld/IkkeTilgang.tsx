import * as React from "react";
import Infoblokk from "../../../nav-soknad/components/infoblokk";
import {FormattedMessage, useIntl} from "react-intl";
import {ContentContainer, Link} from "@navikt/ds-react";

// Vises dersom bruker har adressebeskyttelse
const IkkeTilgangInformasjon = () => {
    const intl = useIntl();
    return (
        <ContentContainer>
            <Infoblokk
                tittel={intl.formatMessage({
                    id: "informasjon.ikketilgang.bruker.tittel",
                })}
            >
                <FormattedMessage
                    id="informasjon.ikketilgang.bruker.tekst.v2"
                    values={{
                        a: (msg: string) => (
                            <Link href="https://www.nav.no/person/personopplysninger/#ditt-nav-kontor" target="_blank">
                                {msg}
                            </Link>
                        ),
                    }}
                />
            </Infoblokk>
        </ContentContainer>
    );
};

export default IkkeTilgangInformasjon;
