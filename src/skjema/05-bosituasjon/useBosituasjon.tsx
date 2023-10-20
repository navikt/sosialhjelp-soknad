import {useHentBosituasjon, useUpdateBosituasjon} from "../../generated/bosituasjon-ressurs/bosituasjon-ressurs";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {BosituasjonFrontend} from "../../generated/model";
import {useQueryClient} from "@tanstack/react-query";

export const useBosituasjon = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: bosituasjon, isLoading, isError, queryKey} = useHentBosituasjon(behandlingsId);
    const {mutate} = useUpdateBosituasjon();

    const setBosituasjon = async (nyBosituasjon: Partial<BosituasjonFrontend>) => {
        const data = {...(bosituasjon as BosituasjonFrontend), ...nyBosituasjon};
        mutate({behandlingsId, data});
        queryClient.setQueryData(queryKey, data);
    };

    return {
        bosituasjon,
        setBosituasjon,
        isLoading,
        isError,
    };
};
