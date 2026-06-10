import {Button, FileObject, FileUpload, VStack} from "@navikt/ds-react";
import {useMediaQuery} from "usehooks-ts";
import {UploadIcon} from "@navikt/aksel-icons";
import {useState} from "react";

const MAX_FILES = 10;
const MAX_SIZE_MB = 10 * 1024 * 1024;

interface Props {
    describedBy: string;
}

export const NewDokumenter = ({describedBy}: Props) => {
    const isMobile = useMediaQuery("(min-width: 768px)");
    const [filer, setFiler] = useState<FileObject[]>([]);
    return (
        <FileUpload>
            {isMobile && (
                <FileUpload.Dropzone
                    label="Last opp filer til søknaden"
                    description={`Du kan laste opp Word- og PDF-filer. Maks 3 filer. Maks størrelse ${MAX_SIZE_MB} MB.`}
                    accept=".doc,.docx,.pdf"
                    fileLimit={{max: MAX_FILES, current: filer.length}}
                    maxSizeInBytes={MAX_SIZE_MB}
                    onSelect={setFiler}
                />
            )}
            {!isMobile && (
                <FileUpload.Trigger accept=".pdf,.doc,.docx" maxSizeInBytes={MAX_SIZE_MB} onSelect={setFiler}>
                    <Button aria-describedby={describedBy} variant="secondary" icon={<UploadIcon aria-hidden />}>
                        Velg filer
                    </Button>
                </FileUpload.Trigger>
            )}
            {filer.length > 0 && (
                <VStack as="ul">
                    {filer.map((fil, index) => (
                        <FileUpload.Item
                            key={index}
                            as="li"
                            file={{name: fil.file.name, size: fil.file.size, type: fil.file.type}}
                        />
                    ))}
                </VStack>
            )}
        </FileUpload>
    );
};
