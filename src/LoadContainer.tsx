import React, {createContext, useEffect, useState} from "react";
import {
    lagreHarNyligInnsendteSoknaderPaStore,
    lagreNedetidPaStore,
    lagrePabegynteSoknaderPaStore,
    lagreRessurserPaStore,
} from "./digisos/redux/soknad/soknadActions";
import {useDispatch} from "react-redux";
import Feilside from "./nav-soknad/components/feilside/Feilside";
import {fetchToJson, HttpStatus} from "./nav-soknad/utils/rest-utils";
import {
    FornavnResponse,
    HarNyligInnsendteSoknaderResponse,
    LedeteksterResponse,
    NedetidResponse,
    PabegynteSoknaderResponse,
    TilgangResponse,
} from "./digisos/redux/soknad/soknadTypes";
import {lagreLedeteksterPaStore} from "./digisos/redux/ledetekster/ledeteksterActions";
import {ApplicationSpinner} from "./nav-soknad/components/applicationSpinner/ApplicationSpinner";

interface FeatureToggles {
    leggeTilBarn: boolean;
}

const featureToggleContextInitialState = {
    leggeTilBarn: false,
};

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
                const tilgangResponse = await fetchToJson<TilgangResponse>(
                    "informasjon/utslagskriterier/sosialhjelp",
                    true
                );

                // Hvis tilgangApiRespone ikke thrower unauthorized error, så er bruker autentisert
                const ledeteksterResponse = await fetchToJson<LedeteksterResponse>(
                    "informasjon/tekster?sprak=nb_NO&type=soknadsosialhjelp"
                );
                const fornavnResponse = await fetchToJson<FornavnResponse>("informasjon/fornavn");
                const nedetidResponse = await fetchToJson<NedetidResponse>("nedetid");

                const harNyligInnsendteSoknaderResponse = await fetchToJson<HarNyligInnsendteSoknaderResponse>(
                    "informasjon/harNyligInnsendteSoknader"
                );
                const pabegynteSoknader = await fetchToJson<PabegynteSoknaderResponse[]>(
                    "informasjon/pabegynteSoknader"
                );
                const featureToggleResponse = await fetchToJson<FeatureToggles>("feature-toggle");
                setFeatureToggles(featureToggleResponse);

                dispatch(lagreLedeteksterPaStore(ledeteksterResponse));
                dispatch(lagreRessurserPaStore(tilgangResponse, fornavnResponse));
                dispatch(lagreNedetidPaStore(nedetidResponse));
                dispatch(lagreHarNyligInnsendteSoknaderPaStore(harNyligInnsendteSoknaderResponse));
                dispatch(lagrePabegynteSoknaderPaStore(pabegynteSoknader));

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

    if (showSpinner) {
        return <ApplicationSpinner />;
    }
    if (showErrorPage) {
        return (
            <Feilside>
                <p>Vi klarer ikke vise skjemaet til deg nå, vennligst prøv igjen senere.</p>
            </Feilside>
        );
    }

    return <FeatureToggleContext.Provider value={featureToggles}>{props.children}</FeatureToggleContext.Provider>;
};

export default LoadContainer;
