import {oppdaterSoknadsdataSti, SoknadsSti} from "./soknadsdataReducer";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {hentSoknadsdata, lagreSoknadsdata} from "./soknadsdataActions";
import {State} from "../reducers";

/**
 * Observerte at veldig mange Redux-komponenter gjør følgende:
 *
 *     const dispatch = useDispatch();
 *     const {soknadsdata, lagre, oppdater} = useSoknadsdata();
 *     const behandlingsId = useBehandlingsId();
 *
 *     React.useEffect(() => {
 *         hentSoknadsdata(behandlingsId, SoknadsSti.STUDIELAN, dispatch);
 *     }, [behandlingsId, dispatch]);
 *
 *     Dette kan nå forenkles:
 * @example const {soknadsdata, lagre, oppdater} = useSoknadsdata(SoknadsSti.STUDIELAN);
 * @param sti SøknadsSti (se typens definisjon)
 */
export const useSoknadsdata = (sti: SoknadsSti) => {
    const behandlingsId = useBehandlingsId();
    const dispatch = useDispatch();
    const soknadsdata = useSelector((state: State) => state.soknadsdata);

    useEffect(() => {
        hentSoknadsdata(behandlingsId, sti, dispatch);
    }, [behandlingsId, dispatch, sti]);

    const lagre = (data: any, callback?: (response: any) => void) => {
        lagreSoknadsdata(behandlingsId, sti, data, dispatch, callback);
    };

    const oppdater = (data: any) => {
        dispatch(oppdaterSoknadsdataSti(sti, data));
    };

    return {
        soknadsdata,
        lagre,
        oppdater,
    };
};
