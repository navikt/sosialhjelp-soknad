import "./startside.less";
import * as React from "react";
import {FormattedMessage, useIntl} from "react-intl";
import DocumentTitle from "react-document-title";
import {getIntlTextOrKey} from "../../nav-soknad/utils";
import AppBanner from "../../nav-soknad/components/appHeader/AppHeader";
import Lenkepanel from "nav-frontend-lenkepanel/lib";
import {Normaltekst} from "nav-frontend-typografi";

export const StartSide = () => {
    const intl = useIntl();
    const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");

    return (
        <div className="informasjon-side">
            <AppBanner/>
            <DocumentTitle title={title}/>
            <div className="skjema-content informasjon-innhold">
                    <h2 className="startside-sporsmal">
                        <FormattedMessage id="informasjon.startside.sporsmal"/>
                    </h2>
                    <div className="startside-sideomside startside-innhold">
                        <Lenkepanel href="/sosialhjelp/soknad/selvstendignaringsdrivende" tittelProps="normaltekst" border={true}>
                            <h3>
                                <FormattedMessage id="informasjon.startside.naringsdrivende.sporsmal"/>
                            </h3>

                            <Normaltekst>
                                <FormattedMessage id="informasjon.startside.naringsdrivende.info"/>
                            </Normaltekst>
                        </Lenkepanel>
                        <Lenkepanel href="/sosialhjelp/soknad/informasjon" tittelProps="normaltekst" border={true}>
                            <h3>
                                <FormattedMessage id="informasjon.startside.klassisk.sporsmal"/>
                            </h3>
                            <Normaltekst>
                                <FormattedMessage id="informasjon.startside.klassisk.info"/>
                            </Normaltekst>
                        </Lenkepanel>
                    </div>
            </div>
        </div>
    );
};
