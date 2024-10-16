import {
    getHentSituasjonsendringQueryOptions,
    useHentSituasjonsendring,
    useUpdateSituasjonsendring,
} from "../../../../generated/situasjonsendring-ressurs/situasjonsendring-ressurs";
import {useBehandlingsId} from "../../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {SituasjonsendringFrontend} from "../../../../generated/model";

const useSituasjon = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {mutateAsync, isPending: isMutating, isError: isMutateError} = useUpdateSituasjonsendring();
    const {isPending, isError, queryKey} = useHentSituasjonsendring(behandlingsId);
    const get = (): Promise<SituasjonsendringFrontend> =>
        queryClient.ensureQueryData(getHentSituasjonsendringQueryOptions(behandlingsId));
    const put = async (data: SituasjonsendringFrontend) => {
        queryClient.setQueryData(queryKey, data);
        await mutateAsync({behandlingsId, data});
    };
    return {
        get,
        put,
        isPending: isPending || isMutating,
        isError: isError || isMutateError,
    };
};

export default useSituasjon;
