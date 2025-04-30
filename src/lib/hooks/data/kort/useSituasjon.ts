import {useSoknadId} from "../../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
    useGetSituasjonsendring,
    useUpdateSituasjonsendring,
} from "../../../../generated/new/situasjonsendring-controller/situasjonsendring-controller.ts";
import {SituasjonsendringDto} from "../../../../generated/new/model/index.ts";

const useSituasjon = () => {
    const soknadId = useSoknadId();
    const queryClient = useQueryClient();
    const {data, isLoading, isError, queryKey} = useGetSituasjonsendring(soknadId);
    const invalidate = () => queryClient.invalidateQueries({queryKey});
    const {
        mutate,
        isPending,
        isError: isMutateError,
        variables,
    } = useUpdateSituasjonsendring({mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})}});

    const updateSituasjonsendring = (data: SituasjonsendringDto) => mutate({soknadId, data});
    return {
        data: isPending ? variables.data : data,
        updateSituasjonsendring,
        isLoading,
        isError: isError || isMutateError,
        invalidate,
    };
};

export default useSituasjon;
