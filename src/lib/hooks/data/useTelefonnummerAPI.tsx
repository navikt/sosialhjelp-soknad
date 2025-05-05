import {useQueryClient} from "@tanstack/react-query";
import {
    useGetTelefonnummer,
    useUpdateTelefonnummer,
} from "../../../generated/new/telefonnummer-controller/telefonnummer-controller.ts";
import {TelefonnummerInput} from "../../../generated/new/model/telefonnummerInput.ts";
import {useSoknadId} from "../common/useSoknadId.ts";
import {startTransition, useOptimistic} from "react";

export const useTelefonnummerAPI = () => {
    const queryClient = useQueryClient();
    const soknadId = useSoknadId();
    const {data: telefonnummer, queryKey, isLoading} = useGetTelefonnummer(soknadId);
    const {mutateAsync} = useUpdateTelefonnummer();

    const setTelefonnummer = async ({telefonnummerBruker}: Partial<TelefonnummerInput>) => {
        startTransition(() => setOptimistic({...(telefonnummer ?? {}), telefonnummerBruker}));
        const updatedData = await mutateAsync({soknadId, data: {telefonnummerBruker}});
        queryClient.setQueryData(queryKey, updatedData);
    };

    const [telefonnummerOptimistic, setOptimistic] = useOptimistic(telefonnummer);

    return {telefonnummer: telefonnummerOptimistic, setTelefonnummer, isLoading};
};
