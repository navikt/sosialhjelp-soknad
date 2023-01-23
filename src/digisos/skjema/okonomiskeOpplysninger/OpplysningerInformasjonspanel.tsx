import React from "react";
import Informasjonspanel from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import {useDispatch} from "react-redux";
import {visLasteOppVedleggModal} from "../../redux/soknad/soknadActions";
import {OpplastingAvVedleggModal} from "./OpplastingAvVedleggModal";
import {FormattedMessage} from "react-intl";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";

export const OpplysningerInformasjonspanel = () => {
    const dispatch = useDispatch();

    return (
        <Informasjonspanel ikon={"hensyn"} farge={DigisosFarge.VIKTIG}>
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
