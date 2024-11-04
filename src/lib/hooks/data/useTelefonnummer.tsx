import {useQueryClient} from "@tanstack/react-query";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {
    updateTelefonnummer,
    useHentTelefonnummer,
} from "../../../generated/telefonnummer-ressurs/telefonnummer-ressurs";
import {useIsNyDatamodell} from "../../../generated/soknad-ressurs/soknad-ressurs.ts";
import {
    useGetTelefonnummer,
    useUpdateTelefonnummer,
} from "../../../generated/new/telefonnummer-controller/telefonnummer-controller.ts";
import {AdresserDto} from "../../../generated/new/model";

export const useTelefonnummer = () => {
    const queryClient = useQueryClient();

    const behandlingsId = useBehandlingsId();
    const {data: isNyModell} = useIsNyDatamodell(behandlingsId);
    const {
        data: oldData,
        queryKey: oldQueryKey,
        isPending: isOldLoading,
    } = useHentTelefonnummer(behandlingsId, {query: {enabled: isNyModell === false}});
    const {
        data: newData,
        queryKey: newQueryKey,
        isPending: isNewLoading,
    } = useGetTelefonnummer(behandlingsId, {query: {enabled: isNyModell === false}});
    const {mutate} = useUpdateTelefonnummer({
        mutation: {
            onMutate: (data) => {
                queryClient.cancelQueries({queryKey: newQueryKey});
                const snapshot = queryClient.getQueryData<AdresserDto>(newQueryKey);
                queryClient.setQueryData<AdresserDto>(newQueryKey, (prev) => ({
                    ...prev,
                    ...data,
                }));
                return {snapshot};
            },
            onError: (_error, _variables, context) => {
                queryClient.setQueryData<AdresserDto>(newQueryKey, context?.snapshot);
            },
            onSuccess: () => queryClient.invalidateQueries({queryKey: newQueryKey}),
        },
    });
    const setTelefonnummer = async (brukerutfyltVerdi: string | null) => {
        if (isNyModell === true) {
            mutate({soknadId: behandlingsId, data: {telefonnummerBruker: brukerutfyltVerdi ?? undefined}});
        } else if (isNyModell === false) {
            queryClient.setQueryData(
                oldQueryKey,
                await updateTelefonnummer(behandlingsId, {
                    brukerdefinert: !!brukerutfyltVerdi?.length,
                    brukerutfyltVerdi: brukerutfyltVerdi?.length ? `${brukerutfyltVerdi}` : null,
                })
            );
        }
    };

    const fraSystem = oldData?.systemverdi ?? newData?.telefonnummerRegister;
    const fraBruker = oldData?.brukerutfyltVerdi ?? newData?.telefonnummerBruker;

    return {fraSystem, fraBruker, setTelefonnummer, isLoading: isOldLoading ?? isNewLoading};
};
