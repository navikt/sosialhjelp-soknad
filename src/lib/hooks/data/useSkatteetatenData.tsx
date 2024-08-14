import {useQueryClient} from "@tanstack/react-query";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {
    useHentSkattbareInntekter,
    usePutSkatteetatenSamtykke,
} from "../../../generated/skattbar-inntekt-ressurs/skattbar-inntekt-ressurs";
import {isValid} from "date-fns";
import {formatTidspunkt} from "../../utils";
import {useHentOkonomiskeOpplysninger} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";

export const useSkatteetatenData = () => {
    const queryClient = useQueryClient();
    const behandlingsId = useBehandlingsId();

    const {data, isPending: isFetching, isError: isFetchError, queryKey} = useHentSkattbareInntekter(behandlingsId);
    const {mutate, status: mutationStatus, isError: isMutateError} = usePutSkatteetatenSamtykke();
    const {queryKey: opplysningerQueryKey} = useHentOkonomiskeOpplysninger(behandlingsId);

    const setSamtykke = async (samtykke: boolean) => {
        // Any HentSkattbareInntekter queries on the way are no longer valid
        await queryClient.cancelQueries({queryKey});
        await queryClient.cancelQueries({queryKey: opplysningerQueryKey});
        return mutate(
            {behandlingsId, data: {samtykke}},
            {
                onSuccess: async () => {
                    await Promise.all([
                        queryClient.invalidateQueries({queryKey}),
                        queryClient.invalidateQueries({queryKey: opplysningerQueryKey}),
                    ]);
                },
            }
        );
    };

    const samtykkeTimestamp = !!data?.samtykkeTidspunkt && new Date(data.samtykkeTidspunkt);
    const samtykkeTidspunkt = isValid(samtykkeTimestamp) ? formatTidspunkt(samtykkeTimestamp as Date) : "";

    return {
        inntekt: data?.inntektFraSkatteetaten,
        isError:
            isFetchError ||
            isMutateError ||
            data?.inntektFraSkatteetatenFeilet === true ||
            (data?.samtykke && samtykkeTidspunkt === ""),
        samtykke: data?.samtykke ?? null,
        isPending: isFetching || mutationStatus === "pending",
        samtykkeTidspunkt,
        setSamtykke,
    };
};
