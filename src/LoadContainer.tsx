import React, {useEffect, useState} from "react";
import {
    lagreHarNyligInnsendteSoknaderPaStore,
    lagreNedetidPaStore,
    lagreRessurserPaStore,
} from "./digisos/redux/soknad/soknadActions";
import NavFrontendSpinner from "nav-frontend-spinner";
import {useDispatch} from "react-redux";
import FeilSide from "./nav-soknad/components/feilside/Feilside";
import {fetchToJson, HttpStatus} from "./nav-soknad/utils/rest-utils";
import {
    FornavnResponse,
    HarNyligInnsendteSoknaderResponse,
    LedeteksterResponse,
    MiljovariablerResponse,
    NedetidResponse,
    TilgangResponse,
} from "./digisos/redux/soknad/soknadTypes";
import {lagreLedeteksterPaStore} from "./digisos/redux/ledetekster/ledeteksterActions";
import {lagreMiljovariablerPaStore} from "./digisos/redux/miljovariabler/miljovariablerActions";

interface Props {
    children: React.ReactNode;
}

const LoadContainer: React.FC<Props> = (props: Props) => {
    const [showSpinner, setShowSpinner] = useState(true);
    const [showErrorPage, setShowErrorPage] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            try {
                const tilgangResponse = await fetchToJson<TilgangResponse>(
                    "informasjon/utslagskriterier/sosialhjelp",
                    true
                );

                // Hvis tilgangApiRespone ikke thrower unauthorized error, så er bruker autentisert
                const miljoVariablerResponse = await fetchToJson<MiljovariablerResponse>("informasjon/miljovariabler");
                const ledeteksterResponse = await fetchToJson<LedeteksterResponse>(
                    "informasjon/tekster?sprak=nb_NO&type=soknadsosialhjelp"
                );
                const fornavnResponse = await fetchToJson<FornavnResponse>("informasjon/fornavn");
                const nedetidResponse = await fetchToJson<NedetidResponse>("nedetid");
                const harNyligInnsendteSoknaderResponse = await fetchToJson<HarNyligInnsendteSoknaderResponse>(
                    "informasjon/harNyligInnsendteSoknader"
                );

                dispatch(lagreLedeteksterPaStore(ledeteksterResponse));
                dispatch(lagreMiljovariablerPaStore(miljoVariablerResponse));
                dispatch(lagreRessurserPaStore(tilgangResponse, fornavnResponse));
                dispatch(lagreNedetidPaStore(nedetidResponse));
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
    }, [dispatch, setShowSpinner, setShowErrorPage]);

    if (showSpinner) {
        return (
            <div className="application-spinner">
                <NavFrontendSpinner type="XXL" />
            </div>
        );
    }
    if (showErrorPage) {
        return (
            <FeilSide>
                <p>Vi klarer ikke vise skjemaet til deg nå, vennligst prøv igjen senere.</p>
            </FeilSide>
        );
    }

    return <>{props.children}</>;
};

export default LoadContainer;
