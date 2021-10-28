import * as React from "react";
import Feilside from "../components/feilside/Feilside";
import {useIntl} from "react-intl";
import {Sider} from "../../digisos/redux/navigasjon/navigasjonTypes";
import {useHistory} from "react-router";

const IkkeFunnet: React.FC = () => {
    const intl = useIntl();

    const history = useHistory();

    const onClick = () => {
        if (history.length === 1) {
            window.location.href = Sider.FORSIDEN;
        } else {
            history.goBack();
        }
    };

    return (
        <Feilside onClick={onClick} visKnapp={true}>
            <p>{intl.formatMessage({id: "feilside.ikkefunnet.feilmelding"})}</p>
        </Feilside>
    );
};

export default IkkeFunnet;
