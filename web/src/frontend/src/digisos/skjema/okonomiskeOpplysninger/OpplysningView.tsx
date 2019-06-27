import * as React from 'react';
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {
    Opplysning
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerTypes";
import {
    getSpcForOpplysning
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerUtils";
import TabellView from "./TabellView";
import VedleggView from "./VedleggView";
import VedleggSlettet from "./vedleggSlettet";


interface OwnProps {
    opplysning: Opplysning;
    gruppeIndex: number;
}


class OpplysningView extends React.Component<OwnProps, {}> {

    render() {

        const {opplysning, gruppeIndex} = this.props;
        const opplysningSpc = getSpcForOpplysning(opplysning.type);

        if (opplysning.slettet) {
            return (
                <VedleggSlettet opplysning={opplysning}/>
            );
        }

        return (
            <div className="skjema-progresjonsblokk__sporsmal">
                <Sporsmal sprakNokkel={opplysningSpc && opplysningSpc.textKey ? opplysningSpc.textKey : ""} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
                    <TabellView
                        opplysning={opplysning}
                        gruppeIndex={gruppeIndex}
                    />
                    <VedleggView
                        okonomiskOpplysning={opplysning}
                    />
                </Sporsmal>
            </div>
        )
    }
}

export default OpplysningView;
