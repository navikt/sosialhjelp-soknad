import {useTranslations} from "next-intl";
import React from "react";
import InlineStatusMessage from "./InlineStatusMessage.tsx";
import {ValidationCode} from "./openEventChannel.ts";

interface UploadStatusMessagesProps {
    converted: boolean;
    showSlowProcessingWarning: boolean;
    validations: ValidationCode[];
}

export const UploadStatusMessages = ({
    converted,
    showSlowProcessingWarning,
    validations,
}: UploadStatusMessagesProps) => {
    const t = useTranslations("UploadStatusMessages");

    return (
        <>
            {converted && (
                <InlineStatusMessage variant="info" role="status">
                    {t("konvertert")}
                </InlineStatusMessage>
            )}
            {showSlowProcessingWarning && (
                <InlineStatusMessage variant="info" role="status">
                    {t("processingWarning")}
                </InlineStatusMessage>
            )}
            {validations.length > 0 &&
                validations.map((error) => (
                    <InlineStatusMessage key={error} variant="error" role="alert">
                        {t(`submissionError.${error}`)}
                    </InlineStatusMessage>
                ))}
        </>
    );
};
