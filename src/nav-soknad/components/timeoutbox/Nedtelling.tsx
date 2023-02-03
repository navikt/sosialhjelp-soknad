import * as React from "react";

import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {Button} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

interface NedtellingProps {
    onContinueClick: () => void;
    utloggingsUrl: string;
}

const Nedtelling = ({onContinueClick, utloggingsUrl}: NedtellingProps) => {
    const {t} = useTranslation();

    return (
        <div>
            <Innholdstittel className="blokk-s timeoutbox__overskrift">{t("timeout.overskrift")}</Innholdstittel>
            <Normaltekst className="blokk-xxs">{t("timeout.nedtelling")}</Normaltekst>
            <div className="timeoutbox__knapperad">
                <Button variant="primary" onClick={onContinueClick}>
                    {t("timeout.fortsett")}
                </Button>
                <Button variant="tertiary" as="a" href={utloggingsUrl} className="timeoutbox__loggutknapp">
                    {t("timeout.loggut")}
                </Button>
            </div>
        </div>
    );
};

export default Nedtelling;
