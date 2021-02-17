import * as React from "react";
import {TilgangSperrekode} from "../redux/soknad/soknadTypes";
import Infoblokk from "../../nav-soknad/components/infoblokk";
import {FormattedMessage, useIntl} from "react-intl";

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
                                // Disable target-blank-rule on internal urls
                                /* eslint-disable-next-line react/jsx-no-target-blank */
                                <a href="https://www.nav.no/person/personopplysninger/#ditt-nav-kontor" target="_blank">
                                    {msg}
                                </a>
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
                                // Disable target-blank-rule on internal urls
                                /* eslint-disable react/jsx-no-target-blank */
                                <a
                                    href="https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/finn-ditt-nav-kontor--353421"
                                    target="_blank"
                                >
                                    {msg}
                                </a>
                                /* eslint-enable react/jsx-no-target-blank */
                            ),
                        }}
                    />
                </p>
            </Infoblokk>
        );
    }
};

export default IkkeTilgangInformasjon;
