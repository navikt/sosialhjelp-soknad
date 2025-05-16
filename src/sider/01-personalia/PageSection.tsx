import * as React from "react";
import {Heading} from "@navikt/ds-react";

export const PageSection = ({children, heading}: {children: React.ReactNode; heading: string}) => {
    return (
        <section className={"space-y-2"}>
            <Heading size={"small"} level={"3"}>
                {heading}
            </Heading>
            {children}
        </section>
    );
};
