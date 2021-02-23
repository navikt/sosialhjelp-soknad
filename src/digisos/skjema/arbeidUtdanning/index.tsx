import * as React from "react";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import Koffert from "../../../nav-soknad/components/svg/illustrasjoner/Koffert";
import {FormattedMessage} from "react-intl";
import Utdanning from "./utdanning/Utdanning";
import Arbeid from "./arbeid/Arbeid";

const ArbeidOgUtdanning: React.FC<{}> = () => {
    return (
        <DigisosSkjemaSteg steg={DigisosSteg.arbeidbolk} ikon={<Koffert />}>
            <Arbeid />
            <h2 className="overskrift">
                <FormattedMessage id="arbeid.dinsituasjon.studerer.undertittel" />
            </h2>
            <Utdanning />
        </DigisosSkjemaSteg>
    );
};

export default ArbeidOgUtdanning;
