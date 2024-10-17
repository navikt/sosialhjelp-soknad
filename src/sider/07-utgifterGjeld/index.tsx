import * as React from "react";
import {Boutgifter} from "./Boutgifter";
import {Barneutgifter} from "./Barneutgifter";
import {SkjemaStegLegacy} from "../../lib/components/SkjemaSteg/SkjemaStegLegacy";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {useSkjemaNavigation} from "../../lib/components/SkjemaSteg/useSkjemaNavigation.ts";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {SkjemaHeadings} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg.tsx";
import {useTranslation} from "react-i18next";

export const UtgifterGjeld = () => {
    const {t} = useTranslation("skjema");
    const {gotoPage} = useSkjemaNavigation(5);

    return (
        <SkjemaStegLegacy steg={"utgifterbolk"}>
            <SkjemaStegTitle title={t(SkjemaHeadings[7].tittel)} icon={SkjemaHeadings[7].ikon} />
            <Boutgifter />
            <Barneutgifter />
            <SkjemaStegButtons onNext={async () => gotoPage(6)} onPrevious={async () => gotoPage(8)} />
        </SkjemaStegLegacy>
    );
};
export default UtgifterGjeld;
