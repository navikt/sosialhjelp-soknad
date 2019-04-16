import * as React from "react";
import Skjemapanel from "../../../nav-soknad/components/skjemapanel";
import { FormattedHTMLMessage, injectIntl } from "react-intl";
import {connect} from "react-redux";
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import {
    OkonomiskeOpplysningerModel,
    Opplysning, OpplysningGruppe,
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import {getGruppeTittelKey} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerUtils";
import {Valideringsfeil} from "../../../nav-soknad/validering/types";
import OpplysningView from "./OpplysningView";

export interface OwnProps {
    key: OpplysningGruppe;
    gruppeKey: OpplysningGruppe;
    gruppe: Opplysning[];
}

interface StoreToProps {
    okonomiskeOpplysninger: OkonomiskeOpplysningerModel;
    behandlingsId: string;
    feil: Valideringsfeil[];
}


type Props = OwnProps & StoreToProps & DispatchProps & InjectedIntlProps;

class GruppeView extends React.Component<Props, {}> {

    renderGruppeInnhold(gruppe: Opplysning[]) {
        const gruppeInnhold = gruppe.map((okonomiskOpplysning: Opplysning, gruppeIndex: number) => {
            return (
                <OpplysningView
                    key={gruppeIndex}
                    okonomiskOpplysning={okonomiskOpplysning}
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

