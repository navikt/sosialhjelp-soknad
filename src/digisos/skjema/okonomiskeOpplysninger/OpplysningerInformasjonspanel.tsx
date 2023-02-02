import React from "react";
import Informasjonspanel from "../../../nav-soknad/components/Informasjonspanel";
import {useDispatch} from "react-redux";
import {visLasteOppVedleggModal} from "../../redux/soknad/soknadActions";
import {OpplastingAvVedleggModal} from "./OpplastingAvVedleggModal";
import {FormattedMessage} from "react-intl";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";

export const OpplysningerInformasjonspanel = () => {
    const dispatch = useDispatch();

    return (
        <Informasjonspanel ikon={"hensyn"} farge="viktig">
            <p>
                <FormattedMessage id="opplysninger.informasjon.avsnitt1" />
            </p>
            <p>
                <FormattedMessage id="opplysninger.informasjon.avsnitt2" />
            </p>
            <LinkButton
                type="button"
                onClick={() => {
                    dispatch(visLasteOppVedleggModal(true));
                }}
            >
                <FormattedMessage id="opplysninger.informasjon.lenke" />
            </LinkButton>
            <OpplastingAvVedleggModal />
        </Informasjonspanel>
    );
};
