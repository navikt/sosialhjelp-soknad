import {BodyLong, Heading, Link} from "@navikt/ds-react";
import {isAxiosError} from "axios";
import {useLocale, useTranslations} from "next-intl";
import digisosConfig from "../../lib/config";
import {
    InnsendingFeiletError,
    SendSoknad400,
    SoknadApiError,
    SoknadApiErrorError,
    UnauthorizedMelding,
} from "../../generated/model";
import {ErrorType} from "../../lib/api/axiosInstance.ts";
import * as React from "react";

type InnsendingError = SendSoknad400 | UnauthorizedMelding | SoknadApiError | InnsendingFeiletError | null;

function extractDeletionDate(error: ErrorType<InnsendingError>) {
    if (isAxiosError<InnsendingFeiletError>(error)) {
        const deletionDate = error.response?.data?.deletionDate;
        if (deletionDate) {
            return deletionDate;
        }
    }
}

function isBrokenSoknad(error: ErrorType<InnsendingError>) {
    return isAxiosError<SoknadApiError>(error) && error.response?.data?.error === SoknadApiErrorError.BrokenSoknad;
}

function isMottakPabegynt(error: ErrorType<InnsendingError>) {
    return isAxiosError<SoknadApiError>(error) && error.response?.data?.error === SoknadApiErrorError.MottakPabegynt;
}

export const InnsendingFeilmelding = ({error}: {error: ErrorType<InnsendingError>}) => {
    const t = useTranslations("InnsendingFeilmelding");
    const deletionDate = extractDeletionDate(error);
    const locale = useLocale();

    if (isMottakPabegynt(error)) {
        return (
            <>
                <Heading level={"3"} size={"small"} spacing>
                    {t("mottakPabegynt.overskrift")}
                </Heading>
                <BodyLong>
                    {t.rich("mottakPabegynt.infotekst", {
                        lenke: (chunks) => (
                            <Link href={`${digisosConfig.innsynURL}/${locale}`} target="_blank">
                                {chunks}
                            </Link>
                        ),
                    })}
                </BodyLong>
            </>
        );
    }

    if (isBrokenSoknad(error)) {
        return (
            <>
                <Heading level={"3"} size={"small"} spacing>
                    {t("soknadKanIkkeSendes.overskrift")}
                </Heading>
                <BodyLong>{t("soknadKanIkkeSendes.infotekst")}</BodyLong>
            </>
        );
    }

    return (
        <>
            <Heading level={"3"} size={"small"} spacing>
                {t("innsendingFeilet.overskrift")}
            </Heading>
            <BodyLong>{t("innsendingFeilet.infotekst1")}</BodyLong>
            {deletionDate && <BodyLong>{t("innsendingFeilet.infotekst2", {deletionDate: deletionDate})}</BodyLong>}
        </>
    );
};
