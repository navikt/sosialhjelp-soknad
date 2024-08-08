import {
    useHentBosituasjon,
    useUpdateBosituasjon,
} from "../../../generated/client/bosituasjon-ressurs/bosituasjon-ressurs";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {BosituasjonFrontend, BosituasjonFrontendBotype} from "../../../generated/client/model";
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

    const setBotype = (botype: BosituasjonFrontendBotype) => setBosituasjon({botype});
    const {botype, antallPersoner} = bosituasjon || {};

    return {
        bosituasjon,
        botype,
        antallPersoner,
        setBosituasjon,
        setBotype,
        isLoading,
        isError,
    };
};
