import * as React from "react";
import Feilside from "../components/feilside/Feilside";
import {useIntl} from "react-intl";
import {Sider} from "../../digisos/redux/navigasjon/navigasjonTypes";
import {useNavigate} from "react-router";

const IkkeFunnet: React.FC = () => {
    const intl = useIntl();

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
            {intl.formatMessage({id: "feilside.ikkefunnet.feilmelding"})}
        </Feilside>
    );
};

export default IkkeFunnet;
