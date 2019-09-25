import * as React from "react";
import {Route, Switch} from "react-router";
import {InjectedIntlProps, injectIntl} from "react-intl";
import SideIkkeFunnet from "../nav-soknad/containers/SideIkkeFunnet";
import ServerFeil from "../nav-soknad/containers/ServerFeil";
import Informasjon from "./informasjon";
import MockBruker from "./mock/mockbruker";
import MockLogin from "./mock/mocklogin";
import SkjemaRouter from "./skjema";
import Ettersendelse from "./skjema/ettersendelse";
import Link from "./link";
import NavFrontendSpinner from "nav-frontend-spinner";
import {connect} from "react-redux";
import {State} from "./redux/reducers";
import {useEffect} from "react";
import {initStart} from "./redux/init/initActions";
import {DispatchProps} from "./redux/reduxTypes";

interface StoreProps {
    showLargeSpinner: boolean
}

type Props = InjectedIntlProps & DispatchProps & StoreProps;

const App: React.FC<Props> = (props: Props) => {

    // FIXME: HVA GJØR DETTE?
    // componentDidMount() {
    //     (NavFrontendModal as any).setAppElement("#root");
    // }

    const {dispatch, showLargeSpinner} = props;

    useEffect(() => {
        dispatch(initStart());
    });

    // FIXME: If should show large spinner
    if (showLargeSpinner){
        return (
            <div className="application-spinner">
                <NavFrontendSpinner type="XXL"/>
            </div>
        )
    }
    if (showServerFeil){
        return (<ServerFeil />)
    }

    return (
        <span>
            <Switch>
                <Route
                    path={`/skjema/:brukerBehandlingId/ettersendelse`}
                    component={Ettersendelse}
                />
                <Route
                    path={`/informasjon`}
                    exact={true}
                    component={Informasjon}
                />
                <Route
                    path={`/link`}
                    exact={true}
                    component={Link}
                />
                <Route
                    path={`/mock`}
                    exact={true}
                    component={MockBruker}
                />
                <Route
                    path={`/mock-login`}
                    exact={true}
                    component={MockLogin}
                />
                <Route
                    path={`/undersokelse`}
                    exact={true}
                    component={() => <div style={{height: "67vh"}}/>}
                />
                <Route
                    path={`/skjema/:brukerBehandlingId/:steg`}
                    component={SkjemaRouter}
                    exact={true}
                />
                <Route component={SideIkkeFunnet}/>
            </Switch>
        </span>
    );
};

const mapStateToProps = (state: State) => {
    return {
        showLargeSpinner: state.soknad.showLargeSpinner,
        showServerFeil: state.soknad.showServerFeil
    };
};

export default connect(mapStateToProps)(injectIntl(App));
