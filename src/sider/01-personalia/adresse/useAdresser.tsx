import {useSoknadId} from "../../../lib/hooks/common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
    getGetAdresserQueryKey,
    useGetAdresser,
    useUpdateAdresser,
} from "../../../generated/new/adresse-controller/adresse-controller.ts";
import {AdresserInputAdresseValg, MatrikkelAdresse, VegAdresse} from "../../../generated/new/model";
import {isAxiosError} from "axios";
import {useState} from "react";

type AdresserInputBrukerAdresse = MatrikkelAdresse | VegAdresse;

export const mutationKey = (soknadId: string) => ["updateAdresser", soknadId];

export const useAdresser = () => {
    const soknadId = useSoknadId();
    const [adresseError, setAdresseError] = useState(false);
    const {data, isLoading, error} = useGetAdresser(soknadId);
    const queryClient = useQueryClient();
    const [showSpinner, setShowSpinner] = useState(false);

    const isAdresseConflictError = (error: unknown) => isAxiosError(error) && error.response?.status === 406; // adapt to your backend payload

    const {
        mutate,
        variables,
        isPending: isUpdatePending,
    } = useUpdateAdresser({
        mutation: {
            mutationKey: mutationKey(soknadId),
            onMutate: () => {
                setAdresseError(false);
                setTimeout(() => {
                    setShowSpinner(true);
                }, 500);
            },
            onError: (error) => {
                if (isAdresseConflictError(error)) {
                    setAdresseError(true); // handle this one locally
                }
            },
            onSettled: (_data, _error, _variables, context) => {
                clearTimeout(context);
                setShowSpinner(false);
                return queryClient.invalidateQueries({queryKey: getGetAdresserQueryKey(soknadId)});
            },
            // Keep existing global behavior for all other errors (403 handling etc.)
            // Only needed if your special case would otherwise be thrown globally:
            throwOnError: (error) => !isAdresseConflictError(error),
        },
    });

    const setAdressevalg = (value: AdresserInputAdresseValg) => mutate({soknadId, data: {adresseValg: value}});

    const setAdresse = (value: AdresserInputBrukerAdresse | null) =>
        mutate({soknadId, data: {adresseValg: AdresserInputAdresseValg.SOKNAD, brukerAdresse: value ?? undefined}});

    return {
        setAdressevalg,
        setAdresse,
        variables,
        error,
        adresseError,
        isUpdatePending,
        folkeregistrert: data?.folkeregistrertAdresse,
        midlertidig: data?.midlertidigAdresse,
        brukerAdresse: data?.brukerAdresse,
        adresseValg: data?.adresseValg,
        navEnhet: data?.navenhet,
        isLoading,
        showSpinner: showSpinner,
    };
};
