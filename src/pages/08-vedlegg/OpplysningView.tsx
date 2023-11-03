import {TabellView} from "./TabellView";
import {VedleggView} from "./VedleggView";
import {VedleggSlettet} from "./vedleggSlettet";
import {useTranslation} from "react-i18next";
import {Opplysning, opplysningSpec} from "../../lib/opplysninger";
import {BodyShort, Heading} from "@navikt/ds-react";

export const OpplysningView = ({opplysning}: {opplysning: Opplysning}) => {
    const {textKey} = opplysningSpec[opplysning.type];
    const {t, i18n} = useTranslation("skjema");

    if (opplysning.slettet) return <VedleggSlettet opplysning={opplysning} />;

    return (
        <div className={"rounded-md bg-[var(--a-surface-subtle)] border-[1px] border-[var(--a-border-default)] p-8"}>
            asdfasdf
            <Heading level={"4"} size={"medium"} spacing>
                {t(`${textKey}.sporsmal`)}
            </Heading>
            {i18n.exists(`${textKey}.undertekst`) && <BodyShort spacing>{t(`${textKey}.undertekst`)}</BodyShort>}
            <TabellView opplysning={opplysning} />
            <VedleggView opplysning={opplysning} />
        </div>
    );
};
