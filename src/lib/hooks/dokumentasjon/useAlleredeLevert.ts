import {
    useGetForventetDokumentasjon,
    useUpdateDokumentasjonStatus,
} from "../../../generated/new/dokumentasjon-controller/dokumentasjon-controller.ts";
import {DokumentasjonDtoType} from "../../../generated/new/model/index.ts";
import {useBehandlingsId} from "../common/useBehandlingsId.ts";
import {useQueryClient} from "@tanstack/react-query";

const useAlleredeLevert = (opplysningstype: DokumentasjonDtoType) => {
    const behandlingsId = useBehandlingsId();
    const {data, queryKey} = useGetForventetDokumentasjon(behandlingsId);
    const queryClient = useQueryClient();
    const opplysning = data?.dokumentasjon?.find((dokumentasjon) => dokumentasjon.type === opplysningstype);
    const {mutate, variables, isPending} = useUpdateDokumentasjonStatus({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });

    return {
        alleredeLevert: isPending ? variables?.data?.hasLevert : opplysning?.dokumentasjonStatus === "LEVERT_TIDLIGERE",
        updateAlleredeLevert: (alleredeLevert: boolean) =>
            mutate({soknadId: behandlingsId, data: {type: opplysningstype, hasLevert: alleredeLevert}}),
    };
};

export default useAlleredeLevert;
