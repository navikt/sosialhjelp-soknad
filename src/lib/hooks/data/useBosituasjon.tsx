import {useHentBosituasjon, useUpdateBosituasjon} from "../../../generated/bosituasjon-ressurs/bosituasjon-ressurs";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {BosituasjonFrontend, BosituasjonFrontendBotype} from "../../../generated/model";
import {useQueryClient} from "@tanstack/react-query";

export const useBosituasjon = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: bosituasjon, isLoading, isError, queryKey} = useHentBosituasjon(behandlingsId);
    const {mutateAsync} = useUpdateBosituasjon();

    const setBosituasjon = async (nyBosituasjon: Partial<BosituasjonFrontend>) => {
        const data = {...(bosituasjon as BosituasjonFrontend), ...nyBosituasjon};
        queryClient.setQueryData(queryKey, data);
        const updated = await mutateAsync({behandlingsId, data});
        queryClient.setQueryData(queryKey, updated);
    };

    const setAntallPersoner = (antallPersoner: number | undefined) => setBosituasjon({antallPersoner});
    const setBotype = (botype: BosituasjonFrontendBotype) => setBosituasjon({botype});
    const {botype, antallPersoner} = bosituasjon || {};
    const showSecondaryOptions = !["eier", "leier", "kommunal", "ingen", null].includes(bosituasjon?.botype || null);

    return {
        botype,
        setBotype,
        antallPersoner,
        setAntallPersoner,
        isLoading,
        isError,
        showSecondaryOptions,
    };
};
