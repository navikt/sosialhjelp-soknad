import * as React from "react";
import {Systeminfo} from "../../lib/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {Heading} from "@navikt/ds-react";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {EktefellePersonaliaSystem} from "./EktefellePersonaliaSystem";
import {EktefellerPlikterForsorge} from "./EktefellePlikterForsorge";
import {useGetSivilstand} from "../../generated/new/sivilstand-controller/sivilstand-controller.ts";

export const EktefelleDetaljer = () => {
    const {expectOK} = useAlgebraic(useGetSivilstand(useSoknadId()));

    const {t} = useTranslation();
    return expectOK(({ektefelle}) => (
        <div className="space-y-4">
            <Heading size={"small"} level={"3"} spacing>
                {t("system.familie.sivilstatus.sporsmal")}
            </Heading>
            <Systeminfo>
                {ektefelle?.harDiskresjonskode ? (
                    t("system.familie.sivilstatus.ikkeTilgang.label")
                ) : (
                    <EktefellePersonaliaSystem />
                )}
            </Systeminfo>
            {!ektefelle?.harDiskresjonskode && <EktefellerPlikterForsorge />}
        </div>
    ));
};
