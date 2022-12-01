import * as React from "react";
import {FormattedMessage} from "react-intl";

import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {Button} from "@navikt/ds-react";

interface LoggetUtProps {
    onLoginAgainClick: () => void;
}

const LoggetUt = ({onLoginAgainClick}: LoggetUtProps) => {
    return (
        <div>
            <Innholdstittel className="blokk-s timeoutbox__overskrift">
                <FormattedMessage id={"timeout.overskrift"} />
            </Innholdstittel>
            <Normaltekst className="blokk-xxs">
                <FormattedMessage id={"timeout.utlopt"} />
            </Normaltekst>
            <div className="timeoutbox__knapperad">
                <Button variant="primary" onClick={onLoginAgainClick}>
                    <FormattedMessage id={"timeout.logginn"} />
                </Button>
            </div>
        </div>
    );
};

export default LoggetUt;
