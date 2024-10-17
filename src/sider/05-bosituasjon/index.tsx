import * as React from "react";
import {digisosSkjemaConfig} from "../../lib/components/SkjemaSteg/digisosSkjema";
import {AntallPersoner} from "./AntallPersoner";
import {Botype} from "./Botype";
import {SkjemaStegLegacy} from "../../lib/components/SkjemaSteg/SkjemaStegLegacy";
import {useSkjemaNavigation} from "../../lib/components/SkjemaSteg/useSkjemaNavigation.ts";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {SkjemaHeadings} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg.tsx";
import {useTranslation} from "react-i18next";

export const Bosituasjon = () => {
    const {t} = useTranslation("skjema");
    const {gotoPage} = useSkjemaNavigation(5);

    return (
        <SkjemaStegLegacy skjemaConfig={digisosSkjemaConfig} steg={"bosituasjonbolk"}>
            <SkjemaStegTitle title={t(SkjemaHeadings[5].tittel)} icon={SkjemaHeadings[5].ikon} />
            <div>
                <Botype />
                <AntallPersoner />
            </div>
            <SkjemaStegButtons onNext={async () => gotoPage(4)} onPrevious={async () => gotoPage(6)} />
        </SkjemaStegLegacy>
    );
};
export default Bosituasjon;
