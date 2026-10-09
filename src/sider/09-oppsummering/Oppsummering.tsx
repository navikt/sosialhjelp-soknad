import {Alert} from "@navikt/ds-react";
import {SoknadsmottakerInfoPanel} from "./SoknadsmottakerInfoPanel";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {useTranslation} from "react-i18next";
import {useGetOppsummering, useHentAntallInnsendteSoknader} from "../../generated";
import {OppsummeringSteg} from "./OppsummeringSteg";
import {useSendSoknad} from "./useSendSoknad";
import {KortSkjemaHeadings, SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import React from "react";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {InnsendingFeilmelding} from "./InnsendingFeilmelding";
import {InnsendteSoknaderVarsel, resolveInnsendingBlocked} from "../../lib/components/InnsendteSoknaderVarsel.tsx";

export const Oppsummering = () => {
    const {t} = useTranslation("skjema");
    const soknadId = useSoknadId();
    const navigate = useNavigate();
    const {isLoading, data: oppsummering} = useGetOppsummering(soknadId);
    const {data: innsendteSoknaderSisteDogn} = useHentAntallInnsendteSoknader({query: {retry: 0}});

    const {sendSoknad, isPending, isKortSoknad, error} = useSendSoknad();

    if (isLoading) return <ApplicationSpinner />;

    const {tittel, ikon} = isKortSoknad ? KortSkjemaHeadings[5] : SkjemaHeadings[9];

    const isInnsendingBlocked = resolveInnsendingBlocked(
        innsendteSoknaderSisteDogn?.antall,
        innsendteSoknaderSisteDogn?.maxAntall
    );

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
                            <InnsendingFeilmelding error={error} />
                        </Alert>
                    )}
                </div>
                <InnsendteSoknaderVarsel innsendteSoknader={innsendteSoknaderSisteDogn} />
                <SkjemaStegButtons
                    isFinalStep
                    isNextPending={isPending}
                    nextButtonDisabled={isInnsendingBlocked}
                    onPrevious={async () => navigate("../" + (isKortSoknad ? 4 : 8))}
                    onNext={async () => sendSoknad({soknadId})}
                />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};
export default Oppsummering;
