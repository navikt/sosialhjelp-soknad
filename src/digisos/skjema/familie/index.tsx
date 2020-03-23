import * as React from "react";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import FamilieIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/FamilieIllustrasjon";
import ForsorgerPlikt from "./forsorgerplikt/ForsorgerPlikt";
import DinSivilstatus from "./sivilstatus/DinSivilstatus";

const Familie = () => (
    <DigisosSkjemaSteg
        steg={DigisosSteg.familiebolk}
        ikon={<FamilieIllustrasjon />}
        selvstendigNaringsdrivende={false}
    >
        <DinSivilstatus />
        <ForsorgerPlikt />
    </DigisosSkjemaSteg>
);

export default Familie;
