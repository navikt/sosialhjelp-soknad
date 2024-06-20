import {DokumentUpload, VedleggFrontend, VedleggFrontendType} from "../../../generated/model";

export type DocumentListState = {
    dokumentasjonType: VedleggFrontendType;
    documents: DokumentUpload[];
};

export const initialDocumentListState = (dokumentasjonType: VedleggFrontendType): DocumentListState => ({
    dokumentasjonType,
    documents: [],
});

const findMutableDokumentListeOrEmptyByDokumentasjonType = (
    dokumentasjon: VedleggFrontend[] | undefined,
    dokumentasjonType: VedleggFrontendType
) => [...(dokumentasjon?.find(({type}) => type === dokumentasjonType)?.filer ?? [])];

export type DocumentListAction =
    | {type: "remove"; dokumentId: string}
    | {type: "insert"; dokument: DokumentUpload}
    | {type: "initialize"; data: VedleggFrontend[] | undefined};

// Delete me after backend upgrade
const modernize = (upload: DokumentUpload | {dokumentId: undefined; uuid: string; filNavn: string}): DokumentUpload => {
    if (typeof upload?.dokumentId === "string") {
        return upload;
    } else {
        return {dokumentId: upload.uuid, filename: upload.filNavn};
    }
};

export const DocumentListReducer = (state: DocumentListState, action: DocumentListAction): DocumentListState => {
    switch (action.type) {
        case "initialize": {
            const documents = findMutableDokumentListeOrEmptyByDokumentasjonType(action.data, state.dokumentasjonType);

            // The modernize() is for backwards compatibility. Can be deleted as soon as backend sends DokumentUpload with dokumentId.
            return {...state, documents: documents.map(modernize)};
        }
        case "remove": {
            const documents = state.documents.filter(({dokumentId}) => dokumentId !== action.dokumentId);
            return {...state, documents};
        }
        case "insert": {
            return {...state, documents: [...state.documents, modernize(action.dokument)]};
        }
    }
};
