import * as React from "react";
import Feilside from "./Feilside";
import {useNavigate} from "react-router";
import {Trans, useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const IkkeFunnet = () => {
    const {t} = useTranslation("skjema");

    const navigate = useNavigate();

    const onClick = () => {
        navigate("/informasjon");
    };

    return (
        <Feilside
            onClick={onClick}
            visKnapp={true}
            knappTekst={t("feilside.ikkefunnet.returner.knapp")}
            tittel={t("feilside.ikkefunnet.tittel")}
        >
            <Trans
                t={t}
                i18nKey={"feilside.ikkefunnet.feilmelding"}
                components={{lenke: <Link to={"/informasjon"}>{null}</Link>}}
            />
        </Feilside>
    );
};

export default IkkeFunnet;
