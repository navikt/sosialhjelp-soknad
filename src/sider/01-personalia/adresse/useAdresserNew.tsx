import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useGetAdresser, useUpdateAdresser} from "../../../generated/new/adresse-controller/adresse-controller.ts";
import {AdresserDto, AdresserInputAdresseValg, AdresserInputBrukerAdresse} from "../../../generated/new/model";

const useAdresserNew = (enabled: boolean) => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const query = useGetAdresser(behandlingsId, {
        query: {enabled},
    });
    const {mutate, isPending: isMutationPending} = useUpdateAdresser({
        mutation: {
            onMutate: (outgoing) => {
                queryClient.cancelQueries({queryKey: query.queryKey});
                const snapshot = queryClient.getQueryData<AdresserDto>(query.queryKey);
                queryClient.setQueryData<AdresserDto>(query.queryKey, (prev) => ({
                    ...prev,
                    ...outgoing.data,
                }));
                return {snapshot};
            },
            onSuccess: () => queryClient.invalidateQueries({queryKey: query.queryKey}),
            onError: (_error, _variables, context) => {
                queryClient.setQueryData<AdresserDto>(query.queryKey, context?.snapshot);
            },
        },
    });
    if (!enabled) {
        return null;
    }
    return {
        query,
        isMutationPending,
        setAdresseValg: (adresseValg: AdresserInputAdresseValg) => {
            mutate({soknadId: behandlingsId, data: {adresseValg}});
        },
        setBrukerdefinertAdresse: (brukerAdresse: AdresserInputBrukerAdresse) =>
            mutate({
                soknadId: behandlingsId,
                data: {
                    brukerAdresse,
                },
            }),
    };
};

export default useAdresserNew;
