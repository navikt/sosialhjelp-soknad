import * as React from "react";
import {Opplysning} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import TabellView from "./TabellView";
import VedleggView from "./VedleggView";
import VedleggSlettet from "./vedleggSlettet";
import {getFaktumSporsmalTekst} from "../../nav-soknad/utils";
import {useTranslation} from "react-i18next";
import {opplysningSpec} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";
import {Heading} from "@navikt/ds-react";

const OpplysningView = ({opplysning}: {opplysning: Opplysning}) => {
    const {textKey} = opplysningSpec[opplysning.type];
    const {t} = useTranslation("skjema");
    const tekster = getFaktumSporsmalTekst(t, textKey);

    if (opplysning.slettet) return <VedleggSlettet opplysning={opplysning} />;

    return (
        <div className={"rounded-md bg-[var(--a-surface-subtle)] border-[1px] border-[var(--a-border-default)] p-8"}>
            <Heading level={"4"} size={"medium"} spacing>
                {t(tekster.sporsmal)}
            </Heading>
            <TabellView opplysning={opplysning} />
            <VedleggView opplysning={opplysning} />
        </div>
    );
};

export default OpplysningView;
