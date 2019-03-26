import {Row} from "nav-frontend-grid";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import * as React from "react";
import {
    VedleggBeriket,
    VedleggRad
} from "../okonomiskeOpplysningerTypes";

export interface Props {
    vedleggBeriket: VedleggBeriket;
}

class RaderMedBeskrivelseOgBelopView extends React.Component<Props, {}>{

    onBlur(){
        console.warn("onBlur");
    }

    onChange(){
        console.warn("on change");
    }

    render(){

        const { vedleggBeriket } = this.props;
        const rader = vedleggBeriket.rader;

        return(
            <div>
                { rader.map((rad: VedleggRad, index: number) => {
                    return(
                        <Row key={`${vedleggBeriket.type}_${index}`} className="opplysning__row">
                            <InputEnhanced
                                onChange={() => this.onChange()}
                                onBlur={() => this.onBlur()}
                                faktumKey={"opplysninger.arbeid.jobb.bruttolonn"}
                                verdi={"VERDI PÅ DEN RADEN"}
                                required={false}
                            />
                        </Row>
                        )
                })}
            </div>
        )
    }
}

export default RaderMedBeskrivelseOgBelopView;