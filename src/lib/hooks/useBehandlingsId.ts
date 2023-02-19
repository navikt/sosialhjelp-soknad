import {useParams} from "react-router";
import {logError} from "../../nav-soknad/utils/loggerUtils";

type UrlParams = Record<"behandlingsId", string>;

// get behandlingsId from React Router URL parameters.
// logs warning if Redux and R-R disagree about behandlingsId
// Draft status.
// TODO: Fremdeles uavklart: Kan idFraUrl være null/undefined?
export const useBehandlingsId = () => {
    const {behandlingsId: idFraUrl} = useParams<UrlParams>();

    if (!idFraUrl) {
        logError("useBehandlingsId er invokert, men idFraUrl == false");
    }

    return idFraUrl!;
};
