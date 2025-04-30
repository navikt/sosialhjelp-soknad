import {useQueryClient} from "@tanstack/react-query";
import {
    useGetTelefonnummer,
    useUpdateTelefonnummer,
} from "../../../generated/new/telefonnummer-controller/telefonnummer-controller.ts";
import {TelefonnummerInput} from "../../../generated/new/model/telefonnummerInput.ts";
import {TelefonnummerDto} from "../../../generated/new/model/telefonnummerDto.ts";
import {useSoknadId} from "../common/useSoknadId.ts";

export const useTelefonnummerAPI = () => {
    const queryClient = useQueryClient();
    const soknadId = useSoknadId();
    const {data: telefonnummer, queryKey, isLoading} = useGetTelefonnummer(soknadId);
    const {mutateAsync} = useUpdateTelefonnummer();

    const setTelefonnummer = async (data: Partial<TelefonnummerInput>): Promise<TelefonnummerDto> => {
        const mutatedData = await mutateAsync({soknadId, data});
        queryClient.setQueryData(queryKey, mutatedData);
        return mutatedData;
    };

    return {telefonnummer, setTelefonnummer, isLoading};
};
