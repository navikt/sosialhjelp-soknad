import {useBehandlingsId} from "../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {updateArbeid, useHentArbeid} from "../../../generated/client/arbeid-ressurs/arbeid-ressurs";
import {updateUtdanning, useHentUtdanning} from "../../../generated/client/utdanning-ressurs/utdanning-ressurs";
import {ArbeidOgUtdanningType} from "../../../sider/03-arbeidUtdanning";

export const useArbeidOgUtdanning = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: arbeid, isLoading: isLoadingArbeid, queryKey: arbeidKey} = useHentArbeid(behandlingsId);
    const {data: utdanning, isLoading: isLoadingUtdanning, queryKey: utdanningKey} = useHentUtdanning(behandlingsId);

    const data: ArbeidOgUtdanningType | undefined = arbeid && utdanning ? {arbeid, utdanning} : undefined;

    const mutate = async (data: ArbeidOgUtdanningType) => {
        await updateArbeid(behandlingsId, data.arbeid);
        queryClient.setQueryData(arbeidKey, data.arbeid);
        await updateUtdanning(behandlingsId, data.utdanning);
        queryClient.setQueryData(utdanningKey, data.utdanning);
    };

    return {data, mutate, isLoading: isLoadingUtdanning || isLoadingArbeid};
};
