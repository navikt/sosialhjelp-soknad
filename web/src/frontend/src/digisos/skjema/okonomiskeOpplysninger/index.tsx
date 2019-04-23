import * as React from "react";
import {connect} from "react-redux";
import {FormattedHTMLMessage, InjectedIntlProps, injectIntl} from "react-intl";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import SkjemaIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/SkjemaIllustrasjon";
import NavFrontendSpinner from "nav-frontend-spinner";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import Gruppe from "./Gruppe";
import {
    OpplysningGruppe,
    OpplysningerModel, Opplysning
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerTypes";
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import {hentOpplysninger} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerActions";
import {RestStatus} from "../../../nav-soknad/types";
import {gruppeRekkefolge} from "../../../nav-soknad/redux/okonomiskeOpplysninger/opplysningerConfig";


interface StoreToProps {
    okonomiskeOpplysninger: OpplysningerModel;
    behandlingsId: string;
}


type Props = StoreToProps & InjectedIntlProps & DispatchProps;

class OkonomiskeOpplysningerView extends React.Component<Props, {}> {


    componentDidMount() {
        const {behandlingsId} = this.props;
        this.props.dispatch(hentOpplysninger(behandlingsId))
    }

    renderGrupper() {

        const {opplysningerSortert} = this.props.okonomiskeOpplysninger;

        const grupperView = gruppeRekkefolge.map((opplysningGruppe: OpplysningGruppe) => {
            const opplysningerIGruppe: Opplysning[] = opplysningerSortert.filter((o: Opplysning) => {
                return o.gruppe === opplysningGruppe;
            });
            if (opplysningerIGruppe.length === 0) {
                return null;
            }
            return (<Gruppe key={opplysningGruppe} gruppeKey={opplysningGruppe} gruppe={opplysningerIGruppe}/>);
        });

        return grupperView;
    }

    render() {
        const {restStatus, backendData} = this.props.okonomiskeOpplysninger;

        const ikkeBesvartMeldingSkalVises = backendData && backendData.okonomiskeOpplysninger.length < 3;

        const infoMelding: JSX.Element = (
            <div className="steg-ekstrainformasjon__blokk">
                <Informasjonspanel
                    ikon={InformasjonspanelIkon.HENSYN}
                    farge={DigisosFarge.VIKTIG}
                >
                    <FormattedHTMLMessage id="opplysninger.informasjon"/>
                </Informasjonspanel>
            </div>
        );

        const ikkeBesvartMelding: JSX.Element = (
            <div className="steg-ekstrainformasjon__blokk">
                <Informasjonspanel
                    ikon={InformasjonspanelIkon.HENSYN}
                    farge={DigisosFarge.VIKTIG}
                >
                    <FormattedHTMLMessage id="opplysninger.ikkebesvart.melding"/>
                </Informasjonspanel>
            </div>
        );

        if (restStatus === RestStatus.SUCCESS) {
            return (
                <div className="steg-ekstrainformasjon">
                    <DigisosSkjemaSteg steg={DigisosSteg.opplysningerbolk} ikon={<SkjemaIllustrasjon/>}>
                        {!ikkeBesvartMeldingSkalVises && infoMelding}
                        {ikkeBesvartMeldingSkalVises && ikkeBesvartMelding}
                        {this.renderGrupper()}
                    </DigisosSkjemaSteg>
                </div>
            );
        }

        return (
            <div className="application-spinner">
                <NavFrontendSpinner type="XXL"/>
            </div>
        );
    }
}

export default connect<StoreToProps, {}, {}>(
    (state: SoknadAppState) => {
        return {
            okonomiskeOpplysninger: state.okonomiskeOpplysninger,
            behandlingsId: state.soknad.data.brukerBehandlingId,
        };
    }
)(injectIntl(OkonomiskeOpplysningerView));

