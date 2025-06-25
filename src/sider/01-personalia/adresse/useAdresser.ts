import {useSoknadId} from "../../../lib/hooks/common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
    getGetAdresserQueryKey,
    useGetAdresser,
    useUpdateAdresser,
} from "../../../generated/new/adresse-controller/adresse-controller.ts";
import {
    AdresserDtoAdresseValg,
    AdresserDtoBrukerAdresse,
    AdresserDtoFolkeregistrertAdresse,
    AdresserDtoMidlertidigAdresse,
    AdresserInput,
    AdresserInputAdresseValg,
    AdresserInputBrukerAdresse,
    NavEnhetDto,
} from "../../../generated/new/model";
import {useState} from "react";

export const mutationKey = (soknadId: string) => ["updateAdresser", soknadId];

export interface UseAdresserResult {
    setAdressevalg: (value: AdresserDtoAdresseValg) => void;
    setAdresse: (value: AdresserInputBrukerAdresse | null) => void;
    variables:
        | {
              soknadId: string;
              data: AdresserInput;
          }
        | undefined;
    error: Error | null;
    isUpdatePending: boolean;
    folkeregistrert: AdresserDtoFolkeregistrertAdresse | undefined;
    midlertidig: AdresserDtoMidlertidigAdresse | undefined;
    brukerAdresse: AdresserDtoBrukerAdresse | undefined;
    adresseValg?: AdresserDtoAdresseValg;
    navEnhet?: NavEnhetDto | undefined;
    isLoading: boolean;
    showSpinner: boolean;
}

export const useAdresser = (): UseAdresserResult => {
    const soknadId = useSoknadId();
    const {data, isLoading, error} = useGetAdresser(soknadId);
    const queryClient = useQueryClient();
    const [showSpinner, setShowSpinner] = useState(false);
    const {
        mutate,
        variables,
        isPending: isUpdatePending,
    } = useUpdateAdresser({
        mutation: {
            mutationKey: mutationKey(soknadId),
            onMutate: () =>
                setTimeout(() => {
                    setShowSpinner(true);
                }, 500),
            onSettled: (_data, _error, _variables, context) => {
                clearTimeout(context);
                setShowSpinner(false);
                return queryClient.invalidateQueries({queryKey: getGetAdresserQueryKey(soknadId)});
            },
        },
    });

    const setAdressevalg = (value: AdresserDtoAdresseValg) => mutate({soknadId, data: {adresseValg: value}});

    const setAdresse = (value: AdresserInputBrukerAdresse | null) =>
        mutate({soknadId, data: {adresseValg: AdresserInputAdresseValg.SOKNAD, brukerAdresse: value ?? undefined}});

    return {
        setAdressevalg,
        setAdresse,
        variables,
        error,
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
