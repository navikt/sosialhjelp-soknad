import * as React from "react";
import {Gruppe} from "./Gruppe";
import {InfopanelOpplysninger} from "./InfopanelOpplysninger";
import {UbesvarteOpplysninger} from "./UbesvarteOpplysninger";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import cx from "classnames";
import {useOpplysninger} from "../../lib/hooks/dokumentasjon/useOpplysninger";

export const OkonomiskeOpplysningerView = () => {
    const {bekreftet, isLoading, sorterte, grupper} = useOpplysninger();

    if (isLoading) return <ApplicationSpinner />;

    const firstGroup = grupper[0];
    const middleGroups = grupper.slice(1, grupper.length - 1);
    const lastGroup = grupper[grupper.length - 1];

    return (
        <SkjemaSteg.Container page={8}>
            <SkjemaSteg.Content className={cx("pb-12", {"lg:space-y-8": true})}>
                <SkjemaSteg.Title className={"lg:mb-8"} />
                {bekreftet ? <InfopanelOpplysninger /> : <UbesvarteOpplysninger />}
                <Gruppe gruppeKey={firstGroup} opplysninger={sorterte.filter((x) => x.gruppe === firstGroup)} />
            </SkjemaSteg.Content>
            {middleGroups.map((gruppe, i) => (
                <SkjemaSteg.Content key={i} className={"pb-12"}>
                    <Gruppe
                        key={gruppe}
                        gruppeKey={gruppe}
                        opplysninger={sorterte.filter((x) => x.gruppe === gruppe)}
                    />
                </SkjemaSteg.Content>
            ))}
            <SkjemaSteg.Content className={cx("pb-12")}>
                <Gruppe gruppeKey={lastGroup} opplysninger={sorterte.filter((x) => x.gruppe === lastGroup)} />
                <SkjemaSteg.Buttons />
            </SkjemaSteg.Content>
        </SkjemaSteg.Container>
    );
};
export default OkonomiskeOpplysningerView;
