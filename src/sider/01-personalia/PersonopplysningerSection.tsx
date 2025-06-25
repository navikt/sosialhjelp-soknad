import * as React from "react";
import {ReactNode} from "react";
import {Heading} from "@navikt/ds-react";

/**
 * En section med en <h3>-Heading.
 * Kan hende denne kan generaliseres etterhvert til andre skjemasider, men pt. brukes denne bare på side 1
 */
export const PersonopplysningerSection = ({children, heading}: {children: ReactNode; heading: ReactNode}) => {
    return (
        <section className={"space-y-2"}>
            <Heading size={"small"} level={"3"}>
                {heading}
            </Heading>
            {children}
        </section>
    );
};
