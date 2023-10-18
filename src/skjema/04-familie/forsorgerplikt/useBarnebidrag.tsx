import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";

export const useBarnebidrag = () => {
    const {soknadsdata, lagre, oppdater} = useSoknadsdata(SoknadsSti.FORSORGERPLIKT);
    const barnebidrag = soknadsdata.familie.forsorgerplikt.barnebidrag;

    const setBarnebidrag = (verdi: string) => {
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        forsorgerplikt.barnebidrag = verdi;
        oppdater(forsorgerplikt);
        lagre(forsorgerplikt);
    };

    return {barnebidrag, setBarnebidrag};
};
