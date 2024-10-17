import * as React from "react";
import {digisosSkjemaConfig} from "../../lib/components/SkjemaSteg/digisosSkjema";
import {ForsorgerPlikt} from "./ForsorgerPlikt";
import {DinSivilstatus} from "./DinSivilstatus";
import {SkjemaStegLegacy} from "../../lib/components/SkjemaSteg/SkjemaStegLegacy";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {useSkjemaNavigation} from "../../lib/components/SkjemaSteg/useSkjemaNavigation.ts";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {SkjemaHeadings} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg.tsx";
import {useTranslation} from "react-i18next";

export const Familie = () => {
    const {t} = useTranslation("skjema");
    const {gotoPage} = useSkjemaNavigation(4);

    return (
        <SkjemaStegLegacy skjemaConfig={digisosSkjemaConfig} steg={"familiebolk"}>
            <SkjemaStegTitle title={t(SkjemaHeadings[4].tittel)} icon={SkjemaHeadings[4].ikon} />
            <div>
                <DinSivilstatus />
                <ForsorgerPlikt />
            </div>
            <SkjemaStegButtons onNext={async () => gotoPage(3)} onPrevious={async () => gotoPage(5)} />
        </SkjemaStegLegacy>
    );
};
export default Familie;
