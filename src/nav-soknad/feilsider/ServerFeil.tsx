import * as React from "react";
import Feilside from "../components/feilside/Feilside";
import {useIntl, FormattedMessage} from "react-intl";
import {Undertittel} from "nav-frontend-typografi";
import {getIntlTextOrKey} from "../utils";
import {Sider} from "../../digisos/redux/navigasjon/navigasjonTypes";

const ServerFeil: React.FC = () => {
    const intl = useIntl();

    const onClick = () => {
        window.location.href = Sider.FINN_DITT_NAV_KONTOR;
    };

    return (
        <Feilside visKnapp={true} onClick={onClick} knappTekst={intl.formatMessage({id: "feilside.serverfeil.knapp"})}>
            <div className="blokk-m">
                <p className="blokk-m">{intl.formatMessage({id: "feilside.serverfeil.feilmelding"})}</p>
                <Undertittel key="feilside.serverfeil.nodsituasjon.tittel">
                    {getIntlTextOrKey(intl, "feilside.serverfeil.nodsituasjon.tittel")}
                </Undertittel>
                <p className="blokk-s">
                    <FormattedMessage id="feilside.serverfeil.nodsituasjon.tekst" />
                </p>
            </div>
        </Feilside>
    );
};

export default ServerFeil;
