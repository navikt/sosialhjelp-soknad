import {AxiosResponse} from "axios";
import {UnauthorizedMelding} from "../../../generated/model";

export const isLoginError = (response: AxiosResponse): response is AxiosResponse<UnauthorizedMelding> => {
    if (response.status !== 401) return false;

    return true;
};
