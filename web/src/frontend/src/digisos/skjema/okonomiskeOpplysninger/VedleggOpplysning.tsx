import * as React from "react";
import { FaktumStruktur } from "../../redux/synligefakta/synligeFaktaTypes";
import { Column, Container, Row } from "nav-frontend-grid";
import { Faktum } from "../../../nav-soknad/types/navSoknadTypes";
import {InjectedIntlProps} from "react-intl";
import Lenkeknapp from "../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import Sporsmal from "../../../nav-soknad/components/sporsmal/Sporsmal";
import InputEnhanced from "../../../nav-soknad/faktum/InputEnhanced";
import LastOppVedlegg from "../ekstrainformasjon/vedlegg/LastOppVedlegg";
import {Checkbox} from "nav-frontend-skjema";
import { FormattedHTMLMessage } from "react-intl";
import {OkonomiskOpplysning} from "../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";

interface OwnProps {
    okonomiskOpplysning: OkonomiskOpplysning;
}

type Props = OwnProps & InjectedIntlProps;


class VedleggOpplysning extends React.Component<Props, {}> {


    lagRader(faktum: Faktum, index: number, faktumstruktur: FaktumStruktur, slettTekst: string) {
        if (faktumstruktur.properties == null || faktumstruktur.properties.length === 0) {
            return null;
        }

        const inputs = faktumstruktur.properties.map(property => this.lagInputFelter("text"));

        const slettKnapp = (
            <Lenkeknapp onClick={() => this.fjernBelop()} id={faktum.key + "_fjern_lenke"}>
                {slettTekst}
            </Lenkeknapp>
        );

        return (
            <Row key={faktum.faktumId} className="opplysning__row">
                {inputs}
                {index > 0 ? slettKnapp : null}
            </Row>
        );
    }

    lagInputFelter(type: string) {
        let inputFelt = null;

        switch (type) {
            case "text":
                inputFelt = (
                    <InputEnhanced
                        onChange={() => console.warn("onChange Input enhanced")}
                        faktumKey="faktumKey"
                        verdi="Verdi"
                        onBlur={() => console.warn("Input enhanced on blur")}
                        required={false}
                    />
                );
                break;
            case "belop":
            default:
                inputFelt = (
                    <InputEnhanced
                        onChange={() => console.warn("onChange Input enhanced")}
                        faktumKey="faktumKey"
                        verdi="Verdi"
                        onBlur={() => console.warn("Input enhanced on blur")}
                        required={false}
                    />
                );
        }

        return (
            <Column md="6" xs="12" key={"Column key"}>
                {inputFelt}
            </Column>
        );
    }

    leggTilBelop(){
        console.warn("Legg til beløp...");
    }

    fjernBelop(){
        console.warn("fjern belop");
    }

    render() {
        const { okonomiskOpplysning, intl } = this.props;

        const tittel: string = intl.formatMessage({id: "opplysninger.ekstrainfo.utgifter"});
        const tekst: string = intl.formatMessage({ id: "opplysninger.ekstrainfo.utgifter" });
        const sporsmal: string = intl.formatMessage({id: "opplysninger.ekstrainfo.utgifter"});
        const leggTilTekst: string = intl.formatMessage({ id: "opplysninger.leggtil" });
        const slettTekst: string = intl.formatMessage({ id: "opplysninger.fjern" });
        console.warn(slettTekst);
        console.warn(okonomiskOpplysning);


        const leggTilKnapp = (
            <Lenkeknapp onClick={this.leggTilBelop} style="add" id="id lenkeknapp">
                {leggTilTekst}
            </Lenkeknapp>
        );

        const slettKnapp = (
            <Lenkeknapp onClick={() => this.fjernBelop()} id={"faktum_id" + "_fjern_lenke"}>
                {slettTekst}
            </Lenkeknapp>
        );

        const disabledAlleredeLastetOppCheckbox = false;
        const disableLastOppVedleggKnapp = true;

        return (
            <Sporsmal  tekster={{ sporsmal, infotekst: { tittel, tekst } }}>
                <Container fluid={false} className="container--noPadding">
                    <Row key={1} className="opplysning__row">
                        { slettKnapp }
                    </Row>
                </Container>
                { leggTilKnapp }

                <div className="">
                    <p>
                        <FormattedHTMLMessage id={"opplysninger.ekstrainfo.utgifter"}/>
                    </p>
                    <div className="vedleggsliste">
                        {".....vedleggListe"}
                    </div>

                    <LastOppVedlegg
                        id={"belop_faktum_id"}
                        belopFaktumId={1}
                        opplastingStatus={"opplastingsstaus_string"}
                        sistEndredeFaktumId={1}
                        disabled={disableLastOppVedleggKnapp}
                    />
                    <Checkbox
                        id={"belopFaktumKey" + "_allerede_lastet_opp_checkbox"}
                        className={"vedleggLastetOppCheckbox " +
                        (disabledAlleredeLastetOppCheckbox ? " checkboks--disabled" : "")}
                        label={this.props.intl.formatMessage({
                            id: "opplysninger.vedlegg.alleredelastetopp"
                        })}
                        onChange={(event) => console.warn("vedlegg allerede sent knapp onChange")}
                        checked={false}
                        disabled={false}
                    />
                </div>

            </Sporsmal>
        );
    }
}

export default VedleggOpplysning;
