import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {useGetBarneutgifter} from "../../generated/new/barneutgift-controller/barneutgift-controller.ts";
import {useGetBoutgifter} from "../../generated/new/boutgift-controller/boutgift-controller.ts";

const useHasBekreftetUtgifter = () => {
    const soknadId = useSoknadId();

    const {data: barneutgifterData, isLoading: isBarneutgifterLoading} = useGetBarneutgifter(soknadId, {
        query: {staleTime: 5 * 60 * 1000, queryKey: ["barneutgifter", soknadId]},
    });
    const {data: boutgifterData, isLoading: isBoutgifterLoading} = useGetBoutgifter(soknadId, {
        query: {staleTime: 5 * 60 * 1000, queryKey: ["boutgifter", soknadId]},
    });

    return {
        isLoading: isBarneutgifterLoading || isBoutgifterLoading,
        hasBekreftet: barneutgifterData?.hasBekreftelse || boutgifterData?.bekreftelse,
    };
};

export default useHasBekreftetUtgifter;
