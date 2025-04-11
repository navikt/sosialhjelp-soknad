import {
    useHentSituasjonsendring,
    useUpdateSituasjonsendring,
} from "../../../../generated/situasjonsendring-ressurs/situasjonsendring-ressurs";
import {useBehandlingsId} from "../../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {SituasjonsendringFrontend} from "../../../../generated/model";

const useSituasjon = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data, isLoading, isError, queryKey} = useHentSituasjonsendring(behandlingsId);
    const invalidate = () => queryClient.invalidateQueries({queryKey});
    const {
        mutate,
        isPending,
        isError: isMutateError,
        variables,
    } = useUpdateSituasjonsendring({mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})}});

    const updateSituasjonsendring = (data: SituasjonsendringFrontend) => mutate({behandlingsId, data});
    return {
        data: isPending ? variables.data : data,
        updateSituasjonsendring,
        isLoading,
        isError: isError || isMutateError,
        invalidate,
    };
};

export default useSituasjon;
