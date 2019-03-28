import * as React from "react";
import Skjemapanel from "../../../nav-soknad/components/skjemapanel";
import {Checkbox, Input} from "nav-frontend-skjema";
import OpplastetVedlegg from "./VedleggsFilNy";
import LastOppFil from "./LastOppFil";
import {FormattedHTMLMessage, injectIntl} from "react-intl";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import RadMedBelopView from "./skjemaer/RadMedBelopView";
import {connect} from "react-redux";
import {DispatchProps, SoknadAppState} from "../../../nav-soknad/redux/reduxTypes";
import {StoreToProps} from "./index";
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import {
    lagreOpplysning,
    updateOpplysning
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/OkonomiskeOpplysningerActions";
import {
    Fil,
    OkonomiskOpplysning,
    RadType
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import {
    getTextKeyForType,
} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerUtils";
import RaderMedBelopView from "./skjemaer/RaderMedBelopView";

export interface OwnProps {
    key: string;
    tittel: string;
    gruppe: OkonomiskOpplysning[];
}


type Props = OwnProps & StoreToProps & DispatchProps & InjectedIntlProps;

class GruppeView extends React.Component<Props, {}> {


    renderTabell(okonomiskOpplysning: OkonomiskOpplysning) {
        switch (okonomiskOpplysning.radType) {
            case RadType.RAD_MED_BELOP : {
                return (
                    <RadMedBelopView
                        rowKey={okonomiskOpplysning.type}
                        belop={okonomiskOpplysning.rader[0].belop}
                        onChange={(belop) => {
                            okonomiskOpplysning.rader[0].belop = belop;
                            this.props.dispatch(updateOpplysning(okonomiskOpplysning))
                        }}
                        onBlur={() => this.props.dispatch(lagreOpplysning(this.props.behandlingsId, okonomiskOpplysning))}
                        textKey={getTextKeyForType(okonomiskOpplysning.type)}
                    />
                );
            }
            case RadType.RADER_MED_BELOP : {
                return (
                    <RaderMedBelopView
                        rader={okonomiskOpplysning.rader}
                    />
                );
            }
            case RadType.RADER_MED_BRUTTO_OG_NETTO : {
                return (
                    <div>
                        <Input label={"RADER MED BRUTTO OG NETTO"}/>
                    </div>
                );
            }
            case RadType.RADER_MED_AVDRAG_OG_RENTER : {
                return (
                    <div>
                        <Input label={"RADER MED AVDRAG OG RENTER"}/>
                    </div>
                );
            }
            case RadType.RADER_MED_BESKRIVELSE_OG_BELOP : {
                return (
                    <div>
                        <Input label={"RADER MED BESKRIVELSE OG BELOP"}/>
                    </div>
                );
            }
            case RadType.NOTHING : {
                return (
                    <div>
                        <Input label={"NOTHING"}/>
                    </div>
                );
            }
            default : {
                return (
                    <div>
                        <Input label={"DEFAULT"}/>
                    </div>
                );
            }
        }
    }

    renderOpplastingAvVedleggSeksjon(okonomiskOpplysning: OkonomiskOpplysning) {

        const vedleggListe = okonomiskOpplysning.filer
            .map(fil => {
                return <OpplastetVedlegg key={fil.uuid} fil={fil} onSlett={() => this.slettVedlegg(fil)}/>
            });


        return (
            <div>
                {vedleggListe}
                <LastOppFil okonomiskOpplysning={okonomiskOpplysning} isDisabled={false} visSpinner={true}/>
                <Checkbox
                    label={<FormattedHTMLMessage id={"opplysninger.vedlegg.alleredelastetopp"}/>}
                    id={okonomiskOpplysning.type + "_allerede_lastet_opp_checkbox"}
                    className={"vedleggLastetOppCheckbox " + " checkboks--disabled"}
                    onChange={(event: any) => this.handleAlleredeLastetOpp(event)}
                    checked={true}
                    disabled={false}
                />
            </div>
        )
    }

    slettVedlegg(fil: Fil) {
        console.warn("SLETTER VEDLEGG!");
    }

    handleAlleredeLastetOpp(event: any) {
        console.warn("VEDLEGG ALLEREDE SENDT");
    }


    okonomiskOpplysningToReact(okonomiskOpplysning: OkonomiskOpplysning) {

        return (
            <div className="skjema-progresjonsblokk__sporsmal">
                <Sporsmal sprakNokkel={"opplysninger.arbeid.jobb"} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
                    {this.renderTabell(okonomiskOpplysning)}
                    {this.renderOpplastingAvVedleggSeksjon(okonomiskOpplysning)}
                </Sporsmal>
            </div>
        )
    }


    renderGruppeInnhold(gruppe: OkonomiskOpplysning[]) {
        return gruppe.map((okonomiskOpplysning: OkonomiskOpplysning, index: number) => {
            return this.okonomiskOpplysningToReact(okonomiskOpplysning);
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
                {this.renderGruppeInnhold(gruppe)}
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

