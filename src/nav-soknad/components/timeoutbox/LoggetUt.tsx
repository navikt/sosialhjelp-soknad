import * as React from "react";
import {FormattedMessage} from "react-intl";

import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {Button} from "@navikt/ds-react";

interface Props {
    onLoginAgainClick: () => void;
}

const LoggetUt: React.StatelessComponent<Props> = (props) => {
    return (
        <div>
            <Innholdstittel className="blokk-s timeoutbox__overskrift">
                <FormattedMessage id={"timeout.overskrift"} />
            </Innholdstittel>
            <Normaltekst className="blokk-xxs">
                <FormattedMessage id={"timeout.utlopt"} />
            </Normaltekst>
            <div className="timeoutbox__knapperad">
                <Button variant="primary" onClick={props.onLoginAgainClick}>
                    <FormattedMessage id={"timeout.logginn"} />
                </Button>
            </div>
        </div>
    );
};

export default LoggetUt;
