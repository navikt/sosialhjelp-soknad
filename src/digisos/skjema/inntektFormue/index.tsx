import * as React from "react";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import Penger from "../../../nav-soknad/components/svg/illustrasjoner/Penger";
import {FormattedMessage} from "react-intl";
import Bostotte from "./bostotte/Bostotte";
import Utbetalinger from "./utbetalinger";
import Verdier from "./verdier/Verdier";
import Formue from "./formue/Formue";
import NavYtelser from "./navytelser";
import SkattbarInntekt from "./skattbarInntekt";
import Studielan from "./studielan/Studielan";
import StegMedNavigasjon from "../../../nav-soknad/components/SkjemaSteg/SkjemaSteg";

const InntektFormue = () => (
    <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"inntektbolk"} ikon={<Penger />}>
        <div className={"skjema-sporsmal"}>
            <SkattbarInntekt />
            <NavYtelser />
            <Bostotte />
        </div>

        <Studielan />
        <Utbetalinger />
        <h2 className="overskrift">
            <FormattedMessage id="opplysninger.formue.bank.undertittel" />
        </h2>
        <Formue />
        <h2 className="overskrift">
            <FormattedMessage id="opplysninger.formue.annen.undertittel" />
        </h2>
        <Verdier />
    </StegMedNavigasjon>
);

export default InntektFormue;
