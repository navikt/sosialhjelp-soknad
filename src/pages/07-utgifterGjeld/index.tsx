import * as React from "react";
import {digisosSkjemaConfig} from "../../lib/components/SkjemaSteg/digisosSkjema";
import LommebokIllustrasjon from "../../lib/components/svg/illustrasjoner/LommebokIllustrasjon";
import {Boutgifter} from "./Boutgifter";
import {Barneutgifter} from "./Barneutgifter";
import {SkjemaStegLegacy} from "../../lib/components/SkjemaSteg/SkjemaStegLegacy";

export const UtgifterGjeld = () => (
    <SkjemaStegLegacy skjemaConfig={digisosSkjemaConfig} steg={"utgifterbolk"} ikon={<LommebokIllustrasjon />}>
        <Boutgifter />
        <Barneutgifter />
    </SkjemaStegLegacy>
);
export default UtgifterGjeld;
