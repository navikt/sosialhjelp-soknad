import {useQueryClient} from "@tanstack/react-query";
import {
    useGetTelefonnummer,
    useUpdateTelefonnummer,
} from "../../../generated/new/telefonnummer-controller/telefonnummer-controller.ts";
import {TelefonnummerInput} from "../../../generated/new/model/telefonnummerInput.ts";
import {useSoknadId} from "../common/useSoknadId.ts";
import {TelefonnummerDto} from "../../../generated/new/model/telefonnummerDto.ts";
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
