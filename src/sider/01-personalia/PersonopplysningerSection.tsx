import * as React from "react";
import {ReactNode} from "react";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {Heading} from "@navikt/ds-react";

/**
 * En SkjemaStegBlock med en <h3>-Heading.
 * Kan hende denne kan generaliseres etterhvert til andre skjemasider, men pt. brukes denne bare på side 1
 */
export const PersonopplysningerSection = ({children, heading}: {children: ReactNode; heading: ReactNode}) => {
    return (
        <SkjemaStegBlock className={"lg:space-y-8 mb-0! pb-0! rounded-b-none"}>
            <Heading size={"small"} level={"3"}>
                {heading}
            </Heading>
            {children}
        </SkjemaStegBlock>
    );
};
