import * as React from "react";
import {AntallPersoner} from "./AntallPersoner";
import {Botype} from "./Botype";
import {useSkjemaNavigation} from "../../lib/components/SkjemaSteg/useSkjemaNavigation.ts";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {useTranslation} from "react-i18next";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import Feiloppsummering from "../../lib/components/Feiloppsummering.tsx";

export const Bosituasjon = () => {
    const {t} = useTranslation("skjema");
    const {handleStepChange, handlePrevious, handleNext} = useSkjemaNavigation(5);

    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={5} onStepChange={handleStepChange} />
            <Feiloppsummering />
            <SkjemaStegBlock>
                <SkjemaStegTitle title={t(SkjemaHeadings[5].tittel)} icon={SkjemaHeadings[5].ikon} />
                <Botype />
                <AntallPersoner />
                <SkjemaStegButtons onNext={handleNext} onPrevious={handlePrevious} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};
export default Bosituasjon;
