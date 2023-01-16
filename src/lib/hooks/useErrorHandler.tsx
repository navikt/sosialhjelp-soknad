import {useDispatch} from "react-redux";
import {AxiosError} from "axios";
import {logError} from "../../nav-soknad/utils/loggerUtils";
import {setShowServerError} from "../../digisos/redux/soknad/soknadActions";
import * as React from "react";

// This is a hook returning a function because we need to useDispatch for now
export const useErrorHandler = () => {
    const dispatch = useDispatch();

    return (error: any) => {
        if (error instanceof AxiosError && error.response?.status === 401) {
            window.location.href = "/sosialhjelp/soknad/informasjon";
            return <></>;
        }
        logError(error.message);
        dispatch(setShowServerError(true));
        return <></>;
    };
};
