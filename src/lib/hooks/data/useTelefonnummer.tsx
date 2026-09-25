import {useQueryClient} from "@tanstack/react-query";
import {useGetTelefonnummer, useUpdateTelefonnummer} from "../../../generated";
import {TelefonnummerInput, TelefonnummerDto} from "../../../generated/model";
import {useSoknadId} from "../common/useSoknadId.ts";
import {optimisticMutationHandlers} from "./optimisticMutationHandlers.ts";

export const useTelefonnummer = () => {
    const queryClient = useQueryClient();
    const soknadId = useSoknadId();
    const {data: telefonnummer, queryKey, isLoading} = useGetTelefonnummer(soknadId);

    const mutationHandlers = optimisticMutationHandlers<TelefonnummerDto, TelefonnummerInput>(queryClient, queryKey);

    const {mutate, isPending: isMutating} = useUpdateTelefonnummer({mutation: mutationHandlers});

    const setTelefonnummer = (data: Partial<TelefonnummerInput>) => mutate({soknadId, data});

    return {telefonnummer, setTelefonnummer, isLoading, isMutating};
};
