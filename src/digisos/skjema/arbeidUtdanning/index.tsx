import * as React from "react";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import Koffert from "../../../nav-soknad/components/svg/illustrasjoner/Koffert";
import {FormattedMessage} from "react-intl";
import Utdanning from "./utdanning/Utdanning";
import Arbeid from "./arbeid/Arbeid";
import StegMedNavigasjon from "../../../nav-soknad/components/SkjemaSteg/SkjemaSteg";

const ArbeidOgUtdanning: React.FC<{}> = () => {
    return (
        <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"arbeidbolk"} ikon={<Koffert />}>
            <Arbeid />
            <h2 className="overskrift">
                <FormattedMessage id="arbeid.dinsituasjon.studerer.undertittel" />
            </h2>
            <Utdanning />
        </StegMedNavigasjon>
    );
};

export default ArbeidOgUtdanning;
