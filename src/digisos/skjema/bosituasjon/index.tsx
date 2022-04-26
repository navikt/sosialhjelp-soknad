import * as React from "react";
import BoligIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/BoligIllustrasjon";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import AntallPersoner from "./AntallPersoner";
import Botype from "./Botype";
import {useBosituasjon} from "./useBosituasjon";
import {Loader} from "@navikt/ds-react";
import styled from "styled-components";
import {showServerFeil} from "../../redux/soknad/soknadActions";
import {useDispatch} from "react-redux";

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

    if (isError) dispatch(showServerFeil(true));

    return (
        <DigisosSkjemaSteg steg={DigisosSteg.bosituasjonbolk} ikon={<BoligIllustrasjon />}>
            <StegSkjema>
                <Botype behandlingsId={behandlingsId} />
                <AntallPersoner behandlingsId={behandlingsId} />
            </StegSkjema>
        </DigisosSkjemaSteg>
    );
};

export default Bosituasjon;
