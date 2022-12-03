import {Alert} from "@navikt/ds-react";
import {FormattedMessage} from "react-intl";
import * as React from "react";
import {useSelector} from "react-redux";
import {State} from "../../digisos/redux/reducers";

type NetetidPanelType = "infoside" | "ettersendelse" | "avbryt";

const NedetidPanelMessageID: Record<NetetidPanelType, string> = {
    infoside: "nedetid.alertstripe.infoside",
    ettersendelse: "nedetid.alertstripe.ettersendelse",
    avbryt: "nedetid.alertstripe.avbryt",
};

// Vis nedetid-varsel om det er satt
export const NedetidPanel = ({varselType}: {varselType: NetetidPanelType}) => {
    const {isNedetid, isPlanlagtNedetid, nedetidStartText, nedetidSluttText} =
        useSelector((state: State) => state.soknad).nedetid || {};

    const messageId = NedetidPanelMessageID[varselType];

    if (isNedetid)
        return (
            <Alert variant="error" style={{justifyContent: "center"}}>
                <FormattedMessage
                    id={messageId}
                    values={{
                        nedetidstart: nedetidStartText,
                        nedetidslutt: nedetidSluttText,
                    }}
                />
            </Alert>
        );

    if (isPlanlagtNedetid)
        return (
            <Alert variant="info" style={{justifyContent: "center"}}>
                <FormattedMessage
                    id={messageId}
                    values={{
                        nedetidstart: nedetidStartText,
                        nedetidslutt: nedetidSluttText,
                    }}
                />
            </Alert>
        );

    return null;
};
