import {digisosConfig} from "../../../config.ts";
import {DocumentState} from "../openEventChannel.ts";

export type SubmissionStatusResult =
    {kind: "ok"; state: DocumentState & {submissionId: string}} | {kind: "forbidden"} | {kind: "error"};

export const fetchSubmissionStatus = async (contextId: string): Promise<SubmissionStatusResult> => {
    try {
        const response = await fetch(
            `${digisosConfig.uploadBaseURL}/submission/context/${encodeURIComponent(contextId)}`
        );
        if (response.status === 403) return {kind: "forbidden"};
        if (!response.ok) return {kind: "error"};
        const body = (await response.json()) as DocumentState;
        return {kind: "ok", state: {...body, submissionId: body.submissionId ?? ""}};
    } catch {
        return {kind: "error"};
    }
};
