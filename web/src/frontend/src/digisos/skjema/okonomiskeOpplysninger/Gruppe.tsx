import * as React from "react";
import Skjemapanel from "../../../nav-soknad/components/skjemapanel";
import { FormattedHTMLMessage, injectIntl } from "react-intl";
import {connect} from "react-redux";
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import {StoreToProps} from "./index";
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import {
    Opplysning, OpplysningGruppe,
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import OkonomiskOpplysningView from "./OkonomiskOpplysningView";
import {getGruppeTittelKey} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerUtils";

export interface OwnProps {
    opplysningGruppeKey: OpplysningGruppe;
    gruppe: Opplysning[];
}


type Props = OwnProps & StoreToProps & DispatchProps & InjectedIntlProps;

class GruppeView extends React.Component<Props, {}> {

    renderGruppeInnhold(gruppe: Opplysning[]) {
        return gruppe.map((okonomiskOpplysning: Opplysning, gruppeIndex: number) => {
            return (
                <OkonomiskOpplysningView
                    key={gruppeIndex}
                    okonomiskOpplysning={okonomiskOpplysning}
                    gruppeIndex={gruppeIndex}
                />
            )
        });
    }

    render() {

        const {opplysningGruppeKey, gruppe} = this.props;

        const gruppeTittelKey = getGruppeTittelKey(opplysningGruppeKey);

        if (gruppe && gruppe.length === 0) {
            return null;
        }

        return (
            <Skjemapanel className="skjema-progresjonsblokk">
                <div className="skjema-progresjonsblokk__head">
                    <h3><FormattedHTMLMessage id={gruppeTittelKey + ".sporsmal"}/> </h3>
                </div>
                { this.renderGruppeInnhold(gruppe) }
            </Skjemapanel>
        )
    }
}

export default connect<StoreToProps, {}, OwnProps>(
    (state: SoknadAppState) => {
        return {
            okonomiskeOpplysninger: state.okonomiskeOpplysninger,
            behandlingsId: state.soknad.data.brukerBehandlingId,
            feil: state.validering.feil
        };
    }
)(injectIntl(GruppeView));

