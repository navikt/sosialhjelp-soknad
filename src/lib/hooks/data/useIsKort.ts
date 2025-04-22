import {useIsKortSoknad} from "../../../generated/new/soknad-lifecycle-controller/soknad-lifecycle-controller";
import {useBehandlingsId} from "../common/useBehandlingsId";

const useIsKort = () => {
    const behandlingsId = useBehandlingsId();

    return useIsKortSoknad(behandlingsId);
};

export default useIsKort;
