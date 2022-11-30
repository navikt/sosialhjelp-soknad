import {Alert} from "@navikt/ds-react";
import {FormattedMessage} from "react-intl";
import * as React from "react";
import {useSelector} from "react-redux";
import {State} from "../../digisos/redux/reducers";

// Vis nedetid-varsel om det er satt
export const NedetidPanel = () => {
    const {nedetid} = useSelector((state: State) => state.soknad);

    if (!nedetid?.isNedetid) return null;

    return (
        <Alert variant="error" style={{justifyContent: "center"}}>
            <FormattedMessage
                id="nedetid.alertstripe.infoside"
                values={{
                    nedetidstart: nedetid.nedetidStart,
                    nedetidslutt: nedetid.nedetidSlutt,
                }}
            />
        </Alert>
    );
};
