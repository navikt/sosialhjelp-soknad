import * as React from "react";
import {konverterVedlegg} from "../../../generated/file-converter-controller/file-converter-controller";

type UsePDFConverterResult = {
    // En konvertering er i gang.
    conversionPending: boolean;
    // Dersom en feil oppstår under konvertering, vil denne settes.
    conversionError: Error | null;
    // Sender en gitt fil til backend for konvertering til PDF.
    convertToPDF: (file: File) => Promise<File>;
};

/**
 * @returns filnavnet uten extension
 **/
const basename = (file: File): string => {
    const idx = file.name.lastIndexOf(".");
    return idx > 0 ? file.name.substring(0, idx) : file.name;
};

/**
 * React-hook for konvertering av PDF via backend.
 */
export const usePDFConverter = (): UsePDFConverterResult => {
    const [conversionPending, setConversionPending] = React.useState(false);
    const [conversionError, setConversionError] = React.useState<Error | null>(null);

    const convertToPDF = async (file: File): Promise<File> => {
        setConversionPending(true);

        try {
            const blob = await konverterVedlegg({file: file});
            setConversionPending(false);
            return new File([blob], `${basename(file)}.pdf`, {type: "application/pdf"});
        } catch (e) {
            setConversionError(e);
            throw e;
        } finally {
            setConversionPending(false);
        }
    };

    return {conversionPending, conversionError, convertToPDF};
};
