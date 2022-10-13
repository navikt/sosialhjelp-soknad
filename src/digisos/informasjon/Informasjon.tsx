import * as React from "react";
import {useSelector} from "react-redux";
import IkkeTilgang from "./feilmld/IkkeTilgang";
import {State} from "../redux/reducers";
import {Soknadsoversikt} from "./Soknadsoversikt";
import {NedetidAlert} from "./feilmld/nedetidAlert";

const Informasjon = () => {
    if (!useSelector((state: State) => state.soknad.tilgang?.harTilgang)) return <IkkeTilgang />;

    return (
        <>
            <NedetidAlert />
            <Soknadsoversikt />
        </>
    );
};

export default Informasjon;
