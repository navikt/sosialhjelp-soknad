import {useIsKortSoknad} from "../../../generated/new/soknad-lifecycle-controller/soknad-lifecycle-controller";
import {useSoknadId} from "../common/useSoknadId.ts";

const useIsKort = () => {
    const soknadId = useSoknadId();

    return useIsKortSoknad(soknadId);
};

export default useIsKort;
