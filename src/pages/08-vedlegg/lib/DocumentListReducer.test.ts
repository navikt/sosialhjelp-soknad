import {beforeEach, describe, expect, it} from "vitest";
import {VedleggFrontend, VedleggFrontendType} from "../../../generated/client/model";
import {
    DocumentListAction,
    DocumentListReducer,
    DocumentListState,
    initialDocumentListState,
} from "./DocumentListReducer";

// Constants for repeated values
const DOCUMENT_TYPE = "someDocumentType" as VedleggFrontendType;
const OTHER_DOCUMENT_TYPE = "otherType" as VedleggFrontendType;
const INITIAL_DOCUMENTS: VedleggFrontend[] = [
    {
        type: DOCUMENT_TYPE,
        gruppe: "familie",
        filer: [
            {dokumentId: "1", filename: "file1"},
            {dokumentId: "2", filename: "file2"},
        ],
    },
    {type: OTHER_DOCUMENT_TYPE, gruppe: "familie", filer: [{dokumentId: "3", filename: "file3"}]},
];

describe("initialDocumentListState", () => {
    it("should initialize with the given dokumentasjonType and an empty documents array", () => {
        const state = initialDocumentListState(DOCUMENT_TYPE);
        expect(state).toEqual({
            dokumentasjonType: DOCUMENT_TYPE,
            documents: [],
        });
    });
});

describe("DocumentListReducer", () => {
    let initialState: DocumentListState;

    beforeEach(() => {
        initialState = initialDocumentListState(DOCUMENT_TYPE);
    });

    it("should initialize documents based on dokumentasjonType", () => {
        const action: DocumentListAction = {
            type: "initialize",
            data: INITIAL_DOCUMENTS,
        };
        const newState = DocumentListReducer(initialState, action);
        expect(newState.documents).toEqual([
            {dokumentId: "1", filename: "file1"},
            {dokumentId: "2", filename: "file2"},
        ]);
    });

    it("should handle initialization when dokumentasjonType does not match any documents", () => {
        const action: DocumentListAction = {
            type: "initialize",
            data: [{type: OTHER_DOCUMENT_TYPE, gruppe: "familie", filer: [{dokumentId: "4", filename: "file4"}]}],
        };
        const newState = DocumentListReducer(initialState, action);
        expect(newState.documents).toEqual([]);
    });

    it("should remove a dokument by dokumentId", () => {
        const DOC_1 = {dokumentId: "1", filename: "file1"};
        const DOC_2 = {dokumentId: "2", filename: "file2"};
        initialState = {
            ...initialState,
            documents: [DOC_1, DOC_2],
        };
        const newState = DocumentListReducer(initialState, {type: "remove", dokumentId: "1"});
        expect(newState.documents).not.toContain(DOC_1);
        expect(newState.documents).toContain(DOC_2);
    });

    it("should not change documents if the uuid to remove does not exist", () => {
        initialState = {
            ...initialState,
            documents: [
                {dokumentId: "1", filename: "file1"},
                {dokumentId: "2", filename: "file2"},
            ],
        };
        const action: DocumentListAction = {
            type: "remove",
            dokumentId: "3",
        };
        const newState = DocumentListReducer(initialState, action);
        expect(newState.documents).toEqual([
            {dokumentId: "1", filename: "file1"},
            {dokumentId: "2", filename: "file2"},
        ]);
    });

    it("should insert a new dokument", () => {
        const newDocument = {dokumentId: "3", filename: "file3"};
        const action: DocumentListAction = {
            type: "insert",
            dokument: newDocument,
        };
        const newState = DocumentListReducer(initialState, action);
        expect(newState.documents).toEqual([newDocument]);
    });

    it("should insert a new dokument into an existing documents array", () => {
        initialState = {
            ...initialState,
            documents: [{dokumentId: "1", filename: "file1"}],
        };
        const newDocument = {dokumentId: "2", filename: "file2"};
        const action: DocumentListAction = {
            type: "insert",
            dokument: newDocument,
        };
        const newState = DocumentListReducer(initialState, action);
        expect(newState.documents).toEqual([
            {dokumentId: "1", filename: "file1"},
            {dokumentId: "2", filename: "file2"},
        ]);
    });

    it("should not mutate the original state", () => {
        const action: DocumentListAction = {
            type: "insert",
            dokument: {dokumentId: "3", filename: "file3"},
        };
        const originalState = {...initialState};
        DocumentListReducer(initialState, action);
        expect(initialState).toEqual(originalState);
    });
});
