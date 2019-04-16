import * as React from 'react';
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {
    Opplysning
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import {getKeyForOpplysningType} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerUtils";
import TabellView from "./TabellView";
import VedleggView from "./VedleggView";


interface OwnProps {
    okonomiskOpplysning: Opplysning;
    gruppeIndex: number;
}

type Props = OwnProps;


class OpplysningView extends React.Component<Props, {}>{

    render(){

        const { okonomiskOpplysning, gruppeIndex } = this.props;

        // TODO: FULLFØR VIEWET
        if (okonomiskOpplysning.slettet){
            return (
                <div>
                    <div>Vedlegg slettet</div>
                    <div>{ okonomiskOpplysning.type }</div>
                </div>
            )
        }

        return(
            <div className="skjema-progresjonsblokk__sporsmal">
                <Sporsmal sprakNokkel={getKeyForOpplysningType(okonomiskOpplysning.type)} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
                    <TabellView
                        opplysning={okonomiskOpplysning}
                        gruppeIndex={gruppeIndex}
                    />
                    <VedleggView
                        okonomiskOpplysning={okonomiskOpplysning}
                    />
                </Sporsmal>
            </div>
        )
    }
}

export default OpplysningView;
