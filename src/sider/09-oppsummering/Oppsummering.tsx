import {Alert} from "@navikt/ds-react";
import {SoknadsmottakerInfoPanel} from "./SoknadsmottakerInfoPanel";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useTranslation} from "react-i18next";
import {useGetOppsummering} from "../../generated/oppsummering-ressurs/oppsummering-ressurs";
import {OppsummeringSteg} from "./OppsummeringSteg";
import {getAttributesForSkjemaFullfortEvent} from "./getAttributesForSkjemaFullfortEvent";
import {useSendSoknad} from "./useSendSoknad";
import {logAmplitudeEvent} from "../../lib/amplitude/Amplitude";
import {KortSkjemaHeadings, SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/ny/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/ny/SkjemaStegStepper.tsx";
import React from "react";
import {useCurrentSoknadIsKort} from "../../lib/components/SkjemaSteg/ny/useCurrentSoknadIsKort.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";

export const Oppsummering = () => {
    const {t} = useTranslation("skjema");
    const behandlingsId = useBehandlingsId();
    const {sendSoknad, isError} = useSendSoknad(behandlingsId);
    const navigate = useNavigate();
    const isKortSoknad = useCurrentSoknadIsKort();

    const {isLoading, data: oppsummering} = useGetOppsummering(behandlingsId);
    if (isLoading) return <ApplicationSpinner />;

    const {tittel, ikon} = isKortSoknad ? KortSkjemaHeadings[5] : SkjemaHeadings[9];

    return (
        <SkjemaSteg page={isKortSoknad ? 5 : 9}>
            <SkjemaStegStepper page={isKortSoknad ? 5 : 9} onStepChange={async (page) => navigate(`../${page}`)} />
            <SkjemaStegBlock>
                <SkjemaStegTitle title={t(tittel)} icon={ikon} />

                <div>
                    {oppsummering?.steg.map((steg) => <OppsummeringSteg steg={steg} key={steg.stegNr} />)}
                    <SoknadsmottakerInfoPanel />
                    {isError && (
                        <Alert variant="error" className="mt-4">
                            {t("soknad.innsendingFeilet")}
                        </Alert>
                    )}
                </div>
                <SkjemaStegButtons
                    isFinalStep
                    onPrevious={async () => navigate("../" + (isKortSoknad ? 4 : 8))}
                    onNext={async () => {
                        await logAmplitudeEvent("skjema fullført", getAttributesForSkjemaFullfortEvent(oppsummering));
                        await sendSoknad(isKortSoknad);
                    }}
                />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};
export default Oppsummering;
