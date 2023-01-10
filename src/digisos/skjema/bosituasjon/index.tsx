import * as React from "react";
import BoligIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/BoligIllustrasjon";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import AntallPersoner from "./AntallPersoner";
import Botype from "./Botype";
import styled from "styled-components";
import StegMedNavigasjon, {UrlParams} from "../../../nav-soknad/components/SkjemaSteg/SkjemaSteg";
import {useParams} from "react-router";

// Dette blir sannsynligvis <Steg.Skjema />
const StegSkjema = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    gap: 5rem;
    margin-bottom: 5rem;
`;

export const Bosituasjon = () => {
    const {behandlingsId} = useParams<UrlParams>();

    if (!behandlingsId) return null;

    return (
        <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"bosituasjonbolk"} ikon={<BoligIllustrasjon />}>
            <StegSkjema>
                <Botype behandlingsId={behandlingsId} />
                <AntallPersoner behandlingsId={behandlingsId} />
            </StegSkjema>
        </StegMedNavigasjon>
    );
};

export default Bosituasjon;
