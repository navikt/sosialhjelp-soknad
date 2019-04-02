import * as React from 'react';
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {Opplysning} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import {connect} from "react-redux";
import {StoreToProps} from "./index";
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import OkonomiskOpplysningTabellView from "./OkonomiskOpplysningTabellView";
import OkonomiskOpplysningVedleggView from "./OkonomiskOpplysningVedleggView";
import {getTextKeyForType} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerUtils";


interface OwnProps {
    okonomiskOpplysning: Opplysning;
    gruppeIndex: number;
}


type Props = OwnProps & StoreToProps & DispatchProps & InjectedIntlProps;


class OkonomiskOpplysningView extends React.Component<Props, {}>{

    render(){

        const { okonomiskOpplysning, gruppeIndex } = this.props;

        return(
            <div className="skjema-progresjonsblokk__sporsmal">
                <Sporsmal sprakNokkel={getTextKeyForType(okonomiskOpplysning.type)} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
                    <OkonomiskOpplysningTabellView
                        gruppeIndex={gruppeIndex}
                        opplysning={okonomiskOpplysning}
                    />
                    <OkonomiskOpplysningVedleggView
                        okonomiskOpplysning={okonomiskOpplysning}
                        gruppeIndex={gruppeIndex}
                    />
                </Sporsmal>
            </div>
        )
    }
}

export default connect<StoreToProps, {}, OwnProps>(
    (state: SoknadAppState) => {
        return {
            okonomiskeOpplysninger: state.okonomiskeOpplysninger,
            behandlingsId: state.soknad.data.brukerBehandlingId
        };
    }
)(OkonomiskOpplysningView);
