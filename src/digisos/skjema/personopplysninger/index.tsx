import * as React from "react";
import William from "../../../nav-soknad/components/svg/illustrasjoner/William";
import Telefon from "./telefon/Telefon";
import Bankinformasjon from "./bankinfo/Bankinformasjon";
import Adresse from "./adresse/Adresse";
import BasisPersonalia from "./personalia/BasisPersonalia";
import StegMedNavigasjon from "../../../nav-soknad/components/SkjemaSteg/SkjemaSteg";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";

const Personopplysninger = () => {
    return (
        <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"kontakt"} ikon={<William />}>
            <BasisPersonalia />
            <Adresse />
            <Telefon />
            <Bankinformasjon />
        </StegMedNavigasjon>
    );
};

export default Personopplysninger;
