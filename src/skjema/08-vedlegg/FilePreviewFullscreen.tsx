import {Button, Modal} from "@navikt/ds-react";
import {ShrinkIcon} from "@navikt/aksel-icons";
import {isPdf} from "./LastOppFil";
import {useTranslation} from "react-i18next";

interface FullscreenModalProps {
    file: File;
    show: boolean;
    onClose: () => void;
}

const FilePreviewFullscreenDisplay = ({file}: {file: File}) =>
    isPdf(file) ? (
        <iframe src={URL.createObjectURL(file)} title="Forhåndsvisning av fil" className={"w-full h-full"} />
    ) : (
        <img
            src={URL.createObjectURL(file)}
            alt={`File preview`}
            className={"max-w-full max-h-full m-auto object-contain"}
        />
    );

export const FilePreviewFullscreen = ({file, show, onClose}: FullscreenModalProps) => {
    const {t} = useTranslation();
    return (
        <Modal open={show} onClose={onClose}>
            <Modal.Content className={"fixed inset-0"}>
                <div className={"w-fit ml-auto"}>
                    <Button variant="tertiary" onClick={onClose}>
                        <span className={"flex items-center gap-2 text-white hover:text-gray-900"}>
                            <ShrinkIcon /> {t("vedlegg.forhandsvisning.fullskjerm")}
                        </span>
                    </Button>
                </div>
                <div className={"w-full h-full flex content-center items-center overflow-auto p-4 lg:p-12 xl:p-48"}>
                    <FilePreviewFullscreenDisplay file={file} />
                </div>
            </Modal.Content>
        </Modal>
    );
};
