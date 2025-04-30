import {OkonomiskOpplysningDtoDetaljerItem} from "../../../generated/new-ssr/model";
import {DokumentasjonDtoType, UpdateOkonomiskOpplysningBody} from "../../../generated/new/model";
import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
    useGetOkonomiskeOpplysninger,
    useUpdateOkonomiskOpplysning,
} from "../../../generated/new/okonomiske-opplysninger-controller/okonomiske-opplysninger-controller.ts";

const useOkonomiskOpplysningMutation = <T extends OkonomiskOpplysningDtoDetaljerItem>(
    opplysningstype: DokumentasjonDtoType
) => {
    const soknadId = useSoknadId();
    const queryClient = useQueryClient();
    const {data, isLoading, queryKey} = useGetOkonomiskeOpplysninger(soknadId);
    const {mutate} = useUpdateOkonomiskOpplysning({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });
    const updateOkonomiskOpplysning = (data: UpdateOkonomiskOpplysningBody) => {
        mutate({soknadId: soknadId, data});
    };
    return {
        updateOkonomiskOpplysning,
        data: data?.opplysninger?.find((it) => it.type === opplysningstype)?.detaljer as T[] | undefined,
        isLoading,
    };
};

export default useOkonomiskOpplysningMutation;
