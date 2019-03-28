import {Row} from "nav-frontend-grid";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import * as React from "react";
import {OkonomiskOpplysning} from "../../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";

export interface RaderMedAvdragOgRenterProps {
    okonomiskOpplysning: OkonomiskOpplysning;
}

class RaderMedAvdragOgRenterView extends React.Component<RaderMedAvdragOgRenterProps, {}>{

    render(){

        const { okonomiskOpplysning } = this.props;

        return(
            <Row key={okonomiskOpplysning.type} className="opplysning__row">
                <InputEnhanced
                    onChange={() => console.warn("onchange input felt..")}
                    faktumKey={"opplysninger.arbeid.jobb.bruttolonn"}
                    verdi={"VERDI PÅ DEN RADEN"}
                    onBlur={() => console.warn("blurring...")}
                    required={false}
                />
            </Row>
        )
    }
}

export default RaderMedAvdragOgRenterView;