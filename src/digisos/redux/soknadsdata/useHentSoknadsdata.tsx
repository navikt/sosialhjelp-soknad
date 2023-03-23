import {SoknadsSti} from "./soknadsdataReducer";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {useDispatch} from "react-redux";
import {useSoknadsdata} from "./useSoknadsdata";
import {useEffect} from "react";
import {hentSoknadsdata} from "./soknadsdataActions";

/**
 * Observerte at veldig mange Redux-komponenter gjør følgende:
 *
 *     const dispatch = useDispatch();
 *     const soknadsdata = useSoknadsdata();
 *     const behandlingsId = useBehandlingsId();
 *
 *     React.useEffect(() => {
 *         hentSoknadsdata(behandlingsId, SoknadsSti.STUDIELAN, dispatch);
 *     }, [behandlingsId, dispatch]);
 *
 *     Dette kan nå forenkles:
 * @example const soknadsdata = useHentSoknadsdata(SoknadsSti.STUDIELAN);
 * @param sti SøknadsSti (se typens definisjon)
 */
export const useHentSoknadsdata = (sti: SoknadsSti) => {
    const behandlingsId = useBehandlingsId();
    const dispatch = useDispatch();
    const soknadsdata = useSoknadsdata();

    useEffect(() => {
        hentSoknadsdata(behandlingsId, sti, dispatch);
    }, [behandlingsId, dispatch, sti]);

    return soknadsdata;
};
