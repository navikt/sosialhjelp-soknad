import * as React from "react";
import Feilside from "../components/feilside/Feilside";
import {Sider} from "../../digisos/redux/navigasjon/navigasjonTypes";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

const IkkeFunnet: React.FC = () => {
    const {t} = useTranslation("skjema");

    const navigate = useNavigate();

    const onClick = () => {
        if (navigate.length === 1) {
            navigate(Sider.FORSIDEN);
        } else {
            navigate(-1);
        }
    };

    return (
        <Feilside onClick={onClick} visKnapp={true}>
            {t("feilside.ikkefunnet.feilmelding")}
        </Feilside>
    );
};

export default IkkeFunnet;
