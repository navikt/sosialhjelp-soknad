import {useBehandlingsId} from "../common/useBehandlingsId";
import {
    useGetTelefonnummer,
    useUpdateTelefonnummer,
} from "../../../generated/new/telefonnummer-controller/telefonnummer-controller.ts";
import {useQueryClient} from "@tanstack/react-query";

export const useTelefonnummer = () => {
    const queryClient = useQueryClient();
    const behandlingsId = useBehandlingsId();
    const {data, queryKey, isLoading} = useGetTelefonnummer(behandlingsId);
    const {
        mutate,
        isPending: mutationIsPending,
        variables,
    } = useUpdateTelefonnummer({mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})}});
    const telefonnummerBruker = mutationIsPending ? variables?.data.telefonnummerBruker : data?.telefonnummerBruker;
    const telefonnummerRegister = data?.telefonnummerRegister;
    const setTelefonnummer = async (brukerutfyltVerdi: string | null) =>
        mutate({soknadId: behandlingsId, data: {telefonnummerBruker: brukerutfyltVerdi ?? undefined}});

    return {telefonnummerBruker, telefonnummerRegister, setTelefonnummer, isLoading};
};
