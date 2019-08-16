import * as React from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import {connect} from "react-redux";
import {State} from "./redux/reducers";
import Feilside from "../nav-soknad/components/feilside/Feilside"
import {REST_STATUS} from "../nav-soknad/types";

interface StateProps {
    children: React.ReactNode;
    showLargeSpinner: boolean;
    showFeilside: boolean;
    restStatus: REST_STATUS;
}

class LargeSpinnerContainer extends React.Component<StateProps, {}> {

    render() {
        let { children, showFeilside, restStatus } = this.props;

        if (showFeilside) {
            /** I og med tekstressurser ikke er tilgjengelig, må tekster hardkodes */
            children = (
                <Feilside>
                    <p>
                        Vi klarer ikke vise skjemaet til deg nå, vennligst prøv igjen
                        senere.
                    </p>
                </Feilside>
            );
        } else if (restStatus !== REST_STATUS.OK) {
            children = (
                <div className="application-spinner">
                    <NavFrontendSpinner type="XXL" />
                </div>
            );
        }
        return (
            <>
                {children}
            </>
        );
    }
}

export default connect((state: State) => {
    return {
        showLargeSpinner: state.soknad.showLargeSpinner,
        showFeilside: state.soknad.showFeilside,
        restStatus: state.init.restStatus
    };
})(LargeSpinnerContainer);
