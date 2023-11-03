import * as React from "react";
import {digisosSkjemaConfig} from "../../lib/components/SkjemaSteg/digisosSkjema";
import KredittkortIllustrasjon from "../../lib/components/svg/illustrasjoner/KredittkortIllustrasjon";
import {Boutgifter} from "./Boutgifter";
import {Barneutgifter} from "./Barneutgifter";
import {SkjemaStegLegacy} from "../../lib/components/SkjemaSteg/SkjemaStegLegacy";

export const UtgifterGjeld = () => (
    <SkjemaStegLegacy skjemaConfig={digisosSkjemaConfig} steg={"utgifterbolk"} ikon={<KredittkortIllustrasjon />}>
        <Boutgifter />
        <Barneutgifter />
    </SkjemaStegLegacy>
);
export default UtgifterGjeld;
