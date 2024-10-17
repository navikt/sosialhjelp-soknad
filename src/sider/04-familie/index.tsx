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

export const Familie = () => {
    const {t} = useTranslation("skjema");
    const {gotoPage} = useSkjemaNavigation(4);

    return (
        <SkjemaSteg page={4}>
            <SkjemaStegStepper page={4} onStepChange={async (page) => gotoPage(page)} />
            <SkjemaStegBlock>
                <SkjemaStegTitle title={t(SkjemaHeadings[4].tittel)} icon={SkjemaHeadings[4].ikon} />
                <DinSivilstatus />
                <ForsorgerPlikt />
                <SkjemaStegButtons onNext={async () => gotoPage(3)} onPrevious={async () => gotoPage(5)} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};
export default Familie;
