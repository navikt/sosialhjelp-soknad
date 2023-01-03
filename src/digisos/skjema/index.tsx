import * as React from "react";
import {useParams} from "react-router";
import {useDispatch} from "react-redux";
import SideIkkeFunnet from "../../nav-soknad/feilsider/SideIkkeFunnet";
import {hentSoknad, hentSoknadOk, setShowPageNotFound} from "../redux/soknad/soknadActions";
import TimeoutBox from "../../nav-soknad/components/timeoutbox/TimeoutBox";
import {AvbrytSoknad} from "../../nav-soknad/components/avbrytsoknad/AvbrytSoknad";
import {useEffect} from "react";
import ServerFeil from "../../nav-soknad/feilsider/ServerFeil";
import {fetchToJson, HttpStatus} from "../../nav-soknad/utils/rest-utils";
import {logWarning} from "../../nav-soknad/utils/loggerUtils";
import {Dispatch} from "redux";
import {ApplicationSpinner} from "../../nav-soknad/components/applicationSpinner/ApplicationSpinner";
import {useSoknad} from "../redux/soknad/useSoknad";

export type UrlParams = Record<"behandlingsId" | "skjemaSteg", string>;

export const getSoknad = async (behandlingsId: string, dispatch: Dispatch) => {
    try {
        dispatch(hentSoknad(behandlingsId));
        const xsrfCookieIsOk = await fetchToJson<boolean>(`soknader/${behandlingsId}/xsrfCookie`);
        dispatch(hentSoknadOk(xsrfCookieIsOk, behandlingsId ?? ""));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) return;

        logWarning("hent soknad feilet: " + reason);
        dispatch(setShowPageNotFound(true));
    }
};

export const SkjemaRouter = () => {
    const {behandlingsId, showSideIkkeFunnet, showServerFeil} = useSoknad();
    const params = useParams<UrlParams>();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!behandlingsId && params.behandlingsId) getSoknad(params.behandlingsId, dispatch);
        else if (behandlingsId !== params.behandlingsId) dispatch(setShowPageNotFound(true));
    }, [behandlingsId, dispatch, params]);

    if (showServerFeil) return <ServerFeil />;

    if (showSideIkkeFunnet) return <SideIkkeFunnet />;

    if (behandlingsId)
        return (
            <>
                <TimeoutBox sessionDurationInMinutes={30} showWarningerAfterMinutes={25} />
                <AvbrytSoknad />
            </>
        );

    return <ApplicationSpinner />;
};

export default SkjemaRouter;
