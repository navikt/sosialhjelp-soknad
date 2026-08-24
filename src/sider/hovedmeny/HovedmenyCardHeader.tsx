import * as React from "react";
import {ExpansionCard} from "@navikt/ds-react";

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
        className={"rounded-full bg-ax-bg-success-moderate w-11 h-11 justify-center items-center hidden lg:flex mr-6"}
        aria-hidden="true"
    >
        {children}
    </div>
);
