import * as React from "react";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import William from "../../../nav-soknad/components/svg/illustrasjoner/William";
import Telefon from "./telefon/Telefon";
import Bankinformasjon from "./bankinfo/Bankinformasjon";
import Adresse from "./adresse/Adresse";
import BasisPersonalia from "./personalia/BasisPersonalia";

const Personopplysninger = () => {
    return (
        <DigisosSkjemaSteg steg={DigisosSteg.kontakt} ikon={<William />}>
            <BasisPersonalia />
            <Adresse />
            <Telefon />
            <Bankinformasjon />
        </DigisosSkjemaSteg>
    );
};

export default Personopplysninger;
