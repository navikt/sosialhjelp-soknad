import {digisosConfig} from "../../config.ts";
import {UploadState, ValidationCode} from "../openEventChannel.ts";

export type UploadFileParams = {
    file: File;
    contextId: string;
    correlationId: string;
    soknadId: string;
    kategori: string;
};

export type UploadFileResult =
    | {kind: "success"; upload: UploadState; submissionId: string}
    | {kind: "validation"; validations: ValidationCode[]}
    /** 502 eller nettverksfeil. Trygt å prøve igjen med samme correlationId. */
    | {kind: "retryable"}
    | {kind: "forbidden"}
    | {kind: "failed"};

type UploadDto = {
    id: string;
    originalFilename: string;
    finalFilename?: string;
    filId?: string;
    status: UploadState["status"];
    url?: string;
    size?: number;
    correlationId?: string;
    converted?: boolean;
    validations?: ValidationCode[];
};

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

const readJson = async (response: Response): Promise<unknown> => {
    try {
        return await response.json();
    } catch {
        return undefined;
    }
};

export const uploadFile = async ({
    file,
    contextId,
    correlationId,
    soknadId,
    kategori,
}: UploadFileParams): Promise<UploadFileResult> => {
    const form = new FormData();
    form.append("file", file);
    form.append("contextId", contextId);
    form.append("correlationId", correlationId);
    form.append("navEksternRefId", soknadId);
    form.append("kategori", kategori);

    let response: Response;
    try {
        response = await fetch(`${digisosConfig.uploadBaseURL}/files`, {method: "POST", body: form});
    } catch {
        return {kind: "retryable"};
    }

    if (response.status === 200 || response.status === 201) {
        const body = await readJson(response);
        if (!isRecord(body) || !isRecord(body.upload)) return {kind: "failed"};
        const dto = body.upload as unknown as UploadDto;
        return {
            kind: "success",
            submissionId: typeof body.submissionId === "string" ? body.submissionId : "",
            upload: {
                id: dto.id,
                originalFilename: dto.originalFilename,
                finalFilename: dto.finalFilename,
                filId: dto.filId,
                status: dto.status ?? "COMPLETE",
                url: dto.url,
                size: dto.size,
                correlationId: dto.correlationId ?? correlationId,
                converted: dto.converted ?? false,
                validations: dto.validations,
            },
        };
    }
    if (response.status === 422) {
        const body = await readJson(response);
        const validations = isRecord(body) && Array.isArray(body.validations) ? body.validations : [];
        return {kind: "validation", validations: validations as ValidationCode[]};
    }
    if (response.status === 413) return {kind: "validation", validations: [ValidationCode.FILE_TOO_LARGE]};
    if (response.status === 502) return {kind: "retryable"};
    if (response.status === 403) return {kind: "forbidden"};
    return {kind: "failed"};
};
