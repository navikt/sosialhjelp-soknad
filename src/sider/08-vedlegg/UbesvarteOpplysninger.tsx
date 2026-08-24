import React, {useRef} from "react";
import OpplastingAvVedleggModal from "./OpplastingAvVedleggModal";
import {LinkButton} from "../../lib/components/LinkButton";
import {useTranslation} from "react-i18next";
import {BodyShort, GuidePanel} from "@navikt/ds-react";

export const UbesvarteOpplysninger = () => {
    const ref = useRef<HTMLDialogElement>(null);
    const {t} = useTranslation("skjema");

    return (
        <GuidePanel poster className={"pb-8!"}>
            <BodyShort spacing>{t("opplysninger.ikkebesvart.avsnitt1")}</BodyShort>
            <BodyShort spacing>{t("opplysninger.ikkebesvart.avsnitt2")}</BodyShort>
            <LinkButton type="button" onClick={() => ref.current?.showModal()}>
                {t("opplysninger.informasjon.lenke")}
            </LinkButton>
            <OpplastingAvVedleggModal ref={ref} onClose={() => ref.current?.close()} />
        </GuidePanel>
    );
};
