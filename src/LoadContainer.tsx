import React, {useEffect} from "react";
import {sjekkAutentiseringOgTilgangOgHentRessurser} from "./digisos/redux/soknad/soknadActions";
import NavFrontendSpinner from "nav-frontend-spinner";
import {State} from "./digisos/redux/reducers";
import {connect} from "react-redux";
import {DispatchProps} from "./digisos/redux/reduxTypes";
import FeilSide from "./nav-soknad/components/feilside/Feilside";

interface OwnProps {
    showLargeSpinner: boolean;
    showFeilSide: boolean;
    children: React.ReactNode;
}

type Props = OwnProps & DispatchProps;

const LoadContainer: React.FC<Props> = (props: Props) => {
    const {dispatch, showLargeSpinner, showFeilSide, children} = props;

    useEffect(() => {
        dispatch(sjekkAutentiseringOgTilgangOgHentRessurser());
    }, [dispatch]);

    if (showLargeSpinner) {
        return (
            <div className="application-spinner">
                <NavFrontendSpinner type="XXL" />
            </div>
        );
    }
    if (showFeilSide) {
        return (
            <FeilSide>
                <p>Vi klarer ikke vise skjemaet til deg nå, vennligst prøv igjen senere.</p>
            </FeilSide>
        );
    }

    return <>{children}</>;
};

const mapStateToProps = (state: State) => {
    return {
        showLargeSpinner: state.soknad.showLargeSpinner,
        showFeilSide: state.soknad.showFeilSide,
    };
};

export default connect(mapStateToProps)(LoadContainer);
