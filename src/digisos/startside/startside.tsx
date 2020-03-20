import "./startside.less";
import * as React from "react";
import {FormattedMessage, useIntl} from "react-intl";
import DocumentTitle from "react-document-title";
import {getIntlTextOrKey} from "../../nav-soknad/utils";
import AppBanner from "../../nav-soknad/components/appHeader/AppHeader";
import {Panel} from "nav-frontend-paneler";
import Lenkepanel from "nav-frontend-lenkepanel/lib";

export const StartSide = () => {
    const intl = useIntl();
    const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");

    return (
        <div className="informasjon-side">
            <AppBanner/>
            <DocumentTitle title={title}/>
            <div className="skjema-content informasjon-innhold">
                <Panel className="informasjon-viktig">
                    <h4 className="startside-sporsmal"><FormattedMessage id="informasjon.startside.sporsmal"/></h4>
                    <div className="startside-sideomside">
                        <Lenkepanel href="/sosialhjelp/soknad/selvstendignaringsdrivende" tittelProps="normaltekst" border={true}>
                            <h4><FormattedMessage id="informasjon.startside.naringsdrivende.sporsmal"/></h4>
                            <FormattedMessage id="informasjon.startside.naringsdrivende.info"/>
                        </Lenkepanel>
                        <Lenkepanel href="/sosialhjelp/soknad/informasjon" tittelProps="normaltekst" border={true}>
                            <h4><FormattedMessage id="informasjon.startside.klassisk.sporsmal"/></h4>
                            <FormattedMessage id="informasjon.startside.naringsdrivende.info"/>
                        </Lenkepanel>
                    </div>
                </Panel>
            </div>
        </div>
    );
};