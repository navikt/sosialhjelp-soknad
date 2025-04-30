import {useQueryClient} from "@tanstack/react-query";
import {useSoknadId} from "../common/useSoknadId.ts";
import {isValid} from "date-fns";
import {formatTidspunkt} from "../../utils";
import {
    useGetSkattbarInntekt,
    useUpdateSamtykke,
} from "../../../generated/new/inntekt-skattetaten-controller/inntekt-skattetaten-controller.ts";
import {getGetForventetDokumentasjonQueryKey} from "../../../generated/new/dokumentasjon-controller/dokumentasjon-controller.ts";

export const useSkatteetatenData = () => {
    const queryClient = useQueryClient();
    const soknadId = useSoknadId();

    const {
        data,
        isPending: isFetching,
        isError: isFetchError,
        queryKey: skattbarInntektQueryKey,
    } = useGetSkattbarInntekt(soknadId);
    const {mutate, status: mutationStatus, isError: isMutateError} = useUpdateSamtykke();
    const opplysningerQueryKey = getGetForventetDokumentasjonQueryKey(soknadId);

    const setSamtykke = async (samtykke: boolean) => {
        // Any HentSkattbareInntekter queries on the way are no longer valid
        await queryClient.cancelQueries({queryKey: skattbarInntektQueryKey});
        await queryClient.cancelQueries({queryKey: opplysningerQueryKey});
        return mutate(
            {soknadId, data: samtykke},
            {
                onSuccess: () =>
                    Promise.all([
                        queryClient.invalidateQueries({queryKey: skattbarInntektQueryKey}),
                        queryClient.invalidateQueries({queryKey: opplysningerQueryKey}),
                    ]),
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
