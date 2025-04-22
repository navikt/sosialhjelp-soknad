import {useIsKortSoknad} from "../../../generated/soknad-ressurs/soknad-ressurs";
import {useBehandlingsId} from "../common/useBehandlingsId";

const useIsKort = () => {
    const behandlingsId = useBehandlingsId();

    return useIsKortSoknad(behandlingsId);
};

export default useIsKort;
