import * as React from "react";
import {VedleggBeriket} from "./okonomiskeOpplysningerTypes";
import Skjemapanel from "../../../nav-soknad/components/skjemapanel";

export interface OwnProps {
    key: string;
    tittel: string;
    vedleggsListe: VedleggBeriket[];
}

class Gruppe extends React.Component<OwnProps, {}>{


    beriketVedleggToReact(vedleggBeriket: VedleggBeriket){
        return (
            <div className="skjema-progresjonsblokk__sporsmal">
                <div>vedleggsboks</div>
                <div>type : {vedleggBeriket.type}</div>
                <div>gruppe : {vedleggBeriket.gruppe}</div>
                <div>vedleggStatus: {vedleggBeriket.vedleggStatus}</div>
                <div>slettet : {vedleggBeriket.slettet}</div>
                <div>radType : {vedleggBeriket.radType}</div>
            </div>
            )
    }

    renderGruppeInnhold(vedleggsListe: VedleggBeriket[]) {
        return vedleggsListe.map((vedlegg) => {
            return this.beriketVedleggToReact(vedlegg);
        });
    }

    render(){

        const { key, tittel, vedleggsListe } = this.props;

        return(
            <div className="steg-ekstrainformasjon__blokk">
                <Skjemapanel className="skjema-progresjonsblokk">
                    <div className="skjema-progresjonsblokk__head">
                        <h3>{ tittel }</h3>
                        <p>{ key }</p>
                    </div>

                    { this.renderGruppeInnhold(vedleggsListe)}

                </Skjemapanel>
            </div>
        )
    }
}

export default Gruppe;