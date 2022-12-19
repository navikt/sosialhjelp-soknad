import * as React from "react";
import {Route, RouterProps, Switch, withRouter, matchPath, Prompt} from "react-router";
import {Location} from "history";
import {useDispatch, useSelector} from "react-redux";
import Steg1 from "./personopplysninger";
import Steg2 from "./begrunnelse";
import Steg3 from "./arbeidUtdanning";
import Steg4 from "./familie";
import Steg5 from "./bosituasjon";
import Steg6 from "./inntektFormue";
import Steg7 from "./utgifterGjeld";
import Steg8 from "./okonomiskeOpplysninger";
import NyOppsummering from "./ny-oppsummering/Oppsummering";
import SideIkkeFunnet from "../../nav-soknad/containers/SideIkkeFunnet";
import {State} from "../redux/reducers";
import {skjulToppMeny} from "../../nav-soknad/utils/domUtils";
import {hentSoknad, hentSoknadOk, showServerFeil, showSideIkkeFunnet} from "../redux/soknad/soknadActions";
import {erSkjemaEllerEttersendelseSide, NAVIGASJONSPROMPT} from "../../nav-soknad/utils";
import TimeoutBox from "../../nav-soknad/components/timeoutbox/TimeoutBox";
import {AvbrytSoknad} from "../../nav-soknad/components/avbrytsoknad/AvbrytSoknad";
import {useEffect} from "react";
import ServerFeil from "../../nav-soknad/containers/ServerFeil";
import {fetchToJson, HttpStatus} from "../../nav-soknad/utils/rest-utils";
import {logWarning} from "../../nav-soknad/utils/loggerUtils";
import {Dispatch} from "redux";
import * as Sentry from "@sentry/react";
import {ApplicationSpinner} from "../../nav-soknad/components/applicationSpinner/ApplicationSpinner";

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
        if (reason.message === HttpStatus.UNAUTHORIZED) {
            return;
        }
        logWarning("hent soknad feilet: " + reason);
        dispatch(showSideIkkeFunnet(true));
    }
};

const SkjemaRouter = (props: SkjemaRouterProps) => {
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const visSideIkkeFunnet = useSelector((state: State) => state.soknad.showSideIkkeFunnet);
    const visServerFeil = useSelector((state: State) => state.soknad.showServerFeil);

    const dispatch = useDispatch();

    useEffect(() => {
        skjulToppMeny();
        const match = matchPath(props.location.pathname, {
            path: "/skjema/:behandlingsIdFraUrl/:stegFraUrl",
        });
        if (match) {
            const {behandlingsIdFraUrl} = match.params as UrlParams;
            if (behandlingsId && behandlingsId !== behandlingsIdFraUrl) {
                dispatch(showSideIkkeFunnet(true));
            }
            if (!behandlingsId) getSoknad(behandlingsIdFraUrl, dispatch);
        } else {
            dispatch(showSideIkkeFunnet(true));
        }
    }, [behandlingsId, dispatch, props.location.pathname]);

    if (visServerFeil) {
        return (
            <div>
                <ServerFeil />
                <Prompt
                    message={(loc) => {
                        dispatch(showServerFeil(false));
                        return erSkjemaEllerEttersendelseSide(loc.pathname) ? true : NAVIGASJONSPROMPT.SKJEMA;
                    }}
                />
            </div>
        );
    }

    if (visSideIkkeFunnet) return <SideIkkeFunnet />;

    if (behandlingsId) {
        const path = "/skjema/:behandingsId";
        return (
            <>
                <Switch>
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
                        return erSkjemaEllerEttersendelseSide(loc.pathname) ? true : NAVIGASJONSPROMPT.SKJEMA;
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
