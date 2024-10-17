import * as React from "react";
import {ForsorgerPlikt} from "./ForsorgerPlikt";
import {DinSivilstatus} from "./DinSivilstatus";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {useSkjemaNavigation} from "../../lib/components/SkjemaSteg/useSkjemaNavigation.ts";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {useTranslation} from "react-i18next";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";

export const Familie = () => {
    const {t} = useTranslation("skjema");
    const {handleStepChange, handlePrevious, handleNext} = useSkjemaNavigation(4);

    return (
        <SkjemaSteg page={4}>
            <SkjemaStegStepper page={4} onStepChange={handleStepChange} />
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
