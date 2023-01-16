import * as React from "react";
import William from "../../../nav-soknad/components/svg/illustrasjoner/William";
import Telefon from "./telefon/Telefon";
import Bankinformasjon from "./bankinfo/Bankinformasjon";
import Adresse from "./adresse/Adresse";
import {SkjemaSteg} from "../../../nav-soknad/components/SkjemaSteg/SkjemaSteg";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import Sporsmal from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst} from "../../../nav-soknad/utils";
import {useIntl} from "react-intl";
import {BasisPersonaliaData} from "./personalia/BasisPersonalia";

const Personopplysninger = () => {
    const intl = useIntl();

    return (
        <SkjemaSteg skjemaConfig={digisosSkjemaConfig} steg={"kontakt"} ikon={<William />}>
            <Sporsmal tekster={getFaktumSporsmalTekst(intl, "kontakt.system.personalia")} stil={"system"}>
                <BasisPersonaliaData />
            </Sporsmal>
            <Adresse />
            <Telefon />
            <Bankinformasjon />
        </SkjemaSteg>
    );
};

export default Personopplysninger;
