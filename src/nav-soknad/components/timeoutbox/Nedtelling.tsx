import * as React from "react";
import {FormattedMessage} from "react-intl";

import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {Button} from "@navikt/ds-react";

interface NedtellingProps {
    onContinueClick: () => void;
    utloggingsUrl: string;
}

const Nedtelling = ({onContinueClick, utloggingsUrl}: NedtellingProps) => {
    return (
        <div>
            <Innholdstittel className="blokk-s timeoutbox__overskrift">
                <FormattedMessage id={"timeout.overskrift"} />
            </Innholdstittel>
            <Normaltekst className="blokk-xxs">
                <FormattedMessage id={"timeout.nedtelling"} />
            </Normaltekst>
            <div className="timeoutbox__knapperad">
                <Button variant="primary" onClick={onContinueClick}>
                    <FormattedMessage id={"timeout.fortsett"} />
                </Button>
                <Button variant="tertiary" as="a" href={utloggingsUrl} className="timeoutbox__loggutknapp">
                    <FormattedMessage id={"timeout.loggut"} />
                </Button>
            </div>
        </div>
    );
};

export default Nedtelling;
