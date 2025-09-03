import {Alert, BodyLong, BodyShort, Heading, Link} from "@navikt/ds-react";
import {SoknadsmottakerInfoPanel} from "./SoknadsmottakerInfoPanel";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {Trans, useTranslation} from "react-i18next";
import {useGetOppsummering} from "../../generated/oppsummering-ressurs/oppsummering-ressurs";
import {OppsummeringSteg} from "./OppsummeringSteg";
import {useSendSoknad} from "./useSendSoknad";
import {KortSkjemaHeadings, SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import React from "react";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {isAxiosError} from "axios";
import {InnsendingFeiletError, SendSoknad400, SoknadApiError, UnauthorizedMelding} from "../../generated/new/model";
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

const Feilmelding = ({error}: {error: ErrorType<InnsendingError>}) => {
    const {t} = useTranslation("skjema");
    const deletionDate = extractDeletionDate(error);

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

export const Oppsummering = () => {
    const {t} = useTranslation("skjema");
    const soknadId = useSoknadId();
    const navigate = useNavigate();
    const {isLoading, data: oppsummering} = useGetOppsummering(soknadId);

    const {sendSoknad, isPending, isKortSoknad, error} = useSendSoknad();

    if (isLoading) return <ApplicationSpinner />;

    const {tittel, ikon} = isKortSoknad ? KortSkjemaHeadings[5] : SkjemaHeadings[9];

    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={isKortSoknad ? 5 : 9} onStepChange={async (page) => navigate(`../${page}`)} />
            <SkjemaStegBlock>
                <SkjemaStegTitle title={t(tittel)} icon={ikon} />

                <div>
                    {oppsummering?.steg.map((steg) => (
                        <OppsummeringSteg steg={steg} key={steg.stegNr} />
                    ))}
                    <SoknadsmottakerInfoPanel />
                    {error && (
                        <Alert variant="error" className="mt-4">
                            <Feilmelding error={error} />
                        </Alert>
                    )}
                </div>
                <SkjemaStegButtons
                    isFinalStep
                    isNextPending={isPending}
                    onPrevious={async () => navigate("../" + (isKortSoknad ? 4 : 8))}
                    onNext={async () => sendSoknad({soknadId})}
                />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};
export default Oppsummering;
