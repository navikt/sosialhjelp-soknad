import * as React from "react";
import {ForsorgerPlikt} from "./ForsorgerPlikt";
import {DinSivilstatus} from "./DinSivilstatus";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {useSkjemaNavigation} from "../../lib/components/SkjemaSteg/useSkjemaNavigation.ts";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg.tsx";
import {useTranslation} from "react-i18next";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/ny/SkjemaStegBlock.tsx";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/ny/SkjemaStegStepper.tsx";
import Feiloppsummering from "../../lib/components/Feiloppsummering.tsx";

export const Familie = () => {
    const {t} = useTranslation("skjema");
    const {handleStepChange, handlePrevious, handleNext} = useSkjemaNavigation(4);

    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={4} onStepChange={handleStepChange} />
            <Feiloppsummering />
            <SkjemaStegBlock>
                <SkjemaStegTitle title={t(SkjemaHeadings[4].tittel)} icon={SkjemaHeadings[4].ikon} />
                <DinSivilstatus />
                <ForsorgerPlikt />
                <SkjemaStegButtons onNext={handleNext} onPrevious={handlePrevious} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};
export default Familie;
