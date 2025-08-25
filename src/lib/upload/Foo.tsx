import {DocumentStatus} from "./DocumentStatus.tsx";
import {DocumentFileSelector} from "./DocumentFileSelector.tsx";
import type {DokumentasjonDtoType} from "../../generated/new/model";

export const DocumentUploadField = () => {
    const soknadId = "0865e370-3c58-429d-95d4-51aa96971e72";
    const vedleggType: DokumentasjonDtoType = "UTGIFTER_ANDRE_UTGIFTER";
    return (
        <div>
            <DocumentStatus soknadId={soknadId} vedleggType={vedleggType} />
            <DocumentFileSelector soknadId={soknadId} vedleggType={vedleggType} />
        </div>
    );
};
