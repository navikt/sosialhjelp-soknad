import {AxiosResponse} from "axios";
import {UnauthorizedMelding} from "../../../generated/model";

export const isLoginError = (response: AxiosResponse): response is AxiosResponse<UnauthorizedMelding> => {
    const is401 = response.status === 401;
    if (is401 && !response.data?.loginUrl) throw new Error("Missing loginUrl in 401 response");
    return is401;
};
