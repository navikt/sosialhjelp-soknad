import {VedleggFrontendTypeMinusUferdig} from "../../locales/en/dokumentasjon.ts";
import {useMemo, useState} from "react";
import {getTusUploader} from "./getTusUploader.ts";
import {Button} from "@navikt/ds-react";
import {UPLOAD_API_BASE} from "./config.ts";
import digisosConfig from "../config.ts";

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
    const progressPercent = totalFileSize ? ((totalProgress + currentUploadProgress) / totalFileSize) * 100 : 0;

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
            <div className={"flex gap-2"}>
                <Button onClick={startUpload}>Start</Button>
                <Button
                    onClick={async () => {
                        const res = await fetch(`${UPLOAD_API_BASE}/document/${soknadId}/${vedleggType}/submit`, {
                            method: "POST",
                            body: JSON.stringify({
                                targetUrl: `${digisosConfig.baseURL}/opplastetVedlegg/${soknadId}/${encodeURI(vedleggType)}`,
                            }),
                        });

                        if (!res.ok) {
                            console.error("Failed to submit", res);
                            return;
                        }
                    }}
                >
                    Vis flettet PDF
                </Button>
            </div>
            <pre>
                {filesUploaded} of {files.length} file(s), {progressPercent.toFixed(0)}%
            </pre>
        </div>
    );
};
