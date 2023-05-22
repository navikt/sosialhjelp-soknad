import * as React from "react";
import Gruppe from "./Gruppe";
import {OpplysningerInformasjonspanel} from "./OpplysningerInformasjonspanel";
import {OpplysningerIkkeBesvartPanel} from "./OpplysningerIkkeBesvartPanel";
import {ApplicationSpinner} from "../../nav-soknad/components/applicationSpinner/ApplicationSpinner";
import {SkjemaSteg} from "../../nav-soknad/components/SkjemaSteg/ny/SkjemaSteg";
import cx from "classnames";
import {useOpplysninger} from "./useOpplysninger";

export const OkonomiskeOpplysningerView = () => {
    const {bekreftet, isLoading, sorterte, grupper} = useOpplysninger();

    if (isLoading) return <ApplicationSpinner />;

    return (
        <SkjemaSteg.Container page={8}>
            {grupper.map((gruppe, i) => {
                const first = i === 0;
                const last = i === grupper.length - 1;

                return (
                    <SkjemaSteg.Content key={i} className={cx("pb-12", {"lg:space-y-8": first})}>
                        {first && (
                            <>
                                <SkjemaSteg.Title className={"lg:mb-8"} />
                                {bekreftet ? <OpplysningerIkkeBesvartPanel /> : <OpplysningerInformasjonspanel />}
                            </>
                        )}
                        <Gruppe
                            key={gruppe}
                            gruppeKey={gruppe}
                            opplysninger={sorterte.filter((x) => x.gruppe === gruppe)}
                        />
                        {last && <SkjemaSteg.Buttons />}
                    </SkjemaSteg.Content>
                );
            })}
        </SkjemaSteg.Container>
    );
};
