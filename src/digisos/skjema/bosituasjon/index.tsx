import * as React from "react";
import {useEffect, useState} from "react";
import BoligIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/BoligIllustrasjon";

import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";

import AntallPersoner from "./AntallPersoner";
import Botype from "./Botype";

import {useBosituasjon} from "./useBosituasjon";
import {fetchPut} from "../../../nav-soknad/utils/rest-utils";
import {soknadsdataUrl} from "../../redux/soknadsdata/soknadsdataActions";
import {SoknadsSti} from "../../redux/soknadsdata/soknadsdataReducer";

interface BosituasjonViewProps {
    behandlingsId: string;
}

export const Bosituasjon = ({behandlingsId}: BosituasjonViewProps) => {
    const {bosituasjon} = useBosituasjon(behandlingsId);

    const [botype, setBotype] = useState<string | null>(bosituasjon?.botype || null);
    const [antallPersoner, setAntallPersoner] = useState<string | null>(bosituasjon?.antallPersoner || null);

    // Send endringer til backend
    useEffect(() => {
        fetchPut(
            soknadsdataUrl(behandlingsId, SoknadsSti.BOSITUASJON),
            JSON.stringify({
                botype,
                antallPersoner,
            }),
            true
        ).then((data) => console.log(data));
    }, [botype, antallPersoner]);

    return (
        <DigisosSkjemaSteg steg={DigisosSteg.bosituasjonbolk} ikon={<BoligIllustrasjon />}>
            <Botype botype={botype} setBotype={setBotype} />
            <AntallPersoner defaultValue={antallPersoner} onValidated={setAntallPersoner} />
        </DigisosSkjemaSteg>
    );
};

export default Bosituasjon;
