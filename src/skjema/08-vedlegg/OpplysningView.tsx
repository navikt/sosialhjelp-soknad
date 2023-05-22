import * as React from "react";
import {Opplysning} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import TabellView from "./TabellView";
import VedleggView from "./VedleggView";
import VedleggSlettet from "./vedleggSlettet";
import styled from "styled-components";
import {getFaktumSporsmalTekst} from "../../nav-soknad/utils";
import {useTranslation} from "react-i18next";
import {opplysningSpec} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";
import {Heading} from "@navikt/ds-react";

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
    const tekster = getFaktumSporsmalTekst(t, textKey);

    if (opplysning.slettet) return <VedleggSlettet opplysning={opplysning} />;

    return (
        <OkonomiskeOpplysningerSporsmal className={"!mb-4"}>
            <Heading level={"4"} size={"medium"} spacing>
                {t(tekster.sporsmal)}
            </Heading>
            <TabellView opplysning={opplysning} gruppeIndex={gruppeIndex} />
            <VedleggView opplysning={opplysning} />
        </OkonomiskeOpplysningerSporsmal>
    );
};

export default OpplysningView;
