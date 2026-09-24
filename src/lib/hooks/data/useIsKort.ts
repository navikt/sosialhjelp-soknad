import {useIsKortSoknad} from "../../../generated";
import {useSoknadId} from "../common/useSoknadId.ts";

const useIsKort = () => {
    const soknadId = useSoknadId();

    return useIsKortSoknad(soknadId);
};

export default useIsKort;
