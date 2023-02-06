import * as React from "react";
import Feilside from "../components/feilside/Feilside";
import {Sider} from "../../digisos/redux/navigasjon/navigasjonTypes";
import {useNavigate} from "react-router";
import {Trans, useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const IkkeFunnet: React.FC = () => {
    const {t} = useTranslation("skjema");

    const navigate = useNavigate();

    const onClick = () => {
        navigate(Sider.START);
    };

    return (
        <Feilside
            onClick={onClick}
            visKnapp={true}
            knappTekst={"Gå til startside sosialhjelp"}
            tittel={t("feilside.ikkefunnet.tittel")}
        >
            <Trans
                t={t}
                i18nKey={"feilside.ikkefunnet.feilmelding"}
                components={{lenke: <Link to={Sider.START}>{null}</Link>}}
            />
        </Feilside>
    );
};

export default IkkeFunnet;
