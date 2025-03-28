import {OpplysningsType} from "../../../lib/hooks/dokumentasjon/useGrupper";
import {DokumentasjonDto, DokumentDto} from "../../../generated/new/model";

export type DocumentListState = {
    dokumentasjonType: OpplysningsType;
    documents: DokumentDto[];
};

export const initialDocumentListState = (dokumentasjonType: OpplysningsType): DocumentListState => ({
    dokumentasjonType,
    documents: [],
});

const findMutableDokumentListeOrEmptyByDokumentasjonType = (
    dokumentasjon: DokumentasjonDto[] | undefined,
    dokumentasjonType: OpplysningsType
) => [...(dokumentasjon?.find(({type}) => type.value === dokumentasjonType)?.dokumenter ?? [])];

export type DocumentListAction =
    | {type: "remove"; dokumentId: string}
    | {type: "insert"; dokument: DokumentDto}
    | {type: "initialize"; data: DokumentasjonDto[] | undefined};

export const DocumentListReducer = (state: DocumentListState, action: DocumentListAction): DocumentListState => {
    switch (action.type) {
        case "initialize": {
            const documents = findMutableDokumentListeOrEmptyByDokumentasjonType(action.data, state.dokumentasjonType);

            return {...state, documents};
        }
        case "remove": {
            const documents = state.documents.filter(({dokumentId}) => dokumentId !== action.dokumentId);
            return {...state, documents};
        }
        case "insert": {
            return {...state, documents: [...state.documents, action.dokument]};
        }
    }
};
