import * as React from "react";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import Koffert from "../../../nav-soknad/components/svg/illustrasjoner/Koffert";
import {FormattedMessage} from "react-intl";
import Utdanning from "./utdanning/Utdanning";
import Arbeid from "./arbeid/Arbeid";
import StegMedNavigasjon from "../../../nav-soknad/components/SkjemaSteg/SkjemaSteg";
import {Heading} from "@navikt/ds-react";

const ArbeidOgUtdanning = () => {
    return (
        <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"arbeidbolk"} ikon={<Koffert />}>
            <Arbeid />
            <div>
                <Heading size="medium">
                    <FormattedMessage id="arbeid.dinsituasjon.studerer.undertittel" />
                </Heading>
                <Utdanning />
            </div>
        </StegMedNavigasjon>
    );
};

export default ArbeidOgUtdanning;
