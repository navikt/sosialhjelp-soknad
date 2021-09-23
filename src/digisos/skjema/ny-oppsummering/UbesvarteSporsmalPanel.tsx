import React from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import Ella from "../../../nav-soknad/components/svg/Ella";
import {BodyShort, Heading} from "@navikt/ds-react";

export const UbesvarteSporsmalPanel = () => {
    return (
        <Veilederpanel type="plakat" fargetema="advarsel" svg={<Ella visBakgrundsSirkel={false} />} kompakt>
            <Heading level="2" size="medium" spacing>
                Du har ikke besvart alle spørsmålene i søknaden
            </Heading>
            <BodyShort spacing>
                For å gjøre det enklere for veilederen å behandle søknaden din anbefaler jeg at du svarer på alle
                spørsmålene.
            </BodyShort>
        </Veilederpanel>
    );
};
