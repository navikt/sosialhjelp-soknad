import * as React from "react";
import {AntallPersoner} from "./AntallPersoner";
import {Botype} from "./Botype";
import {useSkjemaNavigation} from "../../lib/components/SkjemaSteg/useSkjemaNavigation.ts";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg.tsx";
import {useTranslation} from "react-i18next";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/ny/SkjemaStegStepper.tsx";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/ny/SkjemaStegBlock.tsx";

export const Bosituasjon = () => {
    const {t} = useTranslation("skjema");
    const {gotoPage} = useSkjemaNavigation(5);

    return (
        <SkjemaSteg page={5}>
            <SkjemaStegStepper page={5} onStepChange={async (page) => gotoPage(page)} />
            <SkjemaStegBlock>
                <SkjemaStegTitle title={t(SkjemaHeadings[5].tittel)} icon={SkjemaHeadings[5].ikon} />
                <Botype />
                <AntallPersoner />
                <SkjemaStegButtons onNext={async () => gotoPage(4)} onPrevious={async () => gotoPage(6)} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};
export default Bosituasjon;
