import React, {useEffect} from "react";
import {sjekkAutentiseringOgTilgangOgHentRessurser} from "./digisos/redux/soknad/soknadActions";
import NavFrontendSpinner from "nav-frontend-spinner";
import {State} from "./digisos/redux/reducers";
import {useDispatch, useSelector} from "react-redux";
import FeilSide from "./nav-soknad/components/feilside/Feilside";

interface Props {
    children: React.ReactNode;
}

const LoadContainer: React.FC<Props> = (props: Props) => {
    const {showLargeSpinner, showFeilSide} = useSelector((state: State) => state.soknad);
    const dispatch = useDispatch();

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

    return <>{props.children}</>;
};

export default LoadContainer;
