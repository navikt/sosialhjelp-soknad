import {useSelector} from "react-redux";
import {State} from "../redux/reducers";
import {Alert} from "@navikt/ds-react";
import {FormattedMessage} from "react-intl";
import * as React from "react";

// Vis nedetidsvarsel
export const NedetidAlert = ({skjul}: {skjul?: boolean}) => {
    const {nedetid} = useSelector((state: State) => state.soknad);

    if (!nedetid?.isNedetid || skjul) return null;

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
