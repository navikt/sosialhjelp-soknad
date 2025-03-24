import {useQueryClient} from "@tanstack/react-query";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {isValid} from "date-fns";
import {formatTidspunkt} from "../../utils";
import {
    useGetSkattbarInntekt,
    useUpdateSamtykke,
} from "../../../generated/new/inntekt-skattetaten-controller/inntekt-skattetaten-controller.ts";
import {getGetForventetDokumentasjonQueryKey} from "../../../generated/new/okonomiske-opplysninger-controller/okonomiske-opplysninger-controller.ts";

export const useSkatteetatenData = () => {
    const queryClient = useQueryClient();
    const behandlingsId = useBehandlingsId();

    const {data, isPending: isFetching, isError: isFetchError, queryKey} = useGetSkattbarInntekt(behandlingsId);
    const {mutate, status: mutationStatus, isError: isMutateError} = useUpdateSamtykke();
    const opplysningerQueryKey = getGetForventetDokumentasjonQueryKey(behandlingsId);

    const setSamtykke = async (samtykke: boolean) => {
        // Any HentSkattbareInntekter queries on the way are no longer valid
        await queryClient.cancelQueries({queryKey});
        await queryClient.cancelQueries({queryKey: opplysningerQueryKey});
        return mutate(
            {soknadId: behandlingsId, data: samtykke},
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

    const samtykkeTimestamp = data?.samtykke?.samtykkeTidspunkt && new Date(data?.samtykke?.samtykkeTidspunkt);
    const samtykkeTidspunkt = isValid(samtykkeTimestamp) ? formatTidspunkt(samtykkeTimestamp as Date) : "";

    return {
        inntekt: data?.inntektSkatteetaten,
        isError:
            isFetchError ||
            isMutateError ||
            data?.inntektFraSkatteetatenFeilet === true ||
            (data?.samtykke && samtykkeTidspunkt === ""),
        samtykke: data?.samtykke?.verdi,
        isPending: isFetching || mutationStatus === "pending",
        samtykkeTidspunkt,
        setSamtykke,
    };
};
