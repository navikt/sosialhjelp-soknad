import React, {useState} from "react";
import {OpplastingAvVedleggModal} from "./OpplastingAvVedleggModal";
import {LinkButton} from "../../lib/components/linkButton/LinkButton";
import {useTranslation} from "react-i18next";
import {Alert, BodyShort} from "@navikt/ds-react";

export const UbesvarteOpplysninger = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const {t} = useTranslation("skjema");

    return (
        <Alert variant={"warning"}>
            <BodyShort spacing>{t("opplysninger.ikkebesvart.avsnitt1")}</BodyShort>
            <BodyShort spacing>{t("opplysninger.ikkebesvart.avsnitt2")}</BodyShort>
            <LinkButton type="button" onClick={() => setModalOpen(true)}>
                {t("opplysninger.informasjon.lenke")}
            </LinkButton>
            <OpplastingAvVedleggModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </Alert>
    );
};
