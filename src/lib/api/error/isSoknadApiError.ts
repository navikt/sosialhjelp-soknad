import {SoknadApiError, SoknadApiErrorResponseType} from "../../../generated/client/model";

export const isSoknadApiError = (reason: any): reason is SoknadApiError =>
    reason?.["responseType"] == SoknadApiErrorResponseType.SoknadApiError;
