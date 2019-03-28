import * as React from "react";
import {
    VedleggRad
} from "../../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import RadMedBelopView from "./RadMedBelopView";

export interface RaderMedBelopProps {
    rader: VedleggRad[]
}

// TODO: parseStringToInt. Gi feil hvis ugyldig belop.

class RaderMedBelopView extends React.Component<RaderMedBelopProps, {}>{

    render(){

        const { rader } = this.props;

        const innhold: JSX.Element[] = rader.map((radMedBelop: VedleggRad, index: number) => {
            return(
                <div key={index} className="container--noPadding container-fluid">
                    <RadMedBelopView rowKey={"1"} belop={123} onChange={(verdi: any) => console.warn(verdi)} onBlur={() => console.warn("ajkfhb")} textKey={"askdjfb"}/>
                </div>
            )
        });

        return(
            <div>
                { innhold }
            </div>
        )
    }
}

export default RaderMedBelopView;