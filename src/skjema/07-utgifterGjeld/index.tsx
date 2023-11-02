import * as React from "react";
import {digisosSkjemaConfig} from "../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import KredittkortIllustrasjon from "../../nav-soknad/components/svg/illustrasjoner/KredittkortIllustrasjon";
import Boutgifter from "./Boutgifter";
import Barneutgifter from "./barneutgifter/Barneutgifter";
import StegMedNavigasjon from "../../nav-soknad/components/SkjemaSteg/SkjemaStegLegacy";

export const UtgifterGjeld = () => (
    <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"utgifterbolk"} ikon={<KredittkortIllustrasjon />}>
        <Boutgifter />
        <Barneutgifter />
    </StegMedNavigasjon>
);

export default UtgifterGjeld;
