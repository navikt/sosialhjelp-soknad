import * as React from "react";
import {ExpansionCard} from "@navikt/ds-react";

/**
 * react-ds puts a border around expansion cards by default,
 * but we're slightly abusing ExpansionCard so we unset it like this.
 * In v8, the border-color is controlled via the className prop using the zero-specificity CSS layer.
 */
export const EXPANSION_CARD_BORDER_STYLE_HACK = {
    borderColor: "transparent",
} as React.CSSProperties;

export const HovedmenyCardHeader = ({children, icon}: {children: React.ReactNode; icon: React.ReactNode}) => (
    <ExpansionCard.Header className={"[&>button]:my-auto"}>
        <div className={"flex items-center h-full"} role={"none"}>
            <HovedmenyCardIcon>{icon}</HovedmenyCardIcon>
            <div role={"none"}>{children}</div>
        </div>
    </ExpansionCard.Header>
);

const HovedmenyCardIcon = ({children}: {children: React.ReactNode}) => (
    <div
        className={"rounded-full bg-green-500/40 w-11 h-11 justify-center items-center tw-hidden lg:flex mr-6"}
        aria-hidden="true"
    >
        {children}
    </div>
);
