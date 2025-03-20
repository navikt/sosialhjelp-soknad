import {getTusUploader} from "./getTusUploader.ts";
import {useMemo, useState} from "react";
import {VedleggFrontendTypeMinusUferdig} from "../../locales/en/dokumentasjon.ts";
import {DocumentStatus} from "./DocumentStatus.tsx";
import {Button} from "@navikt/ds-react";

export const DocumentUploadField = () => {
    const soknadId = "0865e370-3c58-429d-95d4-51aa96971e72";
    const vedleggType = "annesstss" as unknown as VedleggFrontendTypeMinusUferdig;
    return (
        <div>
            <DocumentStatus soknadId={soknadId} vedleggType={vedleggType} />
            <DocumentFileSelector soknadId={soknadId} vedleggType={vedleggType} />
        </div>
    );
};

export const DocumentFileSelector = ({
    soknadId,
    vedleggType,
}: {
    soknadId: string;
    vedleggType: VedleggFrontendTypeMinusUferdig;
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const totalFileSize = useMemo(() => files.reduce((acc, file) => acc + file.size, 0), [files]);
    const [currentUploadProgress, setCurrentUploadProgress] = useState(0);
    const [totalProgress, setTotalProgress] = useState(0);
    const [filesUploaded, setFilesUploaded] = useState(0);
    const progressPercent = ((totalProgress + currentUploadProgress) / totalFileSize) * 100;

    const startUpload = async () => {
        await Promise.all(
            files.map(async (file) =>
                getTusUploader({
                    soknadId,
                    vedleggType,
                    file,
                    onProgress: (uploaded) => setCurrentUploadProgress(uploaded),
                    onUploadUrlAvailable: () => {},
                    onSuccess: () => {
                        setTotalProgress((total) => total + file.size);
                        setFilesUploaded((uploaded) => uploaded + 1);
                        setCurrentUploadProgress(0);
                    },
                }).start()
            )
        );
    };

    return (
        <div className={"p-4 space-y-2"}>
            <h1>Upload</h1>
            <input
                type={"file"}
                multiple
                onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : [])}
            />
            <div>
                <Button onClick={startUpload}>Start</Button>
            </div>
            <pre>
                {filesUploaded} of {files.length} file(s), {progressPercent.toFixed(0)}%
            </pre>
        </div>
    );
};
