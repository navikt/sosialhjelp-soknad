import React from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import {Undertittel, Normaltekst} from "nav-frontend-typografi";
import Ella from "../../../nav-soknad/components/svg/Ella";

export const UbesvarteSporsmalPanel = () => {
    return (
        <Veilederpanel type="plakat" fargetema="advarsel" svg={<Ella visBakgrundsSirkel={false} />} kompakt>
            <Undertittel>Du har ikke besvart alle spørsmålene i søknaden</Undertittel>
            <Normaltekst>
                For å gjøre det enklere for veilederen å behandle søknaden din anbefaler jeg at du svarer på alle
                spørsmålene.
            </Normaltekst>
        </Veilederpanel>
    );
};
