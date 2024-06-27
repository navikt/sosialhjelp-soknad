import {useBehandlingsId} from "../common/useBehandlingsId";
import {useIsKortSoknad} from "../../../generated/soknad-ressurs/soknad-ressurs";

const useIsKort = () => {
    const behandlingsId = useBehandlingsId();

    return useIsKortSoknad(behandlingsId);
};

export default useIsKort;
