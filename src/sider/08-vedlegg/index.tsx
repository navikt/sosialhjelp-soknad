import * as React from "react";
import {Gruppe} from "./Gruppe";
import {InfopanelOpplysninger} from "./InfopanelOpplysninger";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {useTranslation} from "react-i18next";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import useGrupper from "../../lib/hooks/dokumentasjon/useGrupper.ts";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {UbesvarteOpplysninger} from "./UbesvarteOpplysninger.tsx";
import {useCallback} from "react";
import useHasBekreftetUtgifter from "./useHasBekreftetUtgifter.ts";
import {umamiTrack} from "../../app/umami.ts";
import {Box} from "@navikt/ds-react";

export const OkonomiskeOpplysningerView = () => {
    const {grupper, isLoading} = useGrupper();
    const {t} = useTranslation("skjema");
    const navigate = useNavigate();
    const {hasBekreftet, isLoading: isHasBekreftetLoading} = useHasBekreftetUtgifter();
    const soknadId = useSoknadId();

    const umamiTracker = useCallback(() => {
        umamiTrack("Skjemasteg fullført", {
            steg: "8",
            isKortSoknad: true,
            soknadId: soknadId,
        });
    }, [soknadId]);

    if (isLoading || isHasBekreftetLoading) return <ApplicationSpinner />;

    return (
        <SkjemaSteg>
            <SkjemaStegStepper
                page={8}
                onStepChange={async (toPage) => {
                    umamiTracker();
                    navigate(`../${toPage}`);
                }}
            />
            <SkjemaStegBlock>
                <SkjemaStegTitle title={t(SkjemaHeadings[8].tittel)} className={"lg:mb-8"} />
                {hasBekreftet ? <InfopanelOpplysninger /> : <UbesvarteOpplysninger />}
                <Box className={"space-y-8 lg:space-y-16"}>
                    {grupper.map((gruppe) => (
                        <Gruppe gruppeKey={gruppe} key={gruppe} />
                    ))}
                </Box>
                <SkjemaStegButtons
                    onPrevious={() => navigate(`../7`)}
                    onNext={async () => {
                        umamiTracker();
                        navigate("../9");
                    }}
                />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};
export default OkonomiskeOpplysningerView;
