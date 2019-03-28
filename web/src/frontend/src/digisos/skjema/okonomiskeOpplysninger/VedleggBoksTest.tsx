import * as React from "react";
import Skjemapanel from "../../../nav-soknad/components/skjemapanel";
import {OkonomiskOpplysning} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";

interface OwnProps {
    okonomiskOpplysning: OkonomiskOpplysning;
}

type Props = OwnProps

class VedleggBoksTest extends React.Component<Props, {}>{

    render(){

        const { okonomiskOpplysning } = this.props;

        const tabell = okonomiskOpplysning.rader.map((rad, idx) => {
           return (
               <div key={idx}>{`Dette er en rad: ${idx}`}</div>
           )
        });

        return(
            <Skjemapanel className="skjema-progresjonsblokk">
                <div className="skjema-progresjonsblokk__head">
                    <h3>{"tittel"}</h3>
                    <p>{"beskrivelse"}</p>
                </div>
                <div className="skjema-progresjonsblokk__sporsmal">
                    <div>vedleggsboks</div>
                    <div>{ okonomiskOpplysning.gruppe }</div>
                    <div>{ okonomiskOpplysning.type }</div>
                    <div>{ tabell }</div>
                </div>
            </Skjemapanel>
        )
    }
}

export default VedleggBoksTest