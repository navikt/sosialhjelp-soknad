import * as React from "react";
import BoligIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/BoligIllustrasjon";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import AntallPersoner from "./AntallPersoner";
import Botype from "./Botype";
import {useBosituasjon} from "./useBosituasjon";
import {Loader} from "@navikt/ds-react";

interface BosituasjonViewProps {
    behandlingsId: string;
}

export const Bosituasjon = ({behandlingsId}: BosituasjonViewProps) => {
    const {isLoading} = useBosituasjon(behandlingsId);

    if (isLoading) return <Loader />;

    return (
        <DigisosSkjemaSteg steg={DigisosSteg.bosituasjonbolk} ikon={<BoligIllustrasjon />}>
            <Botype behandlingsId={behandlingsId} />
            <AntallPersoner behandlingsId={behandlingsId} />
        </DigisosSkjemaSteg>
    );
};

export default Bosituasjon;
