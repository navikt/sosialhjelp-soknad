import {oppdaterSoknadsdataSti, SoknadsdataType, SoknadsSti} from "./soknadsdataReducer";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {hentSoknadsdata, lagreSoknadsdata} from "./soknadsdataActions";
import {State} from "../reducers";

/**
 * Hook for henting, oppdatering og lagring av Redux-data
 *
 * @example
 * Observerte at veldig mange Redux-komponenter gjør følgende:
 *     const dispatch = useDispatch();
 *     const {soknadsdata, lagre, oppdater} = useSoknadsdata();
 *     const behandlingsId = useBehandlingsId();
 *
 *     // Last data
 *     useEffect(() => {hentSoknadsdata(behandlingsId, SoknadsSti.STUDIELAN, dispatch);}, [behandlingsId, dispatch]);
 *     // Oppdater lokal state
 *     dispatch(oppdaterSoknadsdataSti(SoknadsSti.STUDIELAN, data));
 *     // Lagre til backend
 *     lagreSoknadsdata(behandlingsId, SoknadsSti.STUDIELAN, data, dispatch);
 *
 *     // Dette kan nå forenkles:
 *
 *     const {soknadsdata, lagre, oppdater} = useSoknadsdata(SoknadsSti.STUDIELAN); // Trigger en hentSoknadsdata
 *     console.log(soknadsdata)
 *     oppdater(data)
 *     lagre(data)
 * @param sti SøknadsSti (se typens definisjon)
 */
export const useSoknadsdata = (sti: SoknadsSti) => {
    const behandlingsId = useBehandlingsId();
    const dispatch = useDispatch();
    const soknadsdata = useSelector((state: State) => state.soknadsdata);

    useEffect(() => {
        hentSoknadsdata(behandlingsId, sti, dispatch);
    }, [behandlingsId, dispatch, sti]);

    // Lagrer gitt søknadsdata i gitt sti mot backend
    const lagre = (data: SoknadsdataType, callback?: (response: any) => void) =>
        lagreSoknadsdata(behandlingsId, sti, data, dispatch, callback);

    // Oppdaterer Redux-store lokalt
    const oppdater = (data: SoknadsdataType) => dispatch(oppdaterSoknadsdataSti(sti, data));

    return {
        soknadsdata,
        lagre,
        oppdater,
    };
};
