import * as React from "react";
import {Fil, RadType, VedleggBeriket} from "./okonomiskeOpplysningerTypes";
import Skjemapanel from "../../../nav-soknad/components/skjemapanel";
import {Checkbox, Input} from "nav-frontend-skjema";
import OpplastetVedlegg from "./VedleggsFilNy";
import LastOppFil from "./LastOppFil";
import {FormattedHTMLMessage} from "react-intl";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import RadMedBelopView from "./skjemaer/RadMedBelopView";

export interface OwnProps {
    key: string;
    tittel: string;
    vedleggsListe: VedleggBeriket[];
}

type Props = OwnProps;

class Gruppe extends React.Component<Props, {}> {

    handleChangePaVedlegg(vedleggBeriketUpdated: VedleggBeriket) {
        console.warn(vedleggBeriketUpdated);
    }

    renderTabell(vedleggBeriket: VedleggBeriket) {
        switch (vedleggBeriket.radType) {
            case RadType.RAD_MED_BELOP : {
                return (
                    <RadMedBelopView
                        vedleggBeriket={vedleggBeriket}
                        onChange={
                            (vedleggBeriketUpdated: VedleggBeriket) => {
                                this.handleChangePaVedlegg(vedleggBeriketUpdated)
                            }
                        }
                    />
                );
            }
            case RadType.RADER_MED_BELOP : {
                return (
                    <div>
                        <Input label={"RADER MED BELOP"}/>
                    </div>
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

    renderOpplastingAvVedleggSeksjon(vedleggberiket: VedleggBeriket) {

        const vedleggListe = vedleggberiket.filer
            .map(fil => {
                return <OpplastetVedlegg key={fil.uuid} fil={fil} onSlett={() => this.slettVedlegg(fil)}/>
            });


        return (
            <div>
                {vedleggListe}
                <LastOppFil vedleggBeriket={vedleggberiket} isDisabled={false} visSpinner={true}/>
                <Checkbox
                    label={<FormattedHTMLMessage id={"opplysninger.vedlegg.alleredelastetopp"}/>}
                    id={vedleggberiket.type + "_allerede_lastet_opp_checkbox"}
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


    beriketVedleggToReact(vedleggBeriket: VedleggBeriket) {

        return (
            <div className="skjema-progresjonsblokk__sporsmal">
                <div>vedleggsboks</div>
                <div>type : {vedleggBeriket.type}</div>
                <div>gruppe : {vedleggBeriket.gruppe}</div>
                <div>vedleggStatus: {vedleggBeriket.vedleggStatus}</div>
                <div>slettet : {vedleggBeriket.slettet}</div>
                <div>radType : {vedleggBeriket.radType}</div>
                <div>------------</div>
                <Sporsmal sprakNokkel={"opplysninger.arbeid.jobb"} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
                    {this.renderTabell(vedleggBeriket)}
                    {this.renderOpplastingAvVedleggSeksjon(vedleggBeriket)}
                </Sporsmal>
            </div>
        )
    }


    renderGruppeInnhold(vedleggsListe: VedleggBeriket[]) {
        return vedleggsListe.map((vedlegg) => {
            return this.beriketVedleggToReact(vedlegg);
        });
    }

    render() {

        const {key, tittel, vedleggsListe} = this.props;

        return (
            <div className="steg-ekstrainformasjon__blokk">
                <Skjemapanel className="skjema-progresjonsblokk">
                    <div className="skjema-progresjonsblokk__head">
                        <h3>{tittel}</h3>
                        <p>{key}</p>
                    </div>

                    {this.renderGruppeInnhold(vedleggsListe)}

                </Skjemapanel>
            </div>
        )
    }
}

export default Gruppe;