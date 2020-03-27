import * as React from "react";
import {useIntl} from "react-intl";
import Sporsmal, {
    LegendTittleStyle,
} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {Opplysning} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {getSpcForOpplysning} from "../../redux/okonomiskeOpplysninger/opplysningerUtils";
import TabellView from "./TabellView";
import VedleggView from "./VedleggView";
import VedleggSlettet from "./vedleggSlettet";
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import {Valideringsfeil} from "../../redux/validering/valideringActionTypes";

const OpplysningView = (props: {
    opplysning: Opplysning;
    gruppeIndex: number;
}) => {
    const {opplysning, gruppeIndex} = props;
    const opplysningSpc = getSpcForOpplysning(opplysning.type);

    const intl = useIntl();
    const feilListe = useSelector((state: State) => state.validering.feil);
    const feil = feilListe.find((feil:Valideringsfeil) => feil.faktumKey === opplysning.type);
    const sporsmalsFeil = feil ? {tittel:opplysning.type, feilmelding: intl.formatHTMLMessage({id: feil.feilkode})} : undefined;

    if (opplysning.slettet) {
        return <VedleggSlettet opplysning={opplysning} />;
    }

    return (
        <div className="skjema-progresjonsblokk__sporsmal">
            <Sporsmal
                sprakNokkel={
                    opplysningSpc && opplysningSpc.textKey
                        ? opplysningSpc.textKey
                        : ""
                }
                feil={sporsmalsFeil}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <TabellView opplysning={opplysning} gruppeIndex={gruppeIndex} />
                <VedleggView okonomiskOpplysning={opplysning} />
            </Sporsmal>
        </div>
    );
};

export default OpplysningView;
