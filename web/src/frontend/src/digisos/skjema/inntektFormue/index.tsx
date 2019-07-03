import * as React from "react";
import {FaktumComponentProps} from "../../../nav-soknad/redux/fakta/faktaTypes";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import {DispatchProps} from "../../../nav-soknad/redux/reduxTypes";
import Penger from "../../../nav-soknad/components/svg/illustrasjoner/Penger";
import {FormattedHTMLMessage} from "react-intl";
import Bostotte from "./bostotte/Bostotte";
import Utbetalinger from "./Utbetalinger/Utbetalinger";
import Verdier from "./verdier/Verdier";
import Formue from "./formue/Formue";
import NavYtelser from "./navytelser/NavYtelser";
import SkattbarInntekt from "./SkattbarInntekt";

class InntektFormue extends React.Component<FaktumComponentProps & DispatchProps, any> {
    render() {
        return (
            <DigisosSkjemaSteg steg={DigisosSteg.inntektbolk} ikon={<Penger/>}>
                <h2 className="overskrift">
                    <FormattedHTMLMessage id="opplysninger.inntekt.undertittel"/>
                </h2>
                <SkattbarInntekt/>
                <NavYtelser/>
                <Bostotte/>
                <Utbetalinger/>
                <h2 className="overskrift">
                    <FormattedHTMLMessage id="opplysninger.formue.undertittel"/>
                </h2>
                <Formue/>
                <Verdier/>
            </DigisosSkjemaSteg>
        );
    }
}

export default InntektFormue;
