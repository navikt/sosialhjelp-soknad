import * as React from "react";
import {Gruppe} from "./Gruppe";
import {InfopanelOpplysninger} from "./InfopanelOpplysninger";
import {UbesvarteOpplysninger} from "./UbesvarteOpplysninger";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import cx from "classnames";
import {useOpplysninger} from "../../lib/hooks/dokumentasjon/useOpplysninger";
import {SkjemaContent} from "../../lib/components/SkjemaSteg/ny/SkjemaContent.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {useTranslation} from "react-i18next";
import {SkjemaStegStepperV2} from "../../lib/components/SkjemaSteg/ny/SkjemaStegStepperV2.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";

export const OkonomiskeOpplysningerView = () => {
    const {bekreftet, isLoading, sorterte, grupper} = useOpplysninger();
    const {t} = useTranslation("skjema");

    if (isLoading) return <ApplicationSpinner />;

    const firstGroup = grupper[0];
    const middleGroups = grupper.slice(1, grupper.length - 1);
    const lastGroup = grupper[grupper.length - 1];

    const navigate = useNavigate();

    return (
        <SkjemaSteg page={8}>
            <SkjemaStegStepperV2 page={8} onStepChange={async (toPage) => navigate(`../${toPage}`)} />
            <SkjemaContent className={cx("pb-12", {"lg:space-y-8": true})}>
                <SkjemaStegTitle
                    title={t(SkjemaHeadings[8].tittel)}
                    icon={SkjemaHeadings[8].ikon}
                    className={"lg:mb-8"}
                />
                {bekreftet ? <InfopanelOpplysninger /> : <UbesvarteOpplysninger />}
                <Gruppe gruppeKey={firstGroup} opplysninger={sorterte.filter((x) => x.gruppe === firstGroup)} />
            </SkjemaContent>
            {middleGroups.map((gruppe, i) => (
                <SkjemaContent key={i} className={"pb-12"}>
                    <Gruppe
                        key={gruppe}
                        gruppeKey={gruppe}
                        opplysninger={sorterte.filter((x) => x.gruppe === gruppe)}
                    />
                </SkjemaContent>
            ))}
            <SkjemaContent className={cx("pb-12")}>
                <Gruppe gruppeKey={lastGroup} opplysninger={sorterte.filter((x) => x.gruppe === lastGroup)} />
                <SkjemaStegButtons onPrevious={async () => navigate(`../7`)} onNext={async () => navigate("../9")} />
            </SkjemaContent>
        </SkjemaSteg>
    );
};
export default OkonomiskeOpplysningerView;
