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
import {KortSkjemaHeadings, SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import React from "react";
import {useCurrentSoknadIsKort} from "../../lib/components/SkjemaSteg/useCurrentSoknadIsKort.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {useAnalyticsContext} from "../../lib/providers/AnalyticsContextProvider.tsx";

export const Oppsummering = () => {
    const {t} = useTranslation("skjema");
    const behandlingsId = useBehandlingsId();
    const {sendSoknad, isError} = useSendSoknad(behandlingsId);
    const navigate = useNavigate();
    const isKortSoknad = useCurrentSoknadIsKort();

    const {isLoading, data: oppsummering} = useGetOppsummering(behandlingsId);

    const {
        analyticsData: {selectedKategorier, situasjonEndret},
    } = useAnalyticsContext();

    if (isLoading) return <ApplicationSpinner />;

    const {tittel, ikon} = isKortSoknad ? KortSkjemaHeadings[5] : SkjemaHeadings[9];

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
                            {t("soknad.innsendingFeilet")}
                        </Alert>
                    )}
                </div>
                <SkjemaStegButtons
                    isFinalStep
                    onPrevious={async () => navigate("../" + (isKortSoknad ? 4 : 8))}
                    onNext={async () => {
                        await logAmplitudeEvent("skjema fullført", getAttributesForSkjemaFullfortEvent(oppsummering));
                        await sendSoknad(isKortSoknad, selectedKategorier, situasjonEndret);
                    }}
                />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};
export default Oppsummering;
