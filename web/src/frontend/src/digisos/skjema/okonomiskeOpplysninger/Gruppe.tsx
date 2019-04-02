import * as React from "react";
import Skjemapanel from "../../../nav-soknad/components/skjemapanel";
import { injectIntl } from "react-intl";
import {connect} from "react-redux";
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import {StoreToProps} from "./index";
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import {
    OkonomiskOpplysning,
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import OkonomiskOpplysningView from "./OkonomiskOpplysningView";

export interface OwnProps {
    key: string;
    tittel: string;
    gruppe: OkonomiskOpplysning[];
}


type Props = OwnProps & StoreToProps & DispatchProps & InjectedIntlProps;

class GruppeView extends React.Component<Props, {}> {

    renderGruppeInnhold(gruppe: OkonomiskOpplysning[]) {
        return gruppe.map((okonomiskOpplysning: OkonomiskOpplysning, gruppeIndex: number) => {
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

        const {key, tittel, gruppe} = this.props;

        if (gruppe && gruppe.length === 0) {
            return null;
        }

        return (
            <Skjemapanel className="skjema-progresjonsblokk">
                <div className="skjema-progresjonsblokk__head">
                    <h3>{tittel}</h3>
                    <p>{key}</p>
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
            behandlingsId: state.soknad.data.brukerBehandlingId
        };
    }
)(injectIntl(GruppeView));

