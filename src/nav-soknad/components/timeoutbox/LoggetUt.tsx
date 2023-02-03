import * as React from "react";

import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {Button} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

interface LoggetUtProps {
    onLoginAgainClick: () => void;
}

const LoggetUt = ({onLoginAgainClick}: LoggetUtProps) => {
    const {t} = useTranslation();

    return (
        <div>
            <Innholdstittel className="blokk-s timeoutbox__overskrift">{t("timeout.overskrift")}</Innholdstittel>
            <Normaltekst className="blokk-xxs">{t("timeout.utlopt")}</Normaltekst>
            <div className="timeoutbox__knapperad">
                <Button variant="primary" onClick={onLoginAgainClick}>
                    {t("timeout.logginn")}
                </Button>
            </div>
        </div>
    );
};

export default LoggetUt;
