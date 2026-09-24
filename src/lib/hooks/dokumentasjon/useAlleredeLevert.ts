import {useGetForventetDokumentasjon, useUpdateDokumentasjonStatus} from "../../../generated";
import {DokumentasjonDtoType} from "../../../generated/model";
import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";

const useAlleredeLevert = (opplysningstype: DokumentasjonDtoType) => {
    const soknadId = useSoknadId();
    const {data, queryKey} = useGetForventetDokumentasjon(soknadId);
    const queryClient = useQueryClient();
    const opplysning = data?.dokumentasjon?.find((dokumentasjon) => dokumentasjon.type === opplysningstype);
    const {mutate, variables, isPending} = useUpdateDokumentasjonStatus({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });

    return {
        alleredeLevert: isPending ? variables?.data?.hasLevert : opplysning?.dokumentasjonStatus === "LEVERT_TIDLIGERE",
        updateAlleredeLevert: (alleredeLevert: boolean) =>
            mutate({soknadId, data: {type: opplysningstype, hasLevert: alleredeLevert}}),
    };
};

export default useAlleredeLevert;
