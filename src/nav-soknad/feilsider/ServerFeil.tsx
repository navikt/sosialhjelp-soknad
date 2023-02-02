import * as React from "react";
import Feilside from "../components/feilside/Feilside";
import {Undertittel} from "nav-frontend-typografi";
import {getIntlTextOrKey} from "../utils";
import {Sider} from "../../digisos/redux/navigasjon/navigasjonTypes";
import {useTranslation} from "react-i18next";

const ServerFeil: React.FC = () => {
    const {t} = useTranslation("skjema");

    const onClick = () => {
        window.location.href = Sider.FINN_DITT_NAV_KONTOR;
    };

    return (
        <Feilside visKnapp={true} onClick={onClick} knappTekst={t("feilside.serverfeil.knapp")}>
            <div className="max-w-3xl mx-auto">
                <p className="blokk-m">{t("feilside.serverfeil.feilmelding")}</p>
                <Undertittel key="feilside.serverfeil.nodsituasjon.tittel">
                    {getIntlTextOrKey(t, "feilside.serverfeil.nodsituasjon.tittel")}
                </Undertittel>
                <p className="blokk-s">{t("feilside.serverfeil.nodsituasjon.tekst")}</p>
            </div>
        </Feilside>
    );
};

export default ServerFeil;
