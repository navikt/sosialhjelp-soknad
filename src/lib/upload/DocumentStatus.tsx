import {UploadState, useDocumentState} from "./useDocumentState.ts";
import {UPLOAD_IMG_BASE} from "./config.ts";
import {FileCheckmarkIcon} from "@navikt/aksel-icons";

export const DocumentStatus = ({soknadId, vedleggType}: {soknadId: string; vedleggType: string}) => {
    const foo = useDocumentState(soknadId, vedleggType);
    return (
        <div className={"p-4"}>
            <h1>Preview</h1>
            <pre>{JSON.stringify(foo, null, 2)}</pre>
            <div className={"flex gap-4 overflow-scroll"}>
                {Object.entries(foo?.uploads ?? {})
                    .filter(([_, upload]) => upload.pages.length)
                    .map(([uploadId, upload]: [string, UploadState]) => (
                        <div key={uploadId} className={"p-2 bg-gray-200 rounded"}>
                            <h2>
                                <FileCheckmarkIcon className={"inline"} /> {upload.originalFilename}
                            </h2>
                            <div className={"flex flex-nowrap gap-2"}>
                                {upload.pages.map((page, i) => (
                                    <div className={"w-60 min-h-40 bg-white"} key={`${uploadId}-${i}`}>
                                        {page.thumbnail && (
                                            <img
                                                src={`${UPLOAD_IMG_BASE}/thumbnails/${page.thumbnail}`}
                                                alt={`Page ${i}`}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
