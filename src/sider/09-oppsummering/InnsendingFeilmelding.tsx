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
    body: React.ReactNode;
    children?: React.ReactNode;
}

const FeilmeldingStructure = ({heading, body, children}: HeadingBodyLongProps) => (
    <>
        <Heading level={"3"} size={"small"} spacing>
            {heading}
        </Heading>
        <BodyLong>{body}</BodyLong>
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
            <FeilmeldingStructure
                heading={t("mottakPabegynt.overskrift")}
                body={t.rich("mottakPabegynt.infotekst", {
                    lenke: (chunks) => (
                        <Link href={`${digisosConfig.innsynURL}/${locale}`} target="_blank">
                            {chunks}
                        </Link>
                    ),
                })}
            />
        );
    }

    if (isBrokenSoknad(error)) {
        return (
            <FeilmeldingStructure
                heading={t("soknadKanIkkeSendes.overskrift")}
                body={t("soknadKanIkkeSendes.infotekst")}
            />
        );
    }

    return (
        <FeilmeldingStructure heading={t("innsendingFeilet.overskrift")} body={t("innsendingFeilet.infotekst1")}>
            {deletionDate && <BodyLong>{t("innsendingFeilet.infotekst2", {deletionDate: deletionDate})}</BodyLong>}
        </FeilmeldingStructure>
    );
};
