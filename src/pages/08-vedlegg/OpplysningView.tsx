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
        <div className={"rounded-md bg-surface-subtle p-8"}>
            <Heading level={"4"} size={"medium"} spacing>
                {t(`${textKey}.sporsmal`)}
            </Heading>
            {i18n.exists(`${textKey}.undertekst`) && <BodyShort spacing>{t(`${textKey}.undertekst`)}</BodyShort>}
            <TabellView opplysning={opplysning} />
            <VedleggView opplysning={opplysning} />
        </div>
    );
};
