import {useSoknadId} from "../common/useSoknadId.ts";
import {useGetSkattbarInntekt} from "../../../generated";

export const useSkatteetatenData = () => {
    const soknadId = useSoknadId();

    const {data, isPending: isFetching, isError: isFetchError} = useGetSkattbarInntekt(soknadId);

    return {
        inntekt: data?.inntektSkatteetaten,
        isError: isFetchError || data?.inntektFraSkatteetatenFeilet === true,
        isPending: isFetching,
    };
};
