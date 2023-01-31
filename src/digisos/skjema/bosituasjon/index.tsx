import * as React from "react";
import BoligIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/BoligIllustrasjon";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import AntallPersoner from "./AntallPersoner";
import Botype from "./Botype";
import StegMedNavigasjon, {UrlParams} from "../../../nav-soknad/components/SkjemaSteg/SkjemaSteg";
import {useParams} from "react-router";

export const Bosituasjon = () => {
    const {behandlingsId} = useParams<UrlParams>();

    if (!behandlingsId) return null;

    return (
        <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"bosituasjonbolk"} ikon={<BoligIllustrasjon />}>
            <div className={"space-y-5"}>
                <Botype behandlingsId={behandlingsId} />
                <AntallPersoner behandlingsId={behandlingsId} />
            </div>
        </StegMedNavigasjon>
    );
};

export default Bosituasjon;
