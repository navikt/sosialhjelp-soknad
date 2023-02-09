import {ReactElement, useState} from "react";
import {fetchToJson} from "./nav-soknad/utils/rest-utils";
import {setShowServerError} from "./digisos/redux/soknad/soknadActions";
import {useDispatch} from "react-redux";
import {logError} from "./nav-soknad/utils/loggerUtils";
import {AxiosError} from "axios";

// Til vi har funnet en gjennomtestet måte å løse dette på med orval/query,
// fyrer jeg bare av en request med det gamle REST-biblioteket som håndterer.
export const RedirectHack = ({children}: {children: ReactElement}) => {
    const [kosher, setKosher] = useState<boolean>(false);
    const dispatch = useDispatch();

    // I use feature-toggle because it's more or less a place-holder
    // on the backend and so not computationally expensive
    fetchToJson<any>("feature-toggle")
        .then(() => setKosher(true))
        .catch((e: AxiosError) => {
            setTimeout(() => {
                logError(
                    `${e.response && `HTTP ${e.response.status} `}${
                        e.message
                    } i RedirectHack, viser feilmelding og gir opp!`
                );
                setKosher(true);
                dispatch(setShowServerError(true));
            }, 2000);
        });

    return kosher ? children : null;
};
