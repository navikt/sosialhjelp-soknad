import * as React from "react";
import Sporsmal, {LegendTittleStyle} from "../../nav-soknad/components/sporsmal/Sporsmal";
import {Opplysning} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import TabellView from "./TabellView";
import VedleggView from "./VedleggView";
import VedleggSlettet from "./vedleggSlettet";
import {useSelector} from "react-redux";
import {State} from "../../digisos/redux/reducers";
import {Valideringsfeil} from "../../digisos/redux/validering/valideringActionTypes";
import styled from "styled-components";
import {getFaktumSporsmalTekst} from "../../nav-soknad/utils";
import {useTranslation} from "react-i18next";
import {opplysningSpec} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";

const OkonomiskeOpplysningerSporsmal = styled.div`
    border-radius: 5px;
    margin-bottom: 2px;
    background-color: var(--a-surface-subtle);
    border: 1px solid var(--a-border-default);
    padding: 2rem;

    .skjema-sporsmal {
        padding: 0;
        background: transparent;
        margin-bottom: 0;
    }
`;

const OpplysningView = ({opplysning, gruppeIndex}: {opplysning: Opplysning; gruppeIndex: number}) => {
    const {textKey} = opplysningSpec[opplysning.type];
    const {t} = useTranslation("skjema");
    const feilListe = useSelector((state: State) => state.validering.feil);
    const feil = feilListe.find((feil: Valideringsfeil) => feil.faktumKey === opplysning.type);
    const sporsmalsFeil = feil ? t(feil.feilkode) : undefined;

    if (opplysning.slettet) return <VedleggSlettet opplysning={opplysning} />;

    return (
        <OkonomiskeOpplysningerSporsmal className={"!mb-4"}>
            <Sporsmal
                tekster={getFaktumSporsmalTekst(t, textKey)}
                feil={sporsmalsFeil}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <TabellView opplysning={opplysning} gruppeIndex={gruppeIndex} />
                <VedleggView opplysning={opplysning} />
            </Sporsmal>
        </OkonomiskeOpplysningerSporsmal>
    );
};

export default OpplysningView;
