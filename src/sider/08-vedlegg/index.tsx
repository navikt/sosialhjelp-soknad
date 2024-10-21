import * as React from "react";
import {Gruppe} from "./Gruppe";
import {InfopanelOpplysninger} from "./InfopanelOpplysninger";
import {UbesvarteOpplysninger} from "./UbesvarteOpplysninger";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import cx from "classnames";
import {useOpplysninger} from "../../lib/hooks/dokumentasjon/useOpplysninger";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {useTranslation} from "react-i18next";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {logAmplitudeSkjemaStegFullfort} from "../../lib/logAmplitudeSkjemaStegFullfort.ts";

export const OkonomiskeOpplysningerView = () => {
    const {bekreftet, isLoading, sorterte, grupper} = useOpplysninger();
    const {t} = useTranslation("skjema");

    const firstGroup = grupper[0];
    const middleGroups = grupper.slice(1, grupper.length - 1);
    const lastGroup = grupper[grupper.length - 1];

    const navigate = useNavigate();

    if (isLoading) return <ApplicationSpinner />;

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
                {bekreftet ? <InfopanelOpplysninger /> : <UbesvarteOpplysninger />}
                <Gruppe gruppeKey={firstGroup} opplysninger={sorterte.filter((x) => x.gruppe === firstGroup)} />
            </SkjemaStegBlock>
            {middleGroups.map((gruppe, i) => (
                <SkjemaStegBlock key={i} className={"pb-12"}>
                    <Gruppe
                        key={gruppe}
                        gruppeKey={gruppe}
                        opplysninger={sorterte.filter((x) => x.gruppe === gruppe)}
                    />
                </SkjemaStegBlock>
            ))}
            <SkjemaStegBlock className={cx("pb-12")}>
                <Gruppe gruppeKey={lastGroup} opplysninger={sorterte.filter((x) => x.gruppe === lastGroup)} />
                <SkjemaStegButtons
                    onPrevious={async () => navigate(`../7`)}
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
