import {useQueryClient} from "@tanstack/react-query";
import {
    useGetTelefonnummer,
    useUpdateTelefonnummer,
} from "../../../generated/new/telefonnummer-controller/telefonnummer-controller.ts";
import {TelefonnummerInput} from "../../../generated/new/model/telefonnummerInput.ts";
import {useSoknadId} from "../common/useSoknadId.ts";
import {TelefonnummerDto} from "../../../generated/new/model/telefonnummerDto.ts";
import {optimisticMutationHandlers} from "./optimisticMutationHandlers.ts";

export const useTelefonnummerAPI = () => {
    const queryClient = useQueryClient();
    const soknadId = useSoknadId();
    const {data: telefonnummer, queryKey, isLoading} = useGetTelefonnummer(soknadId);
    const {mutateAsync} = useUpdateTelefonnummer({
        mutation: optimisticMutationHandlers<TelefonnummerDto, TelefonnummerInput>(queryClient, queryKey),
    });

    const setTelefonnummer = async ({telefonnummerBruker}: Partial<TelefonnummerInput>) => {
        const updatedData = await mutateAsync({soknadId, data: {telefonnummerBruker}});
        queryClient.setQueryData(queryKey, updatedData);
    };

    return {telefonnummer, setTelefonnummer, isLoading};
};
