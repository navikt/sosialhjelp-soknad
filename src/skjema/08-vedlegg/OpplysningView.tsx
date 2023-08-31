import TabellView from "./TabellView";
import VedleggView from "./VedleggView";
import VedleggSlettet from "./vedleggSlettet";
import {getFaktumSporsmalTekst} from "../../nav-soknad/utils";
import {useTranslation} from "react-i18next";
import {Opplysning, opplysningSpec} from "../../lib/opplysninger";
import {BodyShort, Heading} from "@navikt/ds-react";

const OpplysningView = ({opplysning}: {opplysning: Opplysning}) => {
    const {textKey} = opplysningSpec[opplysning.type];
    const {t} = useTranslation("skjema");
    const tekster = getFaktumSporsmalTekst(t, textKey);

    const undertekstKey = `${textKey}.undertekst`;
    const undertekstTranslation = t(undertekstKey);
    const shouldDisplayUndertekst = undertekstTranslation !== undertekstKey;

    if (opplysning.slettet) return <VedleggSlettet opplysning={opplysning} />;

    return (
        <div className={"rounded-md bg-[var(--a-surface-subtle)] border-[1px] border-[var(--a-border-default)] p-8"}>
            <Heading level={"4"} size={"medium"} spacing={!shouldDisplayUndertekst}>
                {t(tekster.sporsmal)}
            </Heading>
            {undertekstTranslation !== undertekstKey && <BodyShort spacing>{undertekstTranslation}</BodyShort>}
            <TabellView opplysning={opplysning} />
            <VedleggView opplysning={opplysning} />
        </div>
    );
};

export default OpplysningView;
