import * as React from "react";
import {Systeminfo} from "../../../nav-soknad/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {Heading} from "@navikt/ds-react";
import {useHentSivilstatus} from "../../../generated/sivilstatus-ressurs/sivilstatus-ressurs";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {useAlgebraic} from "../../../lib/hooks/useAlgebraic";
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
