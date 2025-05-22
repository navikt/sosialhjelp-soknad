import {AxiosResponse} from "axios";
import {UnauthorizedMelding} from "../../../generated/model";

export const isLoginError = (response: AxiosResponse): response is AxiosResponse<UnauthorizedMelding> =>
    response.status === 401;
