import * as React from "react";
import {FormattedHTMLMessage, InjectedIntlProps, injectIntl} from "react-intl";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import SkjemaIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/SkjemaIllustrasjon";
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps
} from "../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import {Soknadsdata, SoknadsSti} from "../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import NavFrontendSpinner from "nav-frontend-spinner";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import {
    GruppeEnum,
    OkonomiskeOpplysninger,
    RadType,
    VedleggBeriket,
    VedleggType
} from "./okonomiskeOpplysningerTypes";
import Gruppe from "./Gruppe";


interface StoreProps {
    soknadsdata: Soknadsdata;
}


type Props = StoreProps & SoknadsdataContainerProps  & InjectedIntlProps

class OkonomiskeOpplysningerView extends React.Component<Props, {}> {


    componentDidMount(){
        const { brukerBehandlingId } = this.props;
        this.props.hentSoknadsdata(brukerBehandlingId, SoknadsSti.OKONOMISKE_OPPLYSNINGER);
    }


    renderIkkeBesvart() {
        return (
            <Informasjonspanel
                ikon={InformasjonspanelIkon.HENSYN}
                farge={DigisosFarge.VIKTIG}
            >
                <FormattedHTMLMessage id="opplysninger.ikkebesvart.melding"/>
            </Informasjonspanel>
        );
    }

    renderInfoMelding() {
        return (
            <div>
                <Informasjonspanel
                    ikon={InformasjonspanelIkon.HENSYN}
                    farge={DigisosFarge.VIKTIG}
                >
                    <FormattedHTMLMessage id="opplysninger.informasjon"/>
                </Informasjonspanel>
            </div>
        );
    }


    // String -> RaderStruktur
    settRadType(vedleggsType: VedleggType){
        switch (vedleggsType) {
            case VedleggType.LONNSLIPP_ARBEID : {
                return RadType.RADER_MED_BRUTTO_OG_NETTO;
            }
            case VedleggType.SLUTTOPPGJOR_ARBEID : {
                return RadType.RADER_MED_BRUTTO_OG_NETTO;
            }
            case VedleggType.STUDENT_VEDTAK : {
                return RadType.RAD_MED_BELOP;
            }
            case VedleggType.BARNEBIDRAG_BETALER : {
                return RadType.RAD_MED_BELOP;
            }
            case VedleggType.BARNEBIDRAG_MOTTAR : {
                return RadType.RAD_MED_BELOP;
            }
            case VedleggType.SAMVARSAVTALE_BARN : {
                return RadType.NOTHING;
            }
            case VedleggType.HUSLEIEKONTRAKT_HUSLEIEKONTRAKT : {
                return RadType.NOTHING;
            }
            case VedleggType.HUSLEIEKONTRAKT_KOMMUNAL : {
                return RadType.NOTHING;
            }
            case VedleggType.BOSTOTTE_VEDTAK : {
                return RadType.RAD_MED_BELOP;
            }
            case VedleggType.KONTOOVERSIKT_BRUKSKONTO : {
                return RadType.RADER_MED_BELOP;
            }
            case VedleggType.KONTOOVERSIKT_BSU : {
                return RadType.RADER_MED_BELOP;
            }
            case VedleggType.KONTOOVERSIKT_SPAREKONTO : {
                return RadType.RADER_MED_BELOP;
            }
            case VedleggType.KONTOOVERSIKT_LIVSFORSIKRING : {
                return RadType.RADER_MED_BELOP;
            }
            case VedleggType.KONTOOVERSIKT_AKSJER : {
                return RadType.RADER_MED_BELOP;
            }
            case VedleggType.KONTOOVERSIKT_ANNET : {
                return RadType.RADER_MED_BELOP;
            }
            case VedleggType.DOKUMENTASJON_UTBYTTE : {
                return RadType.RADER_MED_BELOP;
            }
            case VedleggType.SALGSOPPGJOR_EIENDOM : {
                return RadType.RADER_MED_BELOP;
            }
            case VedleggType.DOKUMENTASJON_FORSIKRINGSUTBETALING : {
                return RadType.RADER_MED_BELOP;
            }
            case VedleggType.DOKUMENTASJON_ANNETINNTEKTER : {
                return RadType.RADER_MED_BELOP;
            }
            case VedleggType.FAKTURA_HUSLEIE : {
                return RadType.RAD_MED_BELOP;
            }
            case VedleggType.FAKTURA_STROM : {
                return RadType.RAD_MED_BELOP;
            }
            case VedleggType.FAKTURA_KOMMUNALEAVGIFTER : {
                return RadType.RAD_MED_BELOP;
            }
            case VedleggType.FAKTURA_OPPVARMING : {
                return RadType.RAD_MED_BELOP;
            }
            case VedleggType.NEDBETALINGSPLAN_AVDRAGLAAN : {
                return RadType.RADER_MED_AVDRAG_OG_RENTER;
            }
            case VedleggType.DOKUMENTASJON_ANNETBOUTGIFT : {
                return RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
            }
            case VedleggType.FAKTURA_FRITIDSAKTIVITET : {
                return RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
            }
            case VedleggType.FAKTURA_BARNEHAGE : {
                return RadType.RADER_MED_BELOP;
            }
            case VedleggType.FAKTURA_SFO : {
                return RadType.RADER_MED_BELOP;
            }
            case VedleggType.FAKTURA_TANNBEHANDLING : {
                return RadType.RADER_MED_BELOP;
            }
            case VedleggType.FAKTURA_ANNETBARNUTGIFT : {
                return RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
            }
            case VedleggType.SKATTEMELDING_SKATTEMELDING : {
                return RadType.NOTHING;
            }
            case VedleggType.ANNET_ANNET : {
                return RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
            }
            default : {
                return RadType.NOTHING
            }
        }
    }

