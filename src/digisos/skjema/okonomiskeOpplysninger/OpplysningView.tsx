import * as React from "react";
import {useIntl} from "react-intl";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {Opplysning} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {getSpcForOpplysning} from "../../redux/okonomiskeOpplysninger/opplysningerUtils";
import TabellView from "./TabellView";
import VedleggView from "./VedleggView";
import VedleggSlettet from "./vedleggSlettet";
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import {Valideringsfeil} from "../../redux/validering/valideringActionTypes";
import styled from "styled-components";

const OkonomiskeOpplysningerSporsmal = styled.div`
    margin-bottom: 2px;
    background-color: var(--a-bg-subtle);
    border: 1px solid var(--a-border-default);
    padding: 2rem;

    .skjema-sporsmal {
        padding: 0;
        background: transparent;
        margin-bottom: 0;
    }
`;

const OpplysningView = (props: {opplysning: Opplysning; gruppeIndex: number}) => {
    const {opplysning, gruppeIndex} = props;
    const opplysningSpc = getSpcForOpplysning(opplysning.type);

    const intl = useIntl();
    const feilListe = useSelector((state: State) => state.validering.feil);
    const feil = feilListe.find((feil: Valideringsfeil) => feil.faktumKey === opplysning.type);
    const sporsmalsFeil = feil ? intl.formatMessage({id: feil.feilkode}) : undefined;

    if (opplysning.slettet) {
        return <VedleggSlettet opplysning={opplysning} />;
    }

    return (
        <OkonomiskeOpplysningerSporsmal>
            <Sporsmal
                sprakNokkel={opplysningSpc && opplysningSpc.textKey ? opplysningSpc.textKey : ""}
                feil={sporsmalsFeil}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <TabellView opplysning={opplysning} gruppeIndex={gruppeIndex} />
                <VedleggView okonomiskOpplysning={opplysning} />
            </Sporsmal>
        </OkonomiskeOpplysningerSporsmal>
    );
};

export default OpplysningView;
