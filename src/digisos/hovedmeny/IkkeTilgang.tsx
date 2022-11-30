import * as React from "react";
import {FormattedMessage} from "react-intl";
import {Link, Panel} from "@navikt/ds-react";
import AppBanner from "../../nav-soknad/components/appHeader/AppHeader";
import {Information} from "@navikt/ds-icons";
import {Innholdstittel} from "nav-frontend-typografi";

const IkkeTilgangInformasjon = () => (
    <div>
        <AppBanner />
        <div className={"py-24 px-4"}>
            <Panel border className={"max-w-2xl mx-auto"}>
                <Innholdstittel className={"flex items-center gap-4 pb-4"}>
                    <Information />
                    <FormattedMessage id={"informasjon.ikketilgang.bruker.tittel"} />
                </Innholdstittel>

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
            </Panel>
        </div>
    </div>
);

export default IkkeTilgangInformasjon;
