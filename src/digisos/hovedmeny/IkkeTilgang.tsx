import * as React from "react";
import {Link, Panel} from "@navikt/ds-react";
import AppBanner from "../../nav-soknad/components/appHeader/AppHeader";
import {Information} from "@navikt/ds-icons";
import {Innholdstittel} from "nav-frontend-typografi";
import {Trans, useTranslation} from "react-i18next";

const IkkeTilgangInformasjon = () => {
    const {t} = useTranslation();

    return (
        <div>
            <AppBanner />
            <div className={"py-24 px-4"}>
                <Panel border className={"max-w-2xl mx-auto"}>
                    <Innholdstittel className={"flex items-center gap-4 pb-4"}>
                        <Information />
                        {t("informasjon.ikketilgang.bruker.tittel")}
                    </Innholdstittel>
                    <Trans
                        t={t}
                        i18nKey={"informasjon.ikketilgang.bruker.tekst.v2"}
                        components={{
                            lenke: (
                                <Link
                                    href="https://www.nav.no/person/personopplysninger/#ditt-nav-kontor"
                                    target="_blank"
                                >
                                    {null}
                                </Link>
                            ),
                        }}
                    />
                </Panel>
            </div>
        </div>
    );
};

export default IkkeTilgangInformasjon;
