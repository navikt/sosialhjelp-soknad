import * as React from "react";
import {connect} from "react-redux";
import {FaktumComponentProps} from "../../../nav-soknad/redux/fakta/faktaTypes";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import {State} from "../../redux/reducers";
import {DispatchProps} from "../../../nav-soknad/redux/reduxTypes";
import Penger from "../../../nav-soknad/components/svg/illustrasjoner/Penger";
import {FormattedHTMLMessage} from "react-intl";
import Bostotte from "./bostotte/Bostotte";
import Utbetalinger from "./Utbetalinger/Utbetalinger";
import Verdier from "./verdier/Verdier";
import Formue from "./formue/Formue";
import NavYtelserNy from "./navytelser/NavYtelser";

class InntektFormue extends React.Component<FaktumComponentProps & DispatchProps, any> {
    render() {
        return (
            <DigisosSkjemaSteg steg={DigisosSteg.inntektbolk} ikon={<Penger/>}>
                <h2 className="overskrift">
                    <FormattedHTMLMessage id="opplysninger.inntekt.undertittel"/>
                </h2>
                <NavYtelserNy/>
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

export default connect((state: State, props: any) => {
    return {
        fakta: state.fakta.data
    };
})(InntektFormue);
