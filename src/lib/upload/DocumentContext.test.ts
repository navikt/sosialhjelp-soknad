import {describe, expect, it} from "vitest";
import {initialState, reducer} from "./DocumentContext.tsx";
import {UploadState} from "./openEventChannel.ts";

const row = (o: Partial<UploadState>): UploadState => ({
    id: "x",
    originalFilename: "f",
    converted: false,
    status: "COMPLETE",
    ...o,
});

describe("reducer", () => {
    it("UPLOAD_RESULT erstatter plassholder via correlationId", () => {
        const state = {...initialState, uploads: [row({id: "c1", correlationId: "c1", status: "PENDING"})]};
        const next = reducer(state, {
            type: "UPLOAD_RESULT",
            correlationId: "c1",
            upload: row({id: "srv", correlationId: "c1", filId: "f"}),
        });
        expect(next.uploads).toEqual([expect.objectContaining({id: "srv", filId: "f"})]);
    });
    it("UPLOAD_RESULT ignoreres om raden er fjernet", () => {
        expect(
            reducer(initialState, {type: "UPLOAD_RESULT", correlationId: "c1", upload: row({correlationId: "c1"})})
        ).toBe(initialState);
    });
    it("REFRESH tar serverliste og beholder klientplassholdere", () => {
        const state = {
            ...initialState,
            uploads: [
                row({id: "c1", correlationId: "c1", status: "PENDING"}),
                row({id: "old", filId: "f0", correlationId: "c0"}),
            ],
        };
        const next = reducer(state, {
            type: "REFRESH",
            payload: {submissionId: "s", uploads: [row({id: "s1", filId: "f1", correlationId: "c9"})]},
        });
        expect(next.uploads.map((u) => u.id)).toEqual(["s1", "c1"]);
    });
    it("REFRESH dedupliserer plassholder som serveren allerede har", () => {
        const state = {...initialState, uploads: [row({id: "c1", correlationId: "c1", status: "PENDING"})]};
        const next = reducer(state, {
            type: "REFRESH",
            payload: {submissionId: "s", uploads: [row({id: "s1", filId: "f", correlationId: "c1"})]},
        });
        expect(next.uploads.map((u) => u.id)).toEqual(["s1"]);
    });
    it("REFRESH med tom submissionId beholder state", () => {
        const state = {...initialState, uploads: [row({id: "c1", correlationId: "c1"})]};
        expect(reducer(state, {type: "REFRESH", payload: {submissionId: "", uploads: []}})).toBe(state);
    });
});
