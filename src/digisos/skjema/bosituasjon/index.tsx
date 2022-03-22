import * as React from "react";
import {useEffect, useState} from "react";
import Botype from "./Botype";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import BoligIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/BoligIllustrasjon";
import {AntallPersoner} from "./AntallPersoner";
import {useBosituasjon} from "./useBosituasjon";

interface BosituasjonViewProps {
    behandlingsId: string;
}

export const Bosituasjon = ({behandlingsId}: BosituasjonViewProps) => {
    const {bosituasjon} = useBosituasjon(behandlingsId);

    const [botype, setBotype] = useState<string | undefined>(bosituasjon?.botype || undefined);
    const [antallPersoner, setAntallPersoner] = useState<string | undefined>(bosituasjon?.antallPersoner || undefined);

    // Send endringer til backend
    useEffect(() => {}, [botype, antallPersoner]);

    return (
        <DigisosSkjemaSteg steg={DigisosSteg.bosituasjonbolk} ikon={<BoligIllustrasjon />}>
            <Botype botype={botype} setBotype={setBotype} />
            <AntallPersoner antallPersoner={antallPersoner} setAntallPersoner={setAntallPersoner} />
        </DigisosSkjemaSteg>
    );
};

export default Bosituasjon;
