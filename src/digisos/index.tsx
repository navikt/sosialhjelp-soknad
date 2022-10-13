import * as React from "react";
import {Redirect, Route, Switch} from "react-router";
import SideIkkeFunnet from "../nav-soknad/containers/SideIkkeFunnet";
import Informasjon from "./informasjon/Informasjon";
import SkjemaRouter from "./skjema";
import Ettersendelse from "./skjema/ettersendelse";
import Link from "./link";
import {erMockMiljoEllerDev} from "../nav-soknad/utils";
import * as Sentry from "@sentry/react";

const SentryRoute = Sentry.withSentryRouting(Route);

const App: React.FC = () => (
    <main>
        <Switch>
            <SentryRoute exact path="/">
                <Redirect to="/informasjon" />
            </SentryRoute>
            <SentryRoute path={`/skjema/:brukerBehandlingId/ettersendelse`} component={Ettersendelse} />
            <SentryRoute path={`/informasjon`} exact={true} component={Informasjon} />
            <SentryRoute path={`/link`} exact={true} component={Link} />
            {erMockMiljoEllerDev() && (
                <SentryRoute path={`/mock-login`} exact={true}>
                    <Redirect to="/informasjon" />
                </SentryRoute>
            )}
            <SentryRoute path={`/skjema/:brukerBehandlingId/:steg`} component={SkjemaRouter} exact={true} />
            <SentryRoute component={SideIkkeFunnet} />
        </Switch>
    </main>
);

export default App;
