import * as React from "react";
import {konverterVedlegg} from "../../../generated/file-converter-controller/file-converter-controller";

type UsePDFConverterResult = {
    // En konvertering er i gang.
    conversionPending: boolean;
    // Dersom en feil oppstår under konvertering, vil denne settes.
    conversionError: Error | null;
    // Sender en gitt fil til backend for konvertering til PDF.
    convertToPDF: (file: Blob) => Promise<Blob>;
};

/**
 * React-hook for konvertering av PDF via backend.
 */
export const usePDFConverter = (): UsePDFConverterResult => {
    const [conversionPending, setConversionPending] = React.useState(false);
    const [conversionError, setConversionError] = React.useState<Error | null>(null);

    const convertToPDF = async (file: Blob): Promise<Blob> => {
        setConversionPending(true);

        return konverterVedlegg({file: file})
            .then((blob) => {
                setConversionPending(false);
                return blob;
            })
            .catch((e) => {
                setConversionError(e);
                throw e;
            })
            .finally(() => {
                setConversionPending(false);
            });
    };

    return {conversionPending, conversionError, convertToPDF};
};
