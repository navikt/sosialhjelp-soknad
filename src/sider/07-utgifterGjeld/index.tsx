import {Boutgifter} from "./Boutgifter";
import {Barneutgifter} from "./Barneutgifter";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {useSkjemaNavigation} from "../../lib/components/SkjemaSteg/useSkjemaNavigation.ts";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {useTranslation} from "react-i18next";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import Feiloppsummering from "../../lib/components/Feiloppsummering.tsx";

export const UtgifterGjeld = () => {
    const {t} = useTranslation("skjema");
    const {handleStepChange, handlePrevious, handleNext} = useSkjemaNavigation(7);

    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={7} onStepChange={handleStepChange} />
            <Feiloppsummering />
            <SkjemaStegTitle title={t(SkjemaHeadings[7].tittel)} />
            <Boutgifter />
            <Barneutgifter />
            <SkjemaStegButtons onNext={handleNext} onPrevious={handlePrevious} />
        </SkjemaSteg>
    );
};
export default UtgifterGjeld;
