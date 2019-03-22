import * as React from "react";
import {Vedlegg} from "./okonomiskeOpplysningerTypes";
import Skjemapanel from "../../../nav-soknad/components/skjemapanel";

interface OwnProps {
    vedlegg: Vedlegg;
}

type Props = OwnProps

class VedleggBoksTest extends React.Component<Props, {}>{

    render(){

        const { vedlegg } = this.props;

        const tabell = vedlegg.rader.map((rad, idx) => {
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
                    <div>{ vedlegg.gruppe }</div>
                    <div>{ vedlegg.type }</div>
                    <div>{ tabell }</div>
                </div>
            </Skjemapanel>
        )
    }
}

export default VedleggBoksTest