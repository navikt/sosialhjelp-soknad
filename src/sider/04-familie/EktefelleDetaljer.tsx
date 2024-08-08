import * as React from "react";
import {Systeminfo} from "../../lib/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {Heading} from "@navikt/ds-react";
import {useHentSivilstatus} from "../../generated/client/sivilstatus-ressurs/sivilstatus-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {EktefellePersonaliaSystem} from "./EktefellePersonaliaSystem";
import {EktefellerPlikterForsorge} from "./EktefellePlikterForsorge";

export const EktefelleDetaljer = () => {
    const {expectOK} = useAlgebraic(useHentSivilstatus(useBehandlingsId()));

    const {t} = useTranslation();
    return expectOK(({harDiskresjonskode}) => (
        <div className="space-y-4">
            <Heading size={"small"} level={"3"} spacing>
                {t("system.familie.sivilstatus.sporsmal")}
            </Heading>
            <Systeminfo>
                {harDiskresjonskode ? t("system.familie.sivilstatus.ikkeTilgang.label") : <EktefellePersonaliaSystem />}
            </Systeminfo>
            {!harDiskresjonskode && <EktefellerPlikterForsorge />}
        </div>
    ));
};
