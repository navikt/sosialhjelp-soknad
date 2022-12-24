import * as React from "react";
import {Route, RouterProps, Switch, withRouter, matchPath, Prompt} from "react-router";
import {Location} from "history";
import {useDispatch} from "react-redux";
import Samtykke from "./samtykke/SamtykkeView";
import Steg1 from "./personopplysninger";
import Steg2 from "./begrunnelse";
import Steg3 from "./arbeidUtdanning";
import Steg4 from "./familie";
import Steg5 from "./bosituasjon";
import Steg6 from "./inntektFormue";
import Steg7 from "./utgifterGjeld";
import Steg8 from "./okonomiskeOpplysninger";
import NyOppsummering from "./ny-oppsummering/Oppsummering";
import SideIkkeFunnet from "../../nav-soknad/feilsider/SideIkkeFunnet";
import {skjulToppMeny} from "../../nav-soknad/utils/domUtils";
import {hentSoknad, hentSoknadOk, setShowPageNotFound} from "../redux/soknad/soknadActions";
import {erSkjemaEllerEttersendelseSide} from "../../nav-soknad/utils";
import TimeoutBox from "../../nav-soknad/components/timeoutbox/TimeoutBox";
import {AvbrytSoknad} from "../../nav-soknad/components/avbrytsoknad/AvbrytSoknad";
import {useEffect} from "react";
import ServerFeil from "../../nav-soknad/feilsider/ServerFeil";
import {fetchToJson, HttpStatus} from "../../nav-soknad/utils/rest-utils";
import {logWarning} from "../../nav-soknad/utils/loggerUtils";
import {Dispatch} from "redux";
import * as Sentry from "@sentry/react";
import {ApplicationSpinner} from "../../nav-soknad/components/applicationSpinner/ApplicationSpinner";
import {useSoknad} from "../redux/soknad/useSoknad";

const SentryRoute = Sentry.withSentryRouting(Route);

interface OwnProps {
    match: any;
    location: Location;
}

interface UrlParams {
    behandlingsIdFraUrl: string;
    stegFraUrl: string;
}

type SkjemaRouterProps = OwnProps & RouterProps;

const getSoknad = async (behandlingsId: string, dispatch: Dispatch) => {
    try {
        dispatch(hentSoknad(behandlingsId));
        const xsrfCookieIsOk: boolean = await fetchToJson(`soknader/${behandlingsId}/xsrfCookie`);
        dispatch(hentSoknadOk(xsrfCookieIsOk, behandlingsId ?? ""));
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) return;

        logWarning("hent soknad feilet: " + reason);
        dispatch(setShowPageNotFound(true));
    }
};

const SkjemaRouter = ({location}: SkjemaRouterProps) => {
    const {behandlingsId, showSideIkkeFunnet, showServerFeil} = useSoknad();

    const dispatch = useDispatch();

    useEffect(() => {
        skjulToppMeny();
        const match = matchPath(location.pathname, {
            path: "/skjema/:behandlingsIdFraUrl/:stegFraUrl",
        });
        if (match) {
            const {behandlingsIdFraUrl} = match.params as UrlParams;
            if (behandlingsId && behandlingsId !== behandlingsIdFraUrl) {
                dispatch(setShowPageNotFound(true));
            }
            if (!behandlingsId) getSoknad(behandlingsIdFraUrl, dispatch);
        } else {
            dispatch(setShowPageNotFound(true));
        }
    }, [behandlingsId, dispatch, location.pathname]);

    if (showServerFeil) return <ServerFeil />;
    if (showSideIkkeFunnet) return <SideIkkeFunnet />;

    if (behandlingsId) {
        const path = "/skjema/:behandingsId";
        return (
            <>
                <Switch>
                    <SentryRoute path={`${path}/0`} component={Samtykke} />
                    <SentryRoute path={`${path}/1`} component={Steg1} />
                    <SentryRoute path={`${path}/2`} component={Steg2} />
                    <SentryRoute path={`${path}/3`} component={Steg3} />
                    <SentryRoute path={`${path}/4`} component={Steg4} />
                    <SentryRoute path={`${path}/5`} render={() => <Steg5 behandlingsId={behandlingsId} />} />
                    <SentryRoute path={`${path}/6`} component={Steg6} />
                    <SentryRoute path={`${path}/7`} component={Steg7} />
                    <SentryRoute path={`${path}/8`} component={Steg8} />
                    <SentryRoute path={`${path}/9`} component={NyOppsummering} />
                    <SentryRoute component={SideIkkeFunnet} />
                </Switch>
                <Prompt
                    message={(loc) => {
                        // If the path includes "/skjema", do not inhibit navigation.
                        if (erSkjemaEllerEttersendelseSide(loc.pathname)) return true;

                        return "skjema";
                    }}
                />
                <TimeoutBox sessionDurationInMinutes={30} showWarningerAfterMinutes={25} />
                <AvbrytSoknad />
            </>
        );
    }

    return <ApplicationSpinner />;
};

export default withRouter(SkjemaRouter);
