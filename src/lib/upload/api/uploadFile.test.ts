import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {uploadFile} from "./uploadFile.ts";
import {deleteFile} from "./deleteFile.ts";

const fetchMock = vi.fn();
beforeEach(() => vi.stubGlobal("fetch", fetchMock));
afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
});

const params = {
    file: new File(["x"], "a.pdf", {type: "application/pdf"}),
    contextId: "ctx",
    correlationId: "cid",
    soknadId: "soknad-1",
    kategori: "KAT",
};
const json = (status: number, body: unknown) => new Response(JSON.stringify(body), {status});

describe("uploadFile", () => {
    it("sender multipart med riktige felt og uten fiksDigisosId", async () => {
        fetchMock.mockResolvedValue(json(201, {upload: {id: "u1", originalFilename: "a.pdf", status: "COMPLETE"}}));
        await uploadFile(params);
        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toMatch(/\/files$/);
        expect(init.method).toBe("POST");
        const form = init.body as FormData;
        expect(form.get("file")).toBeInstanceOf(File);
        expect(form.get("contextId")).toBe("ctx");
        expect(form.get("correlationId")).toBe("cid");
        expect(form.get("navEksternRefId")).toBe("soknad-1");
        expect(form.get("kategori")).toBe("KAT");
        expect(form.has("fiksDigisosId")).toBe(false);
        expect(form.has("automaticCleanup")).toBe(false);
    });

    it.each([200, 201])("tolker nestet svar for %i", async (status) => {
        fetchMock.mockResolvedValue(
            json(status, {
                upload: {id: "u1", originalFilename: "a.pdf", filId: "f1", status: "COMPLETE", correlationId: "cid"},
                submissionId: "s1",
            })
        );
        const r = await uploadFile(params);
        expect(r).toMatchObject({kind: "success", submissionId: "s1", upload: {id: "u1", filId: "f1"}});
    });

    it("422 gir validations", async () => {
        fetchMock.mockResolvedValue(json(422, {validations: ["ENCRYPTED_PDF"]}));
        expect(await uploadFile(params)).toEqual({kind: "validation", validations: ["ENCRYPTED_PDF"]});
    });
    it("502 og nettverksfeil er retryable", async () => {
        fetchMock.mockResolvedValueOnce(json(502, {stage: "x"}));
        expect(await uploadFile(params)).toEqual({kind: "retryable"});
        fetchMock.mockRejectedValueOnce(new TypeError("net"));
        expect(await uploadFile(params)).toEqual({kind: "retryable"});
    });
    it("403 og 400 mappes", async () => {
        fetchMock.mockResolvedValueOnce(new Response(null, {status: 403}));
        expect(await uploadFile(params)).toEqual({kind: "forbidden"});
        fetchMock.mockResolvedValueOnce(new Response("bad", {status: 400}));
        expect(await uploadFile(params)).toEqual({kind: "failed"});
    });
});

describe("deleteFile", () => {
    it("sender DELETE og godtar 204", async () => {
        fetchMock.mockResolvedValue(new Response(null, {status: 204}));
        await expect(deleteFile("u1")).resolves.toBeUndefined();
        expect(fetchMock.mock.calls[0][0]).toMatch(/\/files\/u1$/);
        expect(fetchMock.mock.calls[0][1].method).toBe("DELETE");
    });
    it("kaster ved 404 og 500", async () => {
        fetchMock.mockResolvedValue(new Response(null, {status: 404}));
        await expect(deleteFile("u1")).rejects.toThrow();
        fetchMock.mockResolvedValue(new Response(null, {status: 500}));
        await expect(deleteFile("u1")).rejects.toThrow();
    });
});
