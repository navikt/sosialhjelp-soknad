import {Row} from "nav-frontend-grid";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import * as React from "react";
import {VedleggBeriket} from "../okonomiskeOpplysningerTypes";

export interface RaderMedBelopProps {
    vedleggBeriket: VedleggBeriket;
}

class RaderMedBelopView extends React.Component<RaderMedBelopProps, {}>{

    render(){

        const { vedleggBeriket } = this.props;

        return(
            <Row key={vedleggBeriket.type} className="opplysning__row">
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

export default RaderMedBelopView;