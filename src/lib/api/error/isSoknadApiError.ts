import {SoknadApiError, SoknadApiErrorResponseType} from "../../../generated/model";

export const isSoknadApiError = (reason: any): reason is SoknadApiError =>
    reason?.["responseType"] == SoknadApiErrorResponseType.SoknadApiError;
