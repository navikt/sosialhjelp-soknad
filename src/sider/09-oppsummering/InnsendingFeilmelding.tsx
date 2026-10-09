import {BodyLong, BodyShort, Heading, Link} from "@navikt/ds-react";
import {isAxiosError} from "axios";
import {Trans, useTranslation} from "react-i18next";
import {
    InnsendingFeiletError,
    SendSoknad400,
    SoknadApiError,
    SoknadApiErrorError,
    UnauthorizedMelding,
} from "../../generated/model";
import {ErrorType} from "../../lib/api/axiosInstance.ts";

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
    const {t} = useTranslation("skjema");
    const deletionDate = extractDeletionDate(error);

    if (isMottakPabegynt(error)) {
        return (
            <>
                <Heading level={"3"} size={"small"} spacing>
                    {t("soknad.mottakPabegynt.overskrift")}
                </Heading>
                <BodyLong>{t("soknad.mottakPabegynt.infotekst")}</BodyLong>
                <br />
                <Heading level={"3"} size={"small"}>
                    {t("soknad.innsendingFeilet.nodssituasjon")}
                </Heading>
                <BodyShort>
                    <Trans
                        t={t}
                        i18nKey={"soknad.soknadKanIkkeSendes.generelt"}
                        components={{
                            lenke: (
                                <Link
                                    href="https://www.nav.no/sok-nav-kontor"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {null}
                                </Link>
                            ),
                        }}
                    />
                </BodyShort>
            </>
        );
    }

    if (isBrokenSoknad(error)) {
        return (
            <>
                <Heading level={"3"} size={"small"} spacing>
                    {t("soknad.soknadKanIkkeSendes.overskrift")}
                </Heading>
                <BodyLong>{t("soknad.soknadKanIkkeSendes.infotekst")}</BodyLong>
                <br />
                <BodyShort>
                    <Trans
                        t={t}
                        i18nKey={"soknad.soknadKanIkkeSendes.generelt"}
                        components={{
                            lenke: (
                                <Link
                                    href="https://www.nav.no/sok-nav-kontor"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {null}
                                </Link>
                            ),
                        }}
                    />
                </BodyShort>
            </>
        );
    }

    return (
        <>
            <Heading level={"3"} size={"small"} spacing>
                {t("soknad.innsendingFeilet.overskrift")}
            </Heading>
            <BodyLong>{t("soknad.innsendingFeilet.infotekst1")}</BodyLong>
            {deletionDate && (
                <BodyLong>{t("soknad.innsendingFeilet.infotekst2", {deletionDate: deletionDate})}</BodyLong>
            )}
            <br />
            <Heading level={"3"} size={"small"}>
                {t("soknad.innsendingFeilet.nodssituasjon")}
            </Heading>
            <BodyShort>
                <Trans
                    t={t}
                    i18nKey={"soknad.innsendingFeilet.generelt"}
                    components={{
                        lenke: (
                            <Link href="https://www.nav.no/sok-nav-kontor" target="_blank" rel="noreferrer noopener">
                                {null}
                            </Link>
                        ),
                    }}
                />
            </BodyShort>
        </>
    );
};
