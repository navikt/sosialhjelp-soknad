import * as React from "react";
import {Route, RouterProps, Switch, withRouter, matchPath, Prompt} from "react-router";
import {Location} from "history";
import {connect} from "react-redux";
import Steg1 from "./personopplysninger";
import Steg2 from "./begrunnelse";
import Steg3 from "./arbeidUtdanning";
import Steg4 from "./familie";
import Steg5 from "./bosituasjon";
import Steg6 from "./inntektFormue";
import Steg7 from "./utgifterGjeld";
import Steg8 from "./okonomiskeOpplysninger";
import Oppsummering from "./oppsummering";
import SideIkkeFunnet from "../../nav-soknad/containers/SideIkkeFunnet";
import {DispatchProps} from "../redux/reduxTypes";
import {State} from "../redux/reducers";
import {skjulToppMeny} from "../../nav-soknad/utils/domUtils";
import {hentSoknad, showServerFeil, showSideIkkeFunnet} from "../redux/soknad/soknadActions";
import {erSkjemaEllerEttersendelseSide, NAVIGASJONSPROMT} from "../../nav-soknad/utils";
import TimeoutBox from "../../nav-soknad/components/timeoutbox/TimeoutBox";
import AvbrytSoknad from "../../nav-soknad/components/avbrytsoknad/AvbrytSoknad";
import NavFrontendSpinner from "nav-frontend-spinner";
import {useEffect} from "react";
import ServerFeil from "../../nav-soknad/containers/ServerFeil";

interface OwnProps {
    match: any;
    location: Location;
}

interface StateProps {
    restStatus: string;
    behandlingsId: string | undefined;
    visSideIkkeFunnet: boolean;
    visServerFeil: boolean;
}

interface UrlParams {
    behandlingsIdFraUrl: string;
    stegFraUrl: string;
}

type Props = OwnProps & StateProps & RouterProps & DispatchProps;

const SkjemaRouter: React.FC<Props> = (props: Props) => {
    const {behandlingsId, visSideIkkeFunnet, dispatch, visServerFeil} = props;

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
            if (!behandlingsId) {
                dispatch(hentSoknad(behandlingsIdFraUrl));
            }
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
                        return erSkjemaEllerEttersendelseSide(loc.pathname) ? true : NAVIGASJONSPROMT.SKJEMA;
                    }}
                />
            </div>
        );
    }

    if (visSideIkkeFunnet) {
        return <SideIkkeFunnet />;
    }

    if (behandlingsId) {
        const path = "/skjema/:behandingsId";
        return (
            <>
                <Switch>
                    <Route path={`${path}/1`} component={Steg1} />
                    <Route path={`${path}/2`} component={Steg2} />
                    <Route path={`${path}/3`} component={Steg3} />
                    <Route path={`${path}/4`} component={Steg4} />
                    <Route path={`${path}/5`} component={Steg5} />
                    <Route path={`${path}/6`} component={Steg6} />
                    <Route path={`${path}/7`} component={Steg7} />
                    <Route path={`${path}/8`} component={Steg8} />
                    <Route path={`${path}/9`} component={Oppsummering} />
                    <Route component={SideIkkeFunnet} />
                </Switch>
                <Prompt
                    message={(loc) => {
                        return erSkjemaEllerEttersendelseSide(loc.pathname) ? true : NAVIGASJONSPROMT.SKJEMA;
                    }}
                />
                <TimeoutBox sessionDurationInMinutes={30} showWarningerAfterMinutes={25} />
                <AvbrytSoknad />
            </>
        );
    }

    return (
        <div className="application-spinner">
            <NavFrontendSpinner type="XXL" />
        </div>
    );
};

const mapStateToProps = (state: State): StateProps => {
    return {
        restStatus: state.soknad.restStatus,
        behandlingsId: state.soknad.behandlingsId,
        visSideIkkeFunnet: state.soknad.showSideIkkeFunnet,
        visServerFeil: state.soknad.showServerFeil,
    };
};

export default connect(mapStateToProps)(withRouter(SkjemaRouter) as any);
