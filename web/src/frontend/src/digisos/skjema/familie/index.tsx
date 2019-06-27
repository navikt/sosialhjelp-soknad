import * as React from "react";
import {FaktumComponentProps} from "../../../nav-soknad/redux/fakta/faktaTypes";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import FamilieIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/FamilieIllustrasjon";
import ForsorgerPlikt from "./forsorgerplikt/ForsorgerPlikt";
import DinSivilstatus from "./sivilstatus/DinSivilstatus";

class Familie extends React.Component<FaktumComponentProps, {}> {

    render() {
        return (
            <DigisosSkjemaSteg steg={DigisosSteg.familiebolk} ikon={<FamilieIllustrasjon/>}>
                <DinSivilstatus/>
                <ForsorgerPlikt/>
            </DigisosSkjemaSteg>
        );
    }
}

export default Familie;
