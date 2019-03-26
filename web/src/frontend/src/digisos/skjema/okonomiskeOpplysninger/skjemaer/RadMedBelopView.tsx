import {Row} from "nav-frontend-grid";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import * as React from "react";
import {VedleggBeriket} from "../okonomiskeOpplysningerTypes";

export interface RadMedBelopProps {
    vedleggBeriket: VedleggBeriket;
    onChange: (vedleggBeriket: VedleggBeriket) => void;
}

class RadMedBelopView extends React.Component<RadMedBelopProps, {}>{

    // MÅ KUN VÆRE LOV MED 0-9. IKKE BOKSTAVER
    handleChange(input: string){
        console.warn(input);

        const { vedleggBeriket } = this.props;

        vedleggBeriket.rader[0].belop = parseInt(input, 0);

        this.props.onChange(vedleggBeriket);
    }

    render(){

        const { vedleggBeriket } = this.props;

        if(vedleggBeriket && vedleggBeriket.rader && vedleggBeriket.rader[0]){
            return(
                <Row key={vedleggBeriket.type} className="opplysning__row">
                    <InputEnhanced
                        onChange={(input) => this.handleChange(input)}
                        faktumKey={"opplysninger.arbeid.jobb.bruttolonn"}
                        verdi={
                            vedleggBeriket.rader[0].belop ?
                                vedleggBeriket.rader[0].belop.toString() :
                                ""
                        }
                        onBlur={() => console.warn("blurring...")}
                        required={false}
                    />
                </Row>
            )
        }

        return(
            <div>Belop er NUUUUUULLLL</div>
        )
    }
}

export default RadMedBelopView;