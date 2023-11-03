import * as React from "react";
import {digisosSkjemaConfig} from "../../lib/components/SkjemaSteg/digisosSkjema";
import {FamilieIllustrasjon} from "../../lib/components/svg/illustrasjoner/FamilieIllustrasjon";
import {ForsorgerPlikt} from "./ForsorgerPlikt";
import {DinSivilstatus} from "./DinSivilstatus";
import {SkjemaStegLegacy} from "../../lib/components/SkjemaSteg/SkjemaStegLegacy";

export const Familie = () => (
    <SkjemaStegLegacy skjemaConfig={digisosSkjemaConfig} steg={"familiebolk"} ikon={<FamilieIllustrasjon />}>
        <div className={"space-y-20"}>
            <DinSivilstatus />
            <ForsorgerPlikt />
        </div>
    </SkjemaStegLegacy>
);
export default Familie;
