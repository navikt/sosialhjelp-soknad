import React from "react";
import Informasjonspanel from "../../../nav-soknad/components/Informasjonspanel";
import {useDispatch} from "react-redux";
import {visLasteOppVedleggModal} from "../../redux/soknad/soknadActions";
import {OpplastingAvVedleggModal} from "./OpplastingAvVedleggModal";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";
import {useTranslation} from "react-i18next";

export const OpplysningerIkkeBesvartPanel = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");

    return (
        <Informasjonspanel ikon={"hensyn"} farge="viktig">
            <p>{t("opplysninger.ikkebesvart.avsnitt1")}</p>
            <p>{t("opplysninger.ikkebesvart.avsnitt2")}</p>
            <LinkButton
                type="button"
                onClick={() => {
                    dispatch(visLasteOppVedleggModal(true));
                }}
            >
                {t("opplysninger.informasjon.lenke")}
            </LinkButton>
            <OpplastingAvVedleggModal />
        </Informasjonspanel>
    );
};
