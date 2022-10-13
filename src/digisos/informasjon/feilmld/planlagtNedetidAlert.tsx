import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import {Alert} from "@navikt/ds-react";
import {FormattedMessage} from "react-intl";
import * as React from "react";

// Viser varsel om planlagt nedetid om dette er satt på backend
export const PlanlagtNedetidAlert = ({skjul}: {skjul?: boolean}) => {
    const {nedetid} = useSelector((state: State) => state.soknad);

    if (!nedetid?.isPlanlagtNedetid || skjul) return null;

    return (
        <Alert variant="info">
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