    renderVedleggBolkListe(okonomiskeOpplysninger: OkonomiskeOpplysninger){

        if (okonomiskeOpplysninger){



            const beriketOO: VedleggBeriket[] = okonomiskeOpplysninger.okonomiskeOpplysninger.map((vedlegg, index, array) => {
                return {
                    "type" : vedlegg.type,
                    "gruppe" : vedlegg.gruppe,
                    "rader" : vedlegg.rader,
                    "vedleggStatus": vedlegg.vedleggStatus,
                    "filer" : vedlegg.filer,
                    "slettet" : false,
                    "radType" : this.settRadType(vedlegg.type),
                }
            });

            const beriketSlettet: VedleggBeriket[] = okonomiskeOpplysninger.slettedeVedlegg.map((vedlegg, index, array) => {
                return {
                    "type" : vedlegg.type,
                    "gruppe" : vedlegg.gruppe,
                    "rader" : vedlegg.rader,
                    "vedleggStatus": vedlegg.vedleggStatus,
                    "filer" : vedlegg.filer,
                    "slettet" : true,
                    "radType" : this.settRadType(vedlegg.type),
                }
            });

            const alleVedlegg: VedleggBeriket[] = beriketOO.concat(beriketSlettet);



            const gruppeArbeid: VedleggBeriket[] = [];
            const gruppeFamilie: VedleggBeriket[] = [];
            const gruppeBosituasjon: VedleggBeriket[] = [];
            const gruppeInntekt: VedleggBeriket[] = [];
            const gruppeUtgifter: VedleggBeriket[] = [];
            const gruppeGenerelleVedlegg: VedleggBeriket[] = [];
            const gruppeAndreUtgifter: VedleggBeriket[] = [];
            const gruppeUkjent: VedleggBeriket[] = [];


            alleVedlegg.forEach((vedlegg: VedleggBeriket) => {
                switch(vedlegg.gruppe){
                    case GruppeEnum.ARBEID:{
                        gruppeArbeid.push(vedlegg);
                        break;
                    }
                    case GruppeEnum.FAMILIE:{
                        gruppeFamilie.push(vedlegg);
                        break;
                    }
                    case GruppeEnum.BOSITUASJON:{
                        gruppeBosituasjon.push(vedlegg);
                        break;
                    }
                    case GruppeEnum.INNTEKT:{
                        gruppeInntekt.push(vedlegg);
                        break;
                    }
                    case GruppeEnum.UTGIFTER:{
                        gruppeUtgifter.push(vedlegg);
                        break;
                    }
                    case GruppeEnum.GENERELLE_VEDLEGG:{
                        gruppeGenerelleVedlegg.push(vedlegg);
                        break;
                    }
                    case GruppeEnum.ANDRE_UTGIFTER:{
                        gruppeAndreUtgifter.push(vedlegg);
                        break;
                    }
                    default: {
                        gruppeUkjent.push(vedlegg);
                        console.warn(`An unkown group!!! Log to kibana. Group: ${vedlegg.gruppe}`);
                        break;
                    }
                }
            });

            // Fra Vedlegg
            // "type": string;
            // "gruppe": GruppeEnum;
            // "rader": VedleggRad[];
            // "vedleggStatus": string;
            // "filer": Fil[]

            // Til OpplysningStruktur
            // "inOkonomiskeOpplysninger" : boolean;
            // "inSlettede" : boolean;
            // "raderType" : RaderStruktur;
            // "vedlegg" : Vedlegg | null;


            return(
                <div>
                    <Gruppe key={GruppeEnum.ARBEID} tittel={"ARBEID"} vedleggsListe={gruppeArbeid}/>
                    <Gruppe key={GruppeEnum.FAMILIE} tittel={"FAMILIE"} vedleggsListe={gruppeFamilie}/>
                    <Gruppe key={GruppeEnum.BOSITUASJON} tittel={"BOSITUASJON"} vedleggsListe={gruppeBosituasjon}/>
                    <Gruppe key={GruppeEnum.INNTEKT} tittel={"INNTEKT"} vedleggsListe={gruppeInntekt}/>
                    <Gruppe key={GruppeEnum.UTGIFTER} tittel={"UTGIFTER"} vedleggsListe={gruppeUtgifter}/>
                    <Gruppe key={GruppeEnum.GENERELLE_VEDLEGG} tittel={"GENERELLE VEDLEGG"} vedleggsListe={gruppeGenerelleVedlegg}/>
                    <Gruppe key={GruppeEnum.ANDRE_UTGIFTER} tittel={"ANDRE UTGIFTER"} vedleggsListe={gruppeAndreUtgifter}/>
                </div>
            )

        }

        return null;
    }





    render() {

        const { okonomiskeOpplysninger } = this.props.soknadsdata;


        if (!okonomiskeOpplysninger){
            return(
                <div className="application-spinner">
                    <NavFrontendSpinner type="XXL" />
                </div>
            )
        }

        return (
            <div className="steg-ekstrainformasjon">
                <DigisosSkjemaSteg steg={DigisosSteg.opplysningerbolk} ikon={<SkjemaIllustrasjon/>}>
                    <div className="steg-ekstrainformasjon__blokk">
                        { this.renderInfoMelding() }
                    </div>
                    <div>
                        <FormattedHTMLMessage id={"inntekt.bankinnskudd.true.type.annet"}/>
                        My life, for Aiur.
                    </div>
                    <div className="steg-ekstrainformasjon__blokk">
                        { this.renderIkkeBesvart() }
                    </div>
                    <div className="steg-ekstrainformasjon__blokk">
                        { this.renderVedleggBolkListe(okonomiskeOpplysninger)}
                    </div>
                </DigisosSkjemaSteg>
            </div>
        );
    }
}

export default connectSoknadsdataContainer(injectIntl(OkonomiskeOpplysningerView));
