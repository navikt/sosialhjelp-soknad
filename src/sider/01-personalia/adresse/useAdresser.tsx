import {useSoknadId} from "../../../lib/hooks/common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
    getGetAdresserQueryKey,
    useGetAdresser,
    useUpdateAdresser,
} from "../../../generated/new/adresse-controller/adresse-controller.ts";
import {
    AdresserInputAdresseValg,
    ForMangeMottakereInfo,
    MatrikkelAdresse,
    VegAdresse,
} from "../../../generated/new/model";
import {AxiosError, isAxiosError} from "axios";
import {useState} from "react";

type AdresserInputBrukerAdresse = MatrikkelAdresse | VegAdresse;
type AdresseErrorState = {
    hasError: boolean;
    info: ForMangeMottakereInfo | null;
};

export const mutationKey = (soknadId: string) => ["updateAdresser", soknadId];

export const useAdresser = () => {
    const soknadId = useSoknadId();
    const [forMangeMottakereError, setForMangeMottakereError] = useState<AdresseErrorState>({
        hasError: false,
        info: null,
    });
    const {data, isLoading, error} = useGetAdresser(soknadId);
    const queryClient = useQueryClient();
    const [showSpinner, setShowSpinner] = useState(false);

    const isForMangeMottakereInfo = (data: unknown): data is ForMangeMottakereInfo => {
        if (!data || typeof data !== "object") {
            return false;
        }
        const typedData = data as Record<string, unknown>;

        return (
            typeof typedData.innsendingGyldigFra === "string" &&
            typeof typedData.antallMottakere === "number" &&
            typeof typedData.maksAntallMottakere === "number" &&
            typeof typedData.begrensetPeriode === "number"
        );
    };

    const isForMangeMottakereError = (error: unknown): error is AxiosError<ForMangeMottakereInfo> =>
        isAxiosError(error) && error.response?.status === 406 && isForMangeMottakereInfo(error.response?.data);

    const {
        mutate,
        variables,
        isPending: isUpdatePending,
    } = useUpdateAdresser({
        mutation: {
            mutationKey: mutationKey(soknadId),
            onMutate: () => {
                setForMangeMottakereError({hasError: false, info: null});

                return setTimeout(() => {
                    setShowSpinner(true);
                }, 500);
            },
            onError: (error) => {
                if (isForMangeMottakereError(error)) {
                    setForMangeMottakereError({hasError: true, info: error.response?.data ?? null});
                }
            },
            onSettled: (_data, _error, _variables, context) => {
                clearTimeout(context);
                setShowSpinner(false);
                return queryClient.invalidateQueries({queryKey: getGetAdresserQueryKey(soknadId)});
            },
            // Keep existing global behavior for all other errors (403 handling etc.)
            // Only needed if your special case would otherwise be thrown globally:
            throwOnError: (error) => !isForMangeMottakereError(error),
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
        adresseError: forMangeMottakereError,
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
