import {
    updateForsorgerplikt,
    useHentForsorgerplikt,
} from "../../../generated/client/forsorgerplikt-ressurs/forsorgerplikt-ressurs";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {ForsorgerpliktFrontendBarnebidrag} from "../../../generated/client/model";
import {useQueryClient} from "@tanstack/react-query";

export const useBarnebidrag = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: forsorgerplikt, queryKey} = useHentForsorgerplikt(behandlingsId);
    const barnebidrag = forsorgerplikt?.barnebidrag;

    const setBarnebidrag = async (barnebidrag: ForsorgerpliktFrontendBarnebidrag) => {
        if (!forsorgerplikt) return;
        const oppdatert = {...forsorgerplikt, barnebidrag};
        queryClient.setQueryData(queryKey, oppdatert);
        await updateForsorgerplikt(behandlingsId, oppdatert);
        queryClient.setQueryData(queryKey, oppdatert);
    };

    return {barnebidrag, setBarnebidrag};
};
