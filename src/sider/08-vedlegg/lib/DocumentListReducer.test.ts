import {beforeEach, describe, expect, it} from "vitest";
import {
    DocumentListAction,
    DocumentListReducer,
    DocumentListState,
    initialDocumentListState,
} from "./DocumentListReducer";
import {DokumentasjonDto, DokumentasjonDtoType} from "../../../generated/new/model";

// Constants for repeated values
const DOCUMENT_TYPE: DokumentasjonDtoType = "FORMUE_BRUKSKONTO";
const OTHER_DOCUMENT_TYPE: DokumentasjonDtoType = "JOBB";
const INITIAL_DOCUMENTS: DokumentasjonDto[] = [
    {
        type: DOCUMENT_TYPE,
        gruppe: "generelle vedlegg",
        dokumentasjonStatus: "FORVENTET",
        dokumenter: [
            {dokumentId: "1", filnavn: "file1"},
            {dokumentId: "2", filnavn: "file2"},
        ],
    },
    {
        type: OTHER_DOCUMENT_TYPE,
        gruppe: "generelle vedlegg",
        dokumenter: [{dokumentId: "3", filnavn: "file3"}],
        dokumentasjonStatus: "FORVENTET",
    },
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
            {dokumentId: "1", filnavn: "file1"},
            {dokumentId: "2", filnavn: "file2"},
        ]);
    });

    it("should handle initialization when dokumentasjonType does not match any documents", () => {
        const action: DocumentListAction = {
            type: "initialize",
            data: [
                {
                    type: OTHER_DOCUMENT_TYPE,
                    gruppe: "familie",
                    dokumenter: [{dokumentId: "4", filnavn: "file4"}],
                    dokumentasjonStatus: "FORVENTET",
                },
            ],
        };
        const newState = DocumentListReducer(initialState, action);
        expect(newState.documents).toEqual([]);
    });

    it("should remove a dokument by dokumentId", () => {
        const DOC_1 = {dokumentId: "1", filnavn: "file1"};
        const DOC_2 = {dokumentId: "2", filnavn: "file2"};
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
                {dokumentId: "1", filnavn: "file1"},
                {dokumentId: "2", filnavn: "file2"},
            ],
        };
        const action: DocumentListAction = {
            type: "remove",
            dokumentId: "3",
        };
        const newState = DocumentListReducer(initialState, action);
        expect(newState.documents).toEqual([
            {dokumentId: "1", filnavn: "file1"},
            {dokumentId: "2", filnavn: "file2"},
        ]);
    });

    it("should insert a new dokument", () => {
        const newDocument = {dokumentId: "3", filnavn: "file3"};
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
            documents: [{dokumentId: "1", filnavn: "file1"}],
        };
        const newDocument = {dokumentId: "2", filnavn: "file2"};
        const action: DocumentListAction = {
            type: "insert",
            dokument: newDocument,
        };
        const newState = DocumentListReducer(initialState, action);
        expect(newState.documents).toEqual([
            {dokumentId: "1", filnavn: "file1"},
            {dokumentId: "2", filnavn: "file2"},
        ]);
    });

    it("should not mutate the original state", () => {
        const action: DocumentListAction = {
            type: "insert",
            dokument: {dokumentId: "3", filnavn: "file3"},
        };
        const originalState = {...initialState};
        DocumentListReducer(initialState, action);
        expect(initialState).toEqual(originalState);
    });
});
