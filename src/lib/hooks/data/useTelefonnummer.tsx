import {useSoknadId} from "../common/useSoknadId.ts";
import {
    useGetTelefonnummer,
    useUpdateTelefonnummer,
} from "../../../generated/new/telefonnummer-controller/telefonnummer-controller.ts";
import {useQueryClient} from "@tanstack/react-query";

export const useTelefonnummer = () => {
    const queryClient = useQueryClient();
    const soknadId = useSoknadId();
    const {data, queryKey, isLoading} = useGetTelefonnummer(soknadId);
    const {
        mutate,
        isPending: mutationIsPending,
        variables,
    } = useUpdateTelefonnummer({mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})}});
    const telefonnummerBruker = mutationIsPending ? variables?.data.telefonnummerBruker : data?.telefonnummerBruker;
    const telefonnummerRegister = data?.telefonnummerRegister;
    const setTelefonnummer = async (brukerutfyltVerdi: string | null) =>
        mutate({soknadId: soknadId, data: {telefonnummerBruker: brukerutfyltVerdi ?? undefined}});

    return {telefonnummerBruker, telefonnummerRegister, setTelefonnummer, isLoading};
};
