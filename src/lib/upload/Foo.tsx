import {DocumentStatus} from "./DocumentStatus.tsx";
import {DocumentFileSelector} from "./DocumentFileSelector.tsx";

export const DocumentUploadField = () => {
    const soknadId = "0865e370-3c58-429d-95d4-51aa96971e72";
    const vedleggType = "annet|annet";
    return (
        <div>
            <DocumentStatus soknadId={soknadId} vedleggType={vedleggType} />
            <DocumentFileSelector soknadId={soknadId} vedleggType={vedleggType} />
        </div>
    );
};
