import * as React from "react";
import BoligIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/BoligIllustrasjon";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import AntallPersoner from "./AntallPersoner";
import Botype from "./Botype";
import {useBosituasjon} from "./useBosituasjon";
import {Loader} from "@navikt/ds-react";
import styled from "styled-components";
import {setShowServerError} from "../../redux/soknad/soknadActions";
import {useDispatch} from "react-redux";
import StegMedNavigasjon from "../../../nav-soknad/components/SkjemaSteg/SkjemaSteg";

interface BosituasjonViewProps {
    behandlingsId: string;
}

// Dette blir sannsynligvis <Steg.Skjema />
const StegSkjema = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    gap: 5rem;
    margin-bottom: 5rem;
`;

export const Bosituasjon = ({behandlingsId}: BosituasjonViewProps) => {
    const {isLoading, isError} = useBosituasjon(behandlingsId);
    const dispatch = useDispatch();

    if (isLoading) return <Loader />;

    if (isError) dispatch(setShowServerError(true));

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
