import * as React from "react";
import Skjemapanel from "../../../nav-soknad/components/skjemapanel";
import {FormattedHTMLMessage} from "react-intl";
import {connect} from "react-redux";
import {DispatchProps} from "../../redux/reduxTypes";
import {
    OpplysningerModel,
    Opplysning, OpplysningGruppe,
} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {getGruppeTittelKey} from "../../redux/okonomiskeOpplysninger/opplysningerUtils";
import OpplysningView from "./OpplysningView";
import {State} from "../../redux/reducers";

export interface OwnProps {
    key: OpplysningGruppe;
    gruppeKey: OpplysningGruppe
    gruppe: Opplysning[];
}

interface StoreToProps {
    okonomiskeOpplysninger: OpplysningerModel;
}


type Props = OwnProps & StoreToProps & DispatchProps;

class GruppeView extends React.Component<Props, {}> {

    renderGruppeInnhold(gruppe: Opplysning[]) {
        const gruppeInnhold = gruppe.map((okonomiskOpplysning: Opplysning, gruppeIndex: number) => {
            return (
                <OpplysningView
                    key={gruppeIndex}
                    opplysning={okonomiskOpplysning}
                    gruppeIndex={gruppeIndex}
                />
            )
        });
        return gruppeInnhold;
    }

    render() {
        const {gruppeKey, gruppe} = this.props;
        const gruppeTittelKey = getGruppeTittelKey(gruppeKey);
        if (gruppe && gruppe.length === 0) {
            return null;
        }

        return (
            <Skjemapanel className="skjema-progresjonsblokk">
                <div className="skjema-progresjonsblokk__head">
                    <h3><FormattedHTMLMessage id={gruppeTittelKey + ".sporsmal"}/></h3>
                </div>
                {this.renderGruppeInnhold(gruppe)}
            </Skjemapanel>
        );
    }
}

export default connect(
    (state: State) => {
        return {
            okonomiskeOpplysninger: state.okonomiskeOpplysninger,
        };
    }
)(GruppeView);

