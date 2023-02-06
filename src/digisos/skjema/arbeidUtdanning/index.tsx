import * as React from "react";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import Koffert from "../../../nav-soknad/components/svg/illustrasjoner/Koffert";
import Utdanning from "./utdanning/Utdanning";
import Arbeid from "./arbeid/Arbeid";
import StegMedNavigasjon from "../../../nav-soknad/components/SkjemaSteg/SkjemaSteg";
import {Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

const ArbeidOgUtdanning = () => {
    const {t} = useTranslation("skjema");

    return (
        <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"arbeidbolk"} ikon={<Koffert />}>
            <Arbeid />
            <div>
                <Heading size="medium">{t("arbeid.dinsituasjon.studerer.undertittel")}</Heading>
                <Utdanning />
            </div>
        </StegMedNavigasjon>
    );
};

export default ArbeidOgUtdanning;
