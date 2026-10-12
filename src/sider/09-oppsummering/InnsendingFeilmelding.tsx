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

interface HeadingBodyLongProps {
    heading: React.ReactNode;
    children?: React.ReactNode;
}

const Feilmelding = ({heading, children}: HeadingBodyLongProps) => (
    <>
        <Heading level={"3"} size={"small"} spacing>
            {heading}
        </Heading>
        {children}
    </>
);

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
            <Feilmelding heading={t("mottakPabegynt.overskrift")}>
                <BodyLong>
                    {t.rich("mottakPabegynt.infotekst", {
                        lenke: (chunks) => (
                            <Link href={`${digisosConfig.innsynURL}/${locale}`} target="_blank">
                                {chunks}
                            </Link>
                        ),
                    })}
                </BodyLong>
            </Feilmelding>
        );
    }

    if (isBrokenSoknad(error)) {
        return (
            <Feilmelding heading={t("soknadKanIkkeSendes.overskrift")}>
                <BodyLong>{t("soknadKanIkkeSendes.infotekst")}</BodyLong>
            </Feilmelding>
        );
    }

    return (
        <Feilmelding heading={t("innsendingFeilet.overskrift")}>
            <BodyLong>{t("innsendingFeilet.infotekst1")}</BodyLong>
            {deletionDate && <BodyLong>{t("innsendingFeilet.infotekst2", {deletionDate: deletionDate})}</BodyLong>}
        </Feilmelding>
    );
};
