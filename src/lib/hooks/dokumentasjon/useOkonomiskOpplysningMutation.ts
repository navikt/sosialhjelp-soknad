import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
    useGetOkonomiskeOpplysninger,
    useUpdateOkonomiskOpplysning,
} from "../../../generated/new/okonomiske-opplysninger-controller/okonomiske-opplysninger-controller.ts";
import {
    AvdragRenterDto,
    BelopDto,
    BoliglanInput,
    DokumentasjonDtoType,
    GenericOkonomiInput,
    LonnsInput,
    LonnsInntektDto,
    UpdateOkonomiskOpplysningParams,
} from "../../../generated/new/model";

type UpdateOkonomiskOpplysningBody = BoliglanInput | GenericOkonomiInput | LonnsInput;

const useOkonomiskOpplysningMutation = <T extends AvdragRenterDto | BelopDto | LonnsInntektDto>(
    opplysningstype: DokumentasjonDtoType
) => {
    const soknadId = useSoknadId();
    const queryClient = useQueryClient();
    const {data, isLoading, queryKey} = useGetOkonomiskeOpplysninger(soknadId);
    const {mutateAsync} = useUpdateOkonomiskOpplysning();
    const params: UpdateOkonomiskOpplysningParams = {type: opplysningstype};
    const updateOkonomiskOpplysning = async (data: UpdateOkonomiskOpplysningBody) => {
        queryClient.setQueryData(queryKey, await mutateAsync({soknadId, data, params}));
    };
    return {
        updateOkonomiskOpplysning,
        opplysning: data?.opplysninger?.find(({type}) => type === opplysningstype)?.detaljer as T[] | undefined,
        isLoading,
    };
};

export default useOkonomiskOpplysningMutation;
