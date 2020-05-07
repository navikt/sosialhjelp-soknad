import * as React from "react";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import Penger from "../../../nav-soknad/components/svg/illustrasjoner/Penger";
import {FormattedHTMLMessage} from "react-intl";
import Bostotte from "./bostotte/Bostotte";
import Utbetalinger from "./utbetalinger";
import Verdier from "./verdier/Verdier";
import Formue from "./formue/Formue";
import NavYtelser from "./navytelser";
import SkattbarInntekt from "./skattbarInntekt";
import {SkjemaGruppe} from "nav-frontend-skjema";
import Studielan from "./studielan/Studielan";

const InntektFormue: React.FC = () => {
    return (
        <DigisosSkjemaSteg steg={DigisosSteg.inntektbolk} ikon={<Penger />}>
            <h2 className="overskrift">
                <FormattedHTMLMessage id="opplysninger.inntekt.undertittel" />
            </h2>
            <SkjemaGruppe className={"skjema-sporsmal"}>
                <SkattbarInntekt />
                <NavYtelser />
                <Bostotte />
            </SkjemaGruppe>
            <Studielan />
            <Utbetalinger />
            <h2 className="overskrift">
                <FormattedHTMLMessage id="opplysninger.formue.undertittel" />
            </h2>
            <Formue />
            <Verdier />
        </DigisosSkjemaSteg>
    );
};

export default InntektFormue;
