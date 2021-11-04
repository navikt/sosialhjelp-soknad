import * as React from "react";
import {TilgangSperrekode} from "../redux/soknad/soknadTypes";
import Infoblokk from "../../nav-soknad/components/infoblokk";
import {FormattedMessage, useIntl} from "react-intl";
import {Link} from "@navikt/ds-react";

interface Props {
    sperrekode: TilgangSperrekode;
}

const IkkeTilgangInformasjon: React.FC<Props> = ({sperrekode}) => {
    const intl = useIntl();
    if (sperrekode && sperrekode === "bruker") {
        return (
            <Infoblokk
                className="blokk-s"
                tittel={intl.formatMessage({
                    id: "informasjon.ikketilgang.bruker.tittel",
                })}
            >
                <p className="blokk-s">
                    <FormattedMessage
                        id="informasjon.ikketilgang.bruker.tekst.v2"
                        values={{
                            a: (msg: string) => (
                                <Link
                                    href="https://www.nav.no/person/personopplysninger/#ditt-nav-kontor"
                                    target="_blank"
                                >
                                    {msg}
                                </Link>
                            ),
                        }}
                    />
                </p>
            </Infoblokk>
        );
    } else {
        return (
            <Infoblokk className="blokk-s" tittel={intl.formatMessage({id: "informasjon.ikketilgang.tittel"})}>
                <p className="blokk-s">
                    <FormattedMessage
                        id="informasjon.ikketilgang.tekst.v2"
                        values={{
                            a: (msg: string) => (
                                <Link
                                    href="https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/finn-ditt-nav-kontor--353421"
                                    target="_blank"
                                >
                                    {msg}
                                </Link>
                            ),
                        }}
                    />
                </p>
            </Infoblokk>
        );
    }
};

export default IkkeTilgangInformasjon;
