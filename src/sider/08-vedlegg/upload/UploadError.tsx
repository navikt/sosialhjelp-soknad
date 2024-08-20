import {useTranslation} from "react-i18next";
import {Alert, BodyShort, Button, Detail, Heading} from "@navikt/ds-react";
import * as React from "react";

// An error occured during the conversion of a file to PDF.
export class PdfConversionError extends Error {}

// PDF is encrypted and cannot be displayed.
export class PdfEncryptionError extends Error {}

// PDF could not be loaded.
export class PdfLoadError extends Error {}

type ErrorClassType = new (...args: any[]) => Error;

const USER_ERROR_LIST: readonly ErrorClassType[] = [PdfEncryptionError] as const;

export const UploadError = ({error, resetError}: {error: Error; resetError: () => void}) => {
    const {t} = useTranslation();

    /**
     * If the fault is on our side, we display a footer saying the problem has been logged
     * and will be adressed. If the fault is on the user's side, that doesn't make sense.
     * @returns true if the error is caused by the user.
     */
    const isUserError = (e: Error) => USER_ERROR_LIST.some((errorClass) => e instanceof errorClass);

    /** Map the error to i18next keys, either a specific error message or a general one. */
    const getErrorKey = (error: Error) => {
        if (error instanceof PdfConversionError) {
            return "opplysninger.vedlegg.feil.konvertering";
        } else if (error instanceof PdfEncryptionError) {
            return "opplysninger.vedlegg.feil.kryptering";
        } else {
            return "opplysninger.vedlegg.feil.ukjent";
        }
    };

    return (
        <Alert variant={"error"}>
            <Heading size={"small"} spacing>
                {t("opplysninger.vedlegg.feil.tittel")}
            </Heading>
            <BodyShort spacing>{t(getErrorKey(error))}</BodyShort>
            {!isUserError(error) && <Detail spacing>{t("opplysninger.vedlegg.feil.footer")}</Detail>}
            <Button onClick={resetError}>{t("opplysninger.vedlegg.feil.retry")}</Button>
        </Alert>
    );
};
