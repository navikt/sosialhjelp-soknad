import {useBehandlingsId} from "../../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {
    useGetSituasjonsendring,
    useUpdateSituasjonsendring,
} from "../../../../generated/new/situasjonsendring-controller/situasjonsendring-controller.ts";
import {SituasjonsendringDto} from "../../../../generated/new/model/index.ts";

const useSituasjon = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data, isLoading, isError, queryKey} = useGetSituasjonsendring(behandlingsId);
    const invalidate = () => queryClient.invalidateQueries({queryKey});
    const {
        mutate,
        isPending,
        isError: isMutateError,
        variables,
    } = useUpdateSituasjonsendring({mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})}});

    const updateSituasjonsendring = (data: SituasjonsendringDto) => mutate({soknadId: behandlingsId, data});
    return {
        data: isPending ? variables.data : data,
        updateSituasjonsendring,
        isLoading,
        isError: isError || isMutateError,
        invalidate,
    };
};

export default useSituasjon;
