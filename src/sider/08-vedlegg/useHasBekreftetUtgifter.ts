import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {useGetBoutgifter} from "../../generated/new/boutgift-controller/boutgift-controller.ts";
import {useGetBarneutgifter} from "../../generated/new/barneutgift-controller/barneutgift-controller.ts";

const useHasBekreftetUtgifter = () => {
    const soknadId = useSoknadId();

    const {data: barneutgifterData, isLoading: isBarneutgifterLoading} = useGetBarneutgifter(soknadId);
    const {data: boutgifterData, isLoading: isBoutgifterLoading} = useGetBoutgifter(soknadId);

    return {
        isLoading: isBarneutgifterLoading || isBoutgifterLoading,
        hasBekreftet: barneutgifterData?.hasBekreftelse || boutgifterData?.bekreftelse,
    };
};

export default useHasBekreftetUtgifter;
