import {Alert} from "@navikt/ds-react";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {useHentNedetidInformasjon} from "../../generated/nedetid-ressurs/nedetid-ressurs";

type NetetidPanelType = "infoside" | "avbryt";

// Vis nedetid-varsel om det er satt
export const NedetidPanel = ({varselType}: {varselType: NetetidPanelType}) => {
    const {data: nedetid} = useHentNedetidInformasjon();
    const {t} = useTranslation();

    if (!nedetid) return null;

    const {isNedetid, isPlanlagtNedetid, nedetidStartText, nedetidSluttText} = nedetid;

    const messageId = varselType === "infoside" ? "nedetid.alertstripe.infoside" : "nedetid.alertstripe.avbryt";

    if (isNedetid)
        return (
            <Alert variant="error" style={{justifyContent: "center"}}>
                {t(messageId, {
                    nedetidstart: nedetidStartText,
                    nedetidslutt: nedetidSluttText,
                })}
            </Alert>
        );

    if (isPlanlagtNedetid)
        return (
            <Alert variant="info" style={{justifyContent: "center"}}>
                {t(messageId, {
                    nedetidstart: nedetidStartText,
                    nedetidslutt: nedetidSluttText,
                })}
            </Alert>
        );

    return null;
};
