import React from "react";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {Undertittel, Normaltekst} from "nav-frontend-typografi";

export const UbesvarteSporsmalPanel = () => {
    return (
        <Informasjonspanel farge={DigisosFarge.VIKTIG} ikon={InformasjonspanelIkon.ELLA}>
            <Undertittel>Du har ikke besvart alle spørsmålene i søknaden</Undertittel>
            <Normaltekst>
                For å gjøre det enklere for veilederen å behandle søknaden din anbefaler jeg at du svarer på alle
                spørsmålene.
            </Normaltekst>
        </Informasjonspanel>
    );
};
