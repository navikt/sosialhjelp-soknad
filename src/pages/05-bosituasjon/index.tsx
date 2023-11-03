import * as React from "react";
import BoligIllustrasjon from "../../lib/components/svg/illustrasjoner/BoligIllustrasjon";
import {digisosSkjemaConfig} from "../../lib/components/SkjemaSteg/digisosSkjema";
import {AntallPersoner} from "./AntallPersoner";
import {Botype} from "./Botype";
import {SkjemaStegLegacy} from "../../lib/components/SkjemaSteg/SkjemaStegLegacy";

export const Bosituasjon = () => (
    <SkjemaStegLegacy skjemaConfig={digisosSkjemaConfig} steg={"bosituasjonbolk"} ikon={<BoligIllustrasjon />}>
        <div className={"space-y-20"}>
            <Botype />
            <AntallPersoner />
        </div>
    </SkjemaStegLegacy>
);
export default Bosituasjon;
