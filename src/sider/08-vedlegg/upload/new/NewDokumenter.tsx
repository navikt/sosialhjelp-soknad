import {Button, FileUpload, VStack} from "@navikt/ds-react";
import {useMediaQuery} from "usehooks-ts";
import {UploadIcon} from "@navikt/aksel-icons";
import useDocumentState from "./useDocumentState.ts";

const MAX_FILES = 10;
const MAX_SIZE_MB = 10 * 1024 * 1024;

interface Props {
    describedBy: string;
    contextId: string;
}

export const NewDokumenter = ({describedBy, contextId}: Props) => {
    const isMobile = useMediaQuery("(min-width: 768px)");
    const {documentState} = useDocumentState(contextId);

    return (
        <FileUpload>
            {isMobile && (
                <FileUpload.Dropzone
                    label="Last opp filer til søknaden"
                    description={`Du kan laste opp Word- og PDF-filer. Maks 3 filer. Maks størrelse ${MAX_SIZE_MB} MB.`}
                    accept=".doc,.docx,.pdf"
                    fileLimit={{max: MAX_FILES, current: documentState?.uploads?.length ?? 0}}
                    maxSizeInBytes={MAX_SIZE_MB}
                    onSelect={() => {}}
                />
            )}
            {!isMobile && (
                <FileUpload.Trigger accept=".pdf,.doc,.docx" maxSizeInBytes={MAX_SIZE_MB} onSelect={() => {}}>
                    <Button aria-describedby={describedBy} variant="secondary" icon={<UploadIcon aria-hidden />}>
                        Velg filer
                    </Button>
                </FileUpload.Trigger>
            )}
            {(documentState?.uploads?.length ?? 0) > 0 && (
                <VStack as="ul">
                    {documentState?.uploads?.map((fil, index) => (
                        <FileUpload.Item key={index} as="li" file={{name: fil.finalFilename ?? "", size: fil.size}} />
                    ))}
                </VStack>
            )}
        </FileUpload>
    );
};
