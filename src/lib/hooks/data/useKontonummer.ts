import {
    useGetKontonummer,
    useUpdateKontoInformasjonBruker,
} from "../../../generated/new/kontonummer-controller/kontonummer-controller.ts";
import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {optimisticMutationHandlers} from "./optimisticMutationHandlers.ts";
import {KontonummerFormValues} from "../../../sider/01-personalia/KontonummerFormSchema.ts";
import {KontoinformasjonDto} from "../../../generated/new/model/kontoinformasjonDto.ts";
import {KontoinformasjonInput} from "../../../generated/new/model/kontoinformasjonInput.ts";

export const useKontonummer = () => {
    const soknadId = useSoknadId();
    const {data: kontoinformasjon, isLoading, queryKey} = useGetKontonummer(soknadId);
    const queryClient = useQueryClient();
    const mutationHandlers = optimisticMutationHandlers<KontoinformasjonDto, KontoinformasjonInput>(
        queryClient,
        queryKey
    );

    const {mutate, isPending: isMutating} = useUpdateKontoInformasjonBruker({mutation: {...mutationHandlers}});

    const updateKontoInformasjon = (data: KontonummerFormValues) => mutate({soknadId, data});

    return {
        kontoinformasjon,
        updateKontoInformasjon,
        isLoading,
        isMutating,
    };
};
