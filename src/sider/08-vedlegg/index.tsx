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
import useGrupper from "../../lib/hooks/dokumentasjon/useGrupper.ts";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {useGetBarneutgifter} from "../../generated/new/barneutgift-controller/barneutgift-controller.ts";
import {useGetBoutgifter} from "../../generated/new/boutgift-controller/boutgift-controller.ts";
import {UbesvarteOpplysninger} from "./UbesvarteOpplysninger.tsx";
import {useCurrentSoknadIsKort} from "../../lib/components/SkjemaSteg/useCurrentSoknadIsKort.tsx";

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
    const isKortSoknad = useCurrentSoknadIsKort();
    const {hasBekreftet, isLoading: isHasBekreftetLoading} = useHasBekreftetUtgifter();
    const soknadId = useSoknadId();

    if (isLoading || isHasBekreftetLoading) return <ApplicationSpinner />;

    const umamiTrack = () => {
        window.umami.track("Skjemasteg fullført", {
            steg: "8",
            isKortSoknad: isKortSoknad,
            soknadId: soknadId,
        });
    };

    return (
        <SkjemaSteg>
            <SkjemaStegStepper
                page={8}
                onStepChange={async (toPage) => {
                    umamiTrack();
                    navigate(`../${toPage}`);
                }}
            />
            <SkjemaStegBlock className={cx("lg:space-y-8 mb-0! pb-0! rounded-b-none")}>
                <SkjemaStegTitle
                    title={t(SkjemaHeadings[8].tittel)}
                    icon={SkjemaHeadings[8].ikon}
                    className={"lg:mb-8"}
                />
                {hasBekreftet ? <InfopanelOpplysninger /> : <UbesvarteOpplysninger />}
            </SkjemaStegBlock>
            {grupper.map((gruppe, i) => (
                <SkjemaStegBlock
                    key={i}
                    className={cx("pb-12", {
                        "pt-24! mt-0! rounded-t-none": i === 0,
                        "mb-0! rounded-b-none": i === grupper.length - 1,
                    })}
                >
                    <Gruppe key={gruppe} gruppeKey={gruppe} />
                </SkjemaStegBlock>
            ))}
            <SkjemaStegBlock className={cx("pb-12 rounded-t-none")}>
                <SkjemaStegButtons
                    onPrevious={() => navigate(`../7`)}
                    onNext={async () => {
                        umamiTrack();
                        navigate("../9");
                    }}
                />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};
export default OkonomiskeOpplysningerView;
