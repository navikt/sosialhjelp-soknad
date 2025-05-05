import * as React from "react";
import {Gruppe} from "./Gruppe";
import {InfopanelOpplysninger} from "./InfopanelOpplysninger";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import cx from "classnames";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {useTranslation} from "react-i18next";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {logAmplitudeSkjemaStegFullfort} from "../../lib/logAmplitudeSkjemaStegFullfort.ts";
import useGrupper from "../../lib/hooks/dokumentasjon/useGrupper.ts";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {useGetBarneutgifter} from "../../generated/new/barneutgift-controller/barneutgift-controller.ts";
import {useGetBoutgifter} from "../../generated/new/boutgift-controller/boutgift-controller.ts";
import {UbesvarteOpplysninger} from "./UbesvarteOpplysninger.tsx";

const useHasBekreftetUtgifter = () => {
    const soknadId = useSoknadId();
    const {data: barneutgifterData, isLoading: isBarneutgifterLoading} = useGetBarneutgifter(soknadId);
    const {data: boutgifterData, isLoading: isBoutgifterLoading} = useGetBoutgifter(soknadId);

    return {
        isLoading: isBarneutgifterLoading || isBoutgifterLoading,
        hasBekreftet: barneutgifterData?.hasBekreftelse || boutgifterData?.bekreftelse,
    };
};

export const OkonomiskeOpplysningerView = () => {
    const {grupper, isLoading} = useGrupper();
    const {t} = useTranslation("skjema");
    const navigate = useNavigate();
    const {hasBekreftet, isLoading: isHasBekreftetLoading} = useHasBekreftetUtgifter();

    const firstGroup = grupper[0];
    const middleGroups = grupper.slice(1, grupper.length - 1);
    const lastGroup = grupper[grupper.length - 1];

    if (isLoading || isHasBekreftetLoading) return <ApplicationSpinner />;

    return (
        <SkjemaSteg>
            <SkjemaStegStepper
                page={8}
                onStepChange={async (toPage) => {
                    await logAmplitudeSkjemaStegFullfort(8);
                    navigate(`../${toPage}`);
                }}
            />
            <SkjemaStegBlock className={cx("pb-12", {"lg:space-y-8": true})}>
                <SkjemaStegTitle
                    title={t(SkjemaHeadings[8].tittel)}
                    icon={SkjemaHeadings[8].ikon}
                    className={"lg:mb-8"}
                />
                {hasBekreftet ? <InfopanelOpplysninger /> : <UbesvarteOpplysninger />}
                <Gruppe gruppeKey={firstGroup} />
            </SkjemaStegBlock>
            {middleGroups.map((gruppe, i) => (
                <SkjemaStegBlock key={i} className={"pb-12"}>
                    <Gruppe key={gruppe} gruppeKey={gruppe} />
                </SkjemaStegBlock>
            ))}
            <SkjemaStegBlock className={cx("pb-12")}>
                <Gruppe gruppeKey={lastGroup} />
                <SkjemaStegButtons
                    onPrevious={() => navigate(`../7`)}
                    onNext={async () => {
                        await logAmplitudeSkjemaStegFullfort(8);
                        navigate("../9");
                    }}
                />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};
export default OkonomiskeOpplysningerView;
