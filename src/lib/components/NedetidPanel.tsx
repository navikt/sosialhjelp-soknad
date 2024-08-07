import {Alert} from "@navikt/ds-react";
import * as React from "react";
import {useTranslation} from "react-i18next";

// Vis nedetid-varsel om det er satt
export const NedetidPanel = async ({varselType}: {varselType: "infoside" | "avbryt"}) => {
    const {data: nedetid} = await hentNedetidInformasjon();
    const {t} = useTranslation();

    if (!nedetid) return null;

    const {isNedetid, isPlanlagtNedetid, nedetidStartText, nedetidSluttText} = nedetid;

    const messageId = varselType === "infoside" ? "nedetid.alertstripe.infoside" : "nedetid.alertstripe.avbryt";

    if (isNedetid)
        return (
            <Alert variant="error" className={"justify-center"}>
                {t(messageId, "", {
                    nedetidstart: nedetidStartText,
                    nedetidslutt: nedetidSluttText,
                })}
            </Alert>
        );

    if (isPlanlagtNedetid)
        return (
            <Alert variant="info" className={"justify-center"}>
                {t(messageId, "", {
                    nedetidstart: nedetidStartText,
                    nedetidslutt: nedetidSluttText,
                })}
            </Alert>
        );

    return null;
};
