import * as React from "react";
import {Boutgifter} from "./Boutgifter";
import {Barneutgifter} from "./Barneutgifter";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {useSkjemaNavigation} from "../../lib/components/SkjemaSteg/useSkjemaNavigation.ts";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg.tsx";
import {useTranslation} from "react-i18next";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/ny/SkjemaStegStepper.tsx";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/ny/SkjemaStegBlock.tsx";

export const UtgifterGjeld = () => {
    const {t} = useTranslation("skjema");
    const {gotoPage} = useSkjemaNavigation(5);

    return (
        <SkjemaSteg page={7}>
            <SkjemaStegStepper page={7} onStepChange={async (page) => gotoPage(page)} />
            <SkjemaStegBlock>
                <SkjemaStegTitle title={t(SkjemaHeadings[7].tittel)} icon={SkjemaHeadings[7].ikon} />
                <Boutgifter />
                <Barneutgifter />
                <SkjemaStegButtons onNext={async () => gotoPage(6)} onPrevious={async () => gotoPage(8)} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};
export default UtgifterGjeld;
