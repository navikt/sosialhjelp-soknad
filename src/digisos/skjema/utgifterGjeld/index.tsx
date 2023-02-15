import * as React from "react";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import KredittkortIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/KredittkortIllustrasjon";
import Boutgifter from "./boutgifter/Boutgifter";
import Barneutgifter from "./barneutgifter/Barneutgifter";
import StegMedNavigasjon from "../../../nav-soknad/components/SkjemaSteg/LegacySkjemaSteg";

const UtgifterGjeld: React.FC = () => {
    return (
        <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"utgifterbolk"} ikon={<KredittkortIllustrasjon />}>
            <Boutgifter />
            <Barneutgifter />
        </StegMedNavigasjon>
    );
};

export default UtgifterGjeld;
