import {
    useGetKontonummer,
    useUpdateKontoInformasjonBruker,
} from "../../../generated/new/kontonummer-controller/kontonummer-controller.ts";
import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {optimisticMutationHandlers} from "./optimisticMutationHandlers.ts";
import {KontonummerFormValues} from "../../../sider/01-personalia/konto/KontonummerFormSchema.ts";
import {KontoinformasjonResponse} from "../../../generated/new/model/kontoinformasjonResponse.ts";
import {KontoinformasjonRequest} from "../../../generated/new/model/kontoinformasjonRequest.ts";

export const useKontonummer = () => {
    const soknadId = useSoknadId();
    const {data: kontoinformasjon, isLoading, queryKey} = useGetKontonummer(soknadId);
    const queryClient = useQueryClient();
    const mutationHandlers = optimisticMutationHandlers<KontoinformasjonResponse, KontoinformasjonRequest>(
        queryClient,
        queryKey
    );

    const {mutate} = useUpdateKontoInformasjonBruker({mutation: {...mutationHandlers}});

    const updateKontoInformasjon = (data: KontonummerFormValues) => mutate({soknadId, data});

    return {
        kontoinformasjon,
        updateKontoInformasjon,
        isLoading,
    };
};
