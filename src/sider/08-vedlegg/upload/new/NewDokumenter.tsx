import {
    FileUpload,
    // VStack
} from "@navikt/ds-react";
// import Button from "react-scroll/modules/components/Button";

export const NewDokumenter = () => {
    const MAX_SIZE = 10;
    const MAX_SIZE_MB = MAX_SIZE / 1024 / 1024;
    // const MAX_FILES = 3;

    return (
        <FileUpload>
            <FileUpload.Dropzone
                label="Last opp filer til søknaden"
                description={`Du kan laste opp Word- og PDF-filer. Maks 3 filer. Maks størrelse ${MAX_SIZE_MB} MB.`}
                accept=".doc,.docx,.pdf"
                maxSizeInBytes={MAX_SIZE}
                onSelect={() => {}}
            />
            {/* <FileUpload.Trigger accept=".pdf,.doc,.docx" maxSizeInBytes={1_000_000} onSelect={console.info}>
                <Button aria-describedby={`${labelId} ${descId}`} variant="secondary" icon={<UploadIcon aria-hidden />}>
                    Velg filer
                </Button>
            </FileUpload.Trigger> */}
            {/* <VStack as="ul">
                <FileUpload.Item
                    as="li"
                    file={{name: "Søknad.pdf", size: 1_000_000, type: "application/pdf"}}
                ></FileUpload.Item>
            </VStack> */}
        </FileUpload>
    );
};
