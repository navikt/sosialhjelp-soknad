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

export const Oppsummering = () => {
    const {t} = useTranslation("skjema");
    const soknadId = useSoknadId();
    const navigate = useNavigate();
    const {isLoading, data: oppsummering} = useGetOppsummering(soknadId);

    const {sendSoknad, isError, isPending, isKortSoknad, deletionDateRef} = useSendSoknad(oppsummering);

    if (isLoading) return <ApplicationSpinner />;

    const {tittel, ikon} = isKortSoknad ? KortSkjemaHeadings[5] : SkjemaHeadings[9];

    const feilmeldingstekst = (deletionDate: string) => {
        return (
            <>
                <Heading level={"3"} size={"small"} spacing>
                    {t("soknad.innsendingFeilet.overskrift")}
                </Heading>
                <BodyLong>{t("soknad.innsendingFeilet.infotekst1")}</BodyLong>
                <BodyLong>{t("soknad.innsendingFeilet.infotekst2", {deletionDate: deletionDate})}</BodyLong>
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
    };

    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={isKortSoknad ? 5 : 9} onStepChange={async (page) => navigate(`../${page}`)} />
            <SkjemaStegBlock>
                <SkjemaStegTitle title={t(tittel)} icon={ikon} />

                <div>
                    {oppsummering?.steg.map((steg) => <OppsummeringSteg steg={steg} key={steg.stegNr} />)}
                    <SoknadsmottakerInfoPanel />
                    {isError && (
                        <Alert variant="error" className="mt-4">
                            {feilmeldingstekst(deletionDateRef.current)}
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
