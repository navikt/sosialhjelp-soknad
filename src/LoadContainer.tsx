import React, {createContext, useEffect, useState} from "react";
import {lagreHarNyligInnsendteSoknaderPaStore} from "./digisos/redux/soknad/soknadActions";
import {useDispatch} from "react-redux";
import Feilside from "./nav-soknad/components/feilside/Feilside";
import {fetchToJson, HttpStatus} from "./nav-soknad/utils/rest-utils";
import {HarNyligInnsendteSoknaderResponse} from "./digisos/redux/soknad/soknadTypes";
import {ApplicationSpinner} from "./nav-soknad/components/applicationSpinner/ApplicationSpinner";

interface FeatureToggles {}

const featureToggleContextInitialState = {};

export const FeatureToggleContext = createContext<FeatureToggles>(featureToggleContextInitialState);

interface Props {
    children: React.ReactNode;
}

const LoadContainer: React.FC<Props> = (props: Props) => {
    const [showSpinner, setShowSpinner] = useState(true);
    const [showErrorPage, setShowErrorPage] = useState(false);
    const [featureToggles, setFeatureToggles] = useState<FeatureToggles>(featureToggleContextInitialState);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            try {
                const harNyligInnsendteSoknaderResponse = await fetchToJson<HarNyligInnsendteSoknaderResponse>(
                    "informasjon/harNyligInnsendteSoknader"
                );

                const featureToggleResponse = await fetchToJson<FeatureToggles>("feature-toggle");
                setFeatureToggles(featureToggleResponse);

                dispatch(lagreHarNyligInnsendteSoknaderPaStore(harNyligInnsendteSoknaderResponse));

                setShowSpinner(false);
            } catch (reason) {
                if (reason.message === HttpStatus.UNAUTHORIZED) {
                    // Ønsker at spinneren står og går helt til redirect er utført.
                    setShowSpinner(true);
                } else {
                    setShowSpinner(false);
                    setShowErrorPage(true);
                }
            }
        }
        fetchData();
    }, [dispatch, setShowSpinner, setShowErrorPage, setFeatureToggles]);

    useEffect(() => {
        async function fetchDataWithoutErrorHandling() {
            try {
                const harNyligInnsendteSoknaderResponse = await fetchToJson<HarNyligInnsendteSoknaderResponse>(
                    "informasjon/harNyligInnsendteSoknader"
                );
                dispatch(lagreHarNyligInnsendteSoknaderPaStore(harNyligInnsendteSoknaderResponse));
            } catch (err) {
                // Trenger ikke feilhåndtering for dette kallet. Det skal fortsatt være mulig for bruker å starte søknad selv om disse requestene ikke går gjennom
            }
        }
        fetchDataWithoutErrorHandling();
    }, [dispatch]);

    if (showSpinner) return <ApplicationSpinner />;

    if (showErrorPage)
        return <Feilside>Vi klarer ikke vise skjemaet til deg nå, vennligst prøv igjen senere.</Feilside>;

    return <FeatureToggleContext.Provider value={featureToggles}>{props.children}</FeatureToggleContext.Provider>;
};

export default LoadContainer;
