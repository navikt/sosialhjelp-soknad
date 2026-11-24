import {beforeEach, describe, expect, it, vi} from "vitest";
import {act, renderHook, waitFor} from "@testing-library/react";
import type {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {DocumentProvider} from "./DocumentContext.tsx";
import {useVedleggUpload} from "./useVedleggUpload.ts";
import {UploadFileResult} from "./api/uploadFile.ts";
import {DokumentasjonDtoType} from "../../generated/model";

const uploadMock = vi.fn();
const deleteMock = vi.fn();
const statusMock = vi.fn();
vi.mock("./api/uploadFile.ts", () => ({uploadFile: (p: unknown) => uploadMock(p)}));
vi.mock("./api/deleteFile.ts", () => ({deleteFile: (id: string) => deleteMock(id)}));
vi.mock("./api/fetchSubmissionStatus.ts", () => ({fetchSubmissionStatus: (c: string) => statusMock(c)}));
vi.mock("./tusUpload.ts", () => ({uploadFile: vi.fn(() => "tus-id")}));
vi.mock("./openEventChannel.ts", async (orig) => ({
    ...(await orig<object>()),
    openEventChannel: vi.fn(() => () => undefined),
}));

let queryClient: QueryClient;
const wrapper = ({children}: {children: ReactNode}) => (
    <QueryClientProvider client={queryClient}>
        <DocumentProvider contextId="ctx" mode="sync">
            {children}
        </DocumentProvider>
    </QueryClientProvider>
);
const setup = () =>
    renderHook(
        () => useVedleggUpload({contextId: "ctx", soknadId: "s1", kategori: "k" as unknown as DokumentasjonDtoType}),
        {wrapper}
    );
const files = (n: number) =>
    Array.from({length: n}, (_, i) => ({file: new File(["data"], `f${i}.pdf`, {type: "application/pdf"})}) as never);

const deferred = () => {
    let resolve!: (r: UploadFileResult) => void;
    const promise = new Promise<UploadFileResult>((r) => (resolve = r));
    return {promise, resolve};
};
const ok = (cid: string, id = "srv-" + cid): UploadFileResult => ({
    kind: "success",
    submissionId: "sub",
    upload: {id, correlationId: cid, filId: "f", originalFilename: "x", converted: false, status: "COMPLETE"},
});

beforeEach(() => {
    queryClient = new QueryClient();
    uploadMock.mockReset();
    deleteMock.mockReset();
    statusMock.mockReset();
    statusMock.mockResolvedValue({kind: "ok", state: {submissionId: ""}});
});

describe("sync-modus", () => {
    it("starter alle opplastinger umiddelbart", async () => {
        uploadMock.mockImplementation(() => new Promise(() => undefined));
        const {result} = setup();
        act(() => result.current.onSelect(files(3)));
        await waitFor(() => expect(uploadMock).toHaveBeenCalledTimes(3));
        expect(result.current.hasPendingOrProcessing).toBe(true);
    });

    it("rapporterer valideringsfeil på raden", async () => {
        uploadMock.mockResolvedValueOnce({kind: "validation", validations: ["ENCRYPTED_PDF"]});
        const {result} = setup();
        act(() => result.current.onSelect(files(1)));
        await waitFor(() => expect(result.current.uploads[0].status).toBe("FAILED"));
        expect(result.current.uploads[0].validations).toEqual(["ENCRYPTED_PDF"]);
        expect(result.current.uploads[0].originalFilename).toBe("f0.pdf");
    });

    it("setter FAILED ved retry etter at mutasjonen er garbage-collected", async () => {
        uploadMock.mockResolvedValueOnce({kind: "retryable"});
        const {result} = setup();
        act(() => result.current.onSelect(files(1)));
        await waitFor(() => expect(result.current.uploads[0].status).toBe("RETRYABLE_FAILED"));
        queryClient.getMutationCache().clear();
        act(() => result.current.retryUpload(result.current.uploads[0].correlationId!));
        expect(result.current.uploads[0].status).toBe("FAILED");
        expect(uploadMock).toHaveBeenCalledTimes(1);
    });

    it("prøver igjen med samme correlationId og samme fil", async () => {
        uploadMock.mockResolvedValueOnce({kind: "retryable"});
        const {result} = setup();
        act(() => result.current.onSelect(files(1)));
        await waitFor(() => expect(result.current.uploads[0].status).toBe("RETRYABLE_FAILED"));
        const first = uploadMock.mock.calls[0][0];
        uploadMock.mockResolvedValueOnce(ok(first.correlationId));
        act(() => result.current.retryUpload(first.correlationId));
        await waitFor(() => expect(result.current.uploads[0].status).toBe("COMPLETE"));
        const second = uploadMock.mock.calls[1][0];
        expect(second.correlationId).toBe(first.correlationId);
        expect(second.file).toBe(first.file);
    });

    it("sletter lagret rad via deleteFile og fjerner den", async () => {
        uploadMock.mockImplementation(async (p) => ok(p.correlationId, "srv1"));
        deleteMock.mockResolvedValue(undefined);
        const {result} = setup();
        act(() => result.current.onSelect(files(1)));
        await waitFor(() => expect(result.current.uploads[0].id).toBe("srv1"));
        await act(() => result.current.onDelete(result.current.uploads[0]));
        expect(deleteMock).toHaveBeenCalledWith("srv1");
        expect(result.current.uploads).toHaveLength(0);
    });

    it("beholder raden når sletting feiler", async () => {
        uploadMock.mockImplementation(async (p) => ok(p.correlationId, "srv1"));
        deleteMock.mockRejectedValue(new Error("nei"));
        const {result} = setup();
        act(() => result.current.onSelect(files(1)));
        await waitFor(() => expect(result.current.uploads[0].id).toBe("srv1"));
        await expect(result.current.onDelete(result.current.uploads[0])).rejects.toThrow();
        expect(result.current.uploads).toHaveLength(1);
    });

    it("plassholder fjernes uten backend-kall; pågående opplasting ryddes etter svar", async () => {
        const d = deferred();
        uploadMock.mockReturnValueOnce(d.promise);
        deleteMock.mockResolvedValue(undefined);
        const {result} = setup();
        act(() => result.current.onSelect(files(1)));
        await act(() => result.current.onDelete(result.current.uploads[0]));
        expect(result.current.uploads).toHaveLength(0);
        expect(deleteMock).not.toHaveBeenCalled();
        await act(async () => d.resolve(ok(uploadMock.mock.calls[0][0].correlationId, "srv9")));
        await waitFor(() => expect(deleteMock).toHaveBeenCalledWith("srv9"));
    });

    it("legacy-dokument uten correlationId slettes ikke via sync deleteFile", async () => {
        const {result} = setup();
        await act(() =>
            result.current.onDelete({id: "doc", originalFilename: "a", status: "COMPLETE", converted: false})
        );
        expect(deleteMock).not.toHaveBeenCalled();
    });
});
