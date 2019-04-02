import * as React from 'react';
import {
    InputType,
    Opplysning,
    RadType,
    OpplysningRad
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import {StoreToProps} from "./index";
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import {connect} from "react-redux";
import {
    getTextKeyForType,
    getTomVedleggRad
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerUtils";
import {Column, Row} from "nav-frontend-grid";
import InputEnhanced from "../../../nav-soknad/faktum/InputEnhanced";
import {
    lagreOpplysning,
    updateOpplysning
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/OkonomiskeOpplysningerActions";
import Lenkeknapp from "../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import InjectedIntlProps = ReactIntl.InjectedIntlProps;


interface OwnProps {
    opplysning: Opplysning;
    gruppeIndex: number;
}


type Props = OwnProps & StoreToProps & DispatchProps & InjectedIntlProps;


class OkonomiskOpplysningTabellView extends React.Component<Props, {}>{


    handleChange(input: string, radIndex: number, inputFelt: InputType){
        let value: string | number | null = null;
        switch(inputFelt){
            case InputType.BESKRIVELSE: { value = input; break;}
            case InputType.BELOP: { value = parseInt(input, 10); break;}
            case InputType.BRUTTO: { value = parseInt(input, 10); break;}
            case InputType.NETTO: { value = parseInt(input, 10); break;}
            case InputType.AVDRAG: { value = parseInt(input, 10); break;}
            case InputType.RENTER: { value = parseInt(input, 10); break;}
            default: {break;}
        }
        const { opplysning } = this.props;
        const opplysningUpdated: Opplysning = { ...opplysning };
        const raderUpdated: OpplysningRad[] = opplysning.rader.map((e) => ({...e}));
        raderUpdated[radIndex][inputFelt] = value;
        opplysningUpdated.rader = raderUpdated;
        this.props.dispatch(updateOpplysning(opplysningUpdated));
    }

    handleBlur(){
        const { behandlingsId, opplysning } = this.props;
        this.props.dispatch(lagreOpplysning(behandlingsId, opplysning));
    }

    handleLeggTilRad(){
        const { opplysning } = this.props;
        const opplysningUpdated: Opplysning = { ...opplysning };
        const raderUpdated: OpplysningRad[] = opplysning.rader.map(e => ({ ...e }));
        raderUpdated.push(getTomVedleggRad());
        opplysningUpdated.rader = raderUpdated;
        this.props.dispatch(updateOpplysning(opplysningUpdated));
    }

    handleFjernRad(index: number){
        const { behandlingsId, opplysning } = this.props;
        const opplysningUpdated: Opplysning = { ...opplysning };
        const raderUpdated: OpplysningRad[] = opplysning.rader.map(e => ({...e}));
        raderUpdated.splice(index, 1);
        opplysningUpdated.rader = raderUpdated;
        this.props.dispatch(updateOpplysning(opplysningUpdated));
        this.props.dispatch(lagreOpplysning(behandlingsId, opplysningUpdated));
    }

    render(){
        const { opplysning, gruppeIndex } = this.props;


        const innhold: JSX.Element[] = opplysning.rader.map((vedleggRad: OpplysningRad, radIndex: number) => {

            const skalViseFjerneRadKnapp = radIndex > 0;

            const skalViseBeskrivelse: boolean = opplysning.radType === RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
            const skalViseBelop: boolean =
                opplysning.radType === RadType.RAD_MED_BELOP ||
                opplysning.radType ===RadType.RADER_MED_BELOP ||
                opplysning.radType ===RadType.RADER_MED_BESKRIVELSE_OG_BELOP;
            const skalViseBruttoOgNetto: boolean = opplysning.radType === RadType.RADER_MED_BRUTTO_OG_NETTO;
            const skalViseAvdragOgRenter: boolean = opplysning.radType === RadType.RADER_MED_AVDRAG_OG_RENTER;

            return (
                <Row key={radIndex} className="opplysning__row">
                    {
                        skalViseBeskrivelse &&
                        <Column xs={"12"} md={"6"}>
                            <InputEnhanced
                                id="beskrivelse"
                                onChange={(input) => this.handleChange(input, radIndex, InputType.BESKRIVELSE)}
                                onBlur={() => this.handleBlur()}
                                verdi={vedleggRad.beskrivelse ? vedleggRad.beskrivelse : ""}
                                required={false}
                                bredde={"S"}
                                faktumKey={getTextKeyForType(opplysning.type) + ".beskrivelse"}
                            />
                        </Column>
                    }
                    {
                        skalViseBelop &&
                        <Column xs={"12"} md={"6"}>
                            <InputEnhanced
                                id="belop"
                                onChange={(input) => this.handleChange(input, radIndex, InputType.BELOP)}
                                onBlur={() => this.handleBlur()}
                                faktumKey={getTextKeyForType(opplysning.type) + ".utbetaling"}
                                verdi={vedleggRad.belop ? vedleggRad.belop.toString() : ""}
                                required={false}
                                bredde={"S"}
                            />
                        </Column>
                    }
                    { skalViseBruttoOgNetto &&
                        <Column xs={"12"} md={"6"}>
                            <InputEnhanced
                                id="brutto"
                                onChange={(input) => this.handleChange(input, radIndex, InputType.BRUTTO)}
                                onBlur={() => this.handleBlur()}
                                faktumKey={getTextKeyForType(opplysning.type)}
                                verdi={vedleggRad.brutto? vedleggRad.brutto.toString() : ""}
                                required={false}
                                bredde={"S"}
                            />
                        </Column>
                    }
                    { skalViseBruttoOgNetto &&
                        <Column xs={"12"} md={"6"}>
                            <InputEnhanced
                                id="netto"
                                onChange={(input) => this.handleChange(input, radIndex, InputType.NETTO)}
                                onBlur={() => this.handleBlur()}
                                faktumKey={getTextKeyForType(opplysning.type)}
                                verdi={vedleggRad.netto ? vedleggRad.netto.toString() : ""}
                                required={false}
                                bredde={"S"}
                            />
                        </Column>
                    }
                    { skalViseAvdragOgRenter &&
                        <Column xs={"12"} md={"6"}>
                            <InputEnhanced
                                id="avdrag"
                                onChange={(input) => this.handleChange(input, radIndex, InputType.AVDRAG)}
                                onBlur={() => this.handleBlur()}
                                faktumKey={getTextKeyForType(opplysning.type)}
                                verdi={vedleggRad.avdrag ? vedleggRad.avdrag.toString() : ""}
                                required={false}
                                bredde={"S"}
                            />
                        </Column>
                    }
                    { skalViseAvdragOgRenter &&
                        <Column xs={"12"} md={"6"}>
                            <InputEnhanced
                                id="renter"
                                onChange={(input) => this.handleChange(input, radIndex, InputType.RENTER)}
                                onBlur={() => this.handleBlur()}
                                faktumKey={getTextKeyForType(opplysning.type)}
                                verdi={vedleggRad.renter ? vedleggRad.renter.toString() : ""}
                                required={false}
                                bredde={"S"}
                            />
                        </Column>
                    }

                    <Column xs={"12"} md={"6"}>
                        { skalViseFjerneRadKnapp &&
                            <Lenkeknapp onClick={() => this.handleFjernRad(radIndex)} id={radIndex + "_fjern_lenke"}>
                                Fjern
                            </Lenkeknapp>
                        }
                    </Column>
                </Row>
                )
        });

        return(
            <div className="container--noPadding container-fluid">
                { innhold }
                {
                    opplysning.radType !== RadType.NOTHING &&
                    opplysning.radType !== RadType.RAD_MED_BELOP &&
                    <Lenkeknapp onClick={() => this.handleLeggTilRad()} style="add" id={ gruppeIndex + "_link"}>
                        Legg til
                    </Lenkeknapp>
                }
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
)(OkonomiskOpplysningTabellView);
