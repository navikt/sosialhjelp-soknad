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
    const {mutateAsync} = useUpdateOkonomiskOpplysning();
    const updateOkonomiskOpplysning = async (data: UpdateOkonomiskOpplysningBody) => {
        queryClient.setQueryData(queryKey, await mutateAsync({soknadId, data}));
    };
    return {
        updateOkonomiskOpplysning,
        opplysning: data?.opplysninger?.find(({type}) => type === opplysningstype)?.detaljer as T[] | undefined,
        isLoading,
    };
};

export default useOkonomiskOpplysningMutation;
