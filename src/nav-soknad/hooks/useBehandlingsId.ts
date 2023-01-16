import {useParams} from "react-router";
import {useSoknad} from "../../digisos/redux/soknad/useSoknad";
import {logWarning} from "../utils/loggerUtils";

type UrlParams = Record<"behandlingsId", string>;

// get behandlingsId from React Router URL parameters.
// logs warning if Redux and R-R disagree about behandlingsId
export const useBehandlingsId = () => {
    const {behandlingsId: idFraUrl} = useParams<UrlParams>();
    const {behandlingsId: idFraRedux} = useSoknad();

    // This should never happen - so we want to know if it does
    if (idFraUrl && idFraRedux && idFraUrl !== idFraRedux) {
        logWarning(`idFraUrl (${idFraUrl}) != idFraRedux (${idFraRedux}) i useBehandlingsId!`);
    }

    return idFraUrl;
};
