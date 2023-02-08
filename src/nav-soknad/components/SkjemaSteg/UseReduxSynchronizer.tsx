import {useNavigate, useParams} from "react-router";
import {useDispatch} from "react-redux";
import {useSoknad} from "../../../digisos/redux/soknad/useSoknad";
import {useEffect} from "react";
import {hentSoknadOk, setShowServerError, setSoknadPending} from "../../../digisos/redux/soknad/soknadActions";
import {hentXsrfCookie} from "../../../generated/soknad-ressurs/soknad-ressurs";
import {AxiosError} from "axios/index";
import {logError, logInfo} from "../../utils/loggerUtils";

export type UrlParams = Record<"behandlingsId" | "skjemaSteg", string>;
// Compatibility layer which monitors the BehandlingsId as supplied in the URL,
// and if it has changed compared to Redux' idea of the state, we tell Redux
// to load the new application.
export const useReduxSynchronizer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {behandlingsId: behandlingsIdFraRedux} = useSoknad();
    const {behandlingsId: behandlingsIdFraUrl} = useParams<UrlParams>();

    useEffect(() => {
        if (!behandlingsIdFraRedux && behandlingsIdFraUrl) {
            dispatch(setSoknadPending(behandlingsIdFraUrl));

            hentXsrfCookie(behandlingsIdFraUrl)
                .then((xsrfCookieIsOk) => dispatch(hentSoknadOk(xsrfCookieIsOk, behandlingsIdFraUrl ?? "")))
                .catch((e: AxiosError) => {
                    const expectedErrors = [401, 410];

                    if (e.response && expectedErrors.includes(e.response.status)) {
                        if (e.response?.status === 410) {
                            logInfo("Videresender bruker på bakgrunn av 410 Gone");
                            navigate("/informasjon");
                        }
                    } else {
                        logError("hent xsrf feilet: " + e);
                        dispatch(setShowServerError(true));
                    }
                });
        }
    }, [behandlingsIdFraRedux, behandlingsIdFraUrl, dispatch, navigate]);
};
