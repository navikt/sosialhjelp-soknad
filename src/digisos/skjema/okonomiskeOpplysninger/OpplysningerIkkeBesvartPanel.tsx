import React from "react";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import {useDispatch} from "react-redux";
import {visLasteOppVedleggModal} from "../../redux/soknad/soknadActions";
import {OpplastingAvVedleggModal} from "./OpplastingAvVedleggModal";
import {FormattedMessage} from "react-intl";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";

export const OpplysningerIkkeBesvartPanel = () => {
    const dispatch = useDispatch();

    return (
        <Informasjonspanel ikon={InformasjonspanelIkon.HENSYN} farge={DigisosFarge.VIKTIG}>
            <p>
                <FormattedMessage id="opplysninger.ikkebesvart.avsnitt1" />
            </p>
            <p>
                <FormattedMessage id="opplysninger.ikkebesvart.avsnitt2" />
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
