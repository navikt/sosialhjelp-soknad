import React, {useState} from "react";
import Informasjonspanel from "../../nav-soknad/components/Informasjonspanel";
import {OpplastingAvVedleggModal} from "./OpplastingAvVedleggModal";
import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";
import {useTranslation} from "react-i18next";

export const OpplysningerInformasjonspanel = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const {t} = useTranslation("skjema");

    return (
        <Informasjonspanel ikon={"hensyn"} farge="suksess">
            <p>{t("opplysninger.informasjon.avsnitt1")}</p>
            <p>{t("opplysninger.informasjon.avsnitt2")}</p>
            <LinkButton type="button" onClick={() => setModalOpen(true)}>
                {t("opplysninger.informasjon.lenke")}
            </LinkButton>
            <OpplastingAvVedleggModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </Informasjonspanel>
    );
};
