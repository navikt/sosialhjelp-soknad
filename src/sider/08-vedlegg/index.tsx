import * as React from "react";
import {Gruppe} from "./Gruppe";
import {InfopanelOpplysninger} from "./InfopanelOpplysninger";
import {UbesvarteOpplysninger} from "./UbesvarteOpplysninger";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import cx from "classnames";
import {useOpplysninger} from "../../lib/hooks/dokumentasjon/useOpplysninger";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {SkjemaContent} from "../../lib/components/SkjemaSteg/ny/SkjemaContent.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";

export const OkonomiskeOpplysningerView = () => {
    const {bekreftet, isLoading, sorterte, grupper} = useOpplysninger();

    if (isLoading) return <ApplicationSpinner />;

    const firstGroup = grupper[0];
    const middleGroups = grupper.slice(1, grupper.length - 1);
    const lastGroup = grupper[grupper.length - 1];

    return (
        <SkjemaSteg page={8}>
            <SkjemaContent className={cx("pb-12", {"lg:space-y-8": true})}>
                <SkjemaStegTitle className={"lg:mb-8"} />
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
                <SkjemaStegButtons />
            </SkjemaContent>
        </SkjemaSteg>
    );
};
export default OkonomiskeOpplysningerView;
