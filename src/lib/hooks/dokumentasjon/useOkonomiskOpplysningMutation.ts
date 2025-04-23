import {OkonomiskOpplysningDtoDetaljerItem} from "../../../generated/new-ssr/model";
import {DokumentasjonDtoType, UpdateOkonomiskOpplysningBody} from "../../../generated/new/model";
import {useBehandlingsId} from "../common/useBehandlingsId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
    useGetOkonomiskeOpplysninger,
    useUpdateOkonomiskOpplysning,
} from "../../../generated/new/okonomiske-opplysninger-controller/okonomiske-opplysninger-controller.ts";

const useOkonomiskOpplysningMutation = <T extends OkonomiskOpplysningDtoDetaljerItem>(
    opplysningstype: DokumentasjonDtoType
) => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data, isLoading, queryKey} = useGetOkonomiskeOpplysninger(behandlingsId);
    const {mutate} = useUpdateOkonomiskOpplysning({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });
    const updateOkonomiskOpplysning = (data: UpdateOkonomiskOpplysningBody) => {
        mutate({soknadId: behandlingsId, data});
    };
    return {
        updateOkonomiskOpplysning,
        data: data?.opplysninger?.find((it) => it.type === opplysningstype)?.detaljer as T[] | undefined,
        isLoading,
    };
};

export default useOkonomiskOpplysningMutation;
