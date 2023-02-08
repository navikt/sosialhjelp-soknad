import ServerFeil from "./nav-soknad/feilsider/ServerFeil";
import SideIkkeFunnet from "./nav-soknad/feilsider/SideIkkeFunnet";
import * as React from "react";
import {useSoknad} from "./digisos/redux/soknad/useSoknad";
import {ReactElement} from "react";

export const ErrorPanels = ({children}: {children: ReactElement}) => {
    const {showSideIkkeFunnet, showServerFeil} = useSoknad();

    if (showServerFeil) return <ServerFeil />;

    if (showSideIkkeFunnet) return <SideIkkeFunnet />;

    return children;
};
