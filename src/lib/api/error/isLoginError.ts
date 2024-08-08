import {AxiosResponse} from "axios";
import {UnauthorizedMelding} from "../../../generated/client/model";

export const isLoginError = (response: AxiosResponse): response is AxiosResponse<UnauthorizedMelding> => {
    if (response.status !== 401) return false;

    if (!response.data?.loginUrl) throw new Error("Missing loginUrl in 401 response");

    return true;
};
