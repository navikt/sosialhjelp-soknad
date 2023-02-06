import * as React from "react";
import {useSelector} from "react-redux";

import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import Informasjonspanel from "../../../../nav-soknad/components/Informasjonspanel";

import {State} from "../../../redux/reducers";
import {
    SingleLineDateElement,
    OldSingleLineElement,
    OldSysteminfo,
} from "../../../../nav-soknad/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";

const EktefelleInformasjon = () => {
    const {ektefelle, erFolkeregistrertSammen} = useSelector((state: State) => state.soknadsdata.familie.sivilstatus);
    const systeminfo = [];
    const {t} = useTranslation("skjema", {keyPrefix: "system.familie.sivilstatus.gift.ektefelle"});
    if (ektefelle?.navn?.fulltNavn) {
        systeminfo.push({
            key: t(`navn`),
            value: <OldSingleLineElement value={ektefelle.navn.fulltNavn} />,
        });
        if (ektefelle?.fodselsdato) {
            systeminfo.push({
                key: t(`fodselsdato`),
                value: <SingleLineDateElement value={ektefelle.fodselsdato} />,
            });
        }
        systeminfo.push({
            key: t(`folkereg`),
            value: <OldSingleLineElement value={erFolkeregistrertSammen ? "Ja" : "Nei"} />,
        });
    }
    return (
        <div className="sivilstatus__ektefelleinfo">
            <OldSysteminfo systeminfoMap={systeminfo} />
        </div>
    );
};

const EktefelleDetaljer = () => {
    const {harDiskresjonskode} = useSelector((state: State) => state.soknadsdata.familie.sivilstatus);

    const {t} = useTranslation();

    return (
        <div className="sivilstatus skjema-sporsmal">
            <Sporsmal tekster={getFaktumSporsmalTekst(t, "system.familie.sivilstatus")} stil="system">
                <div className="sivilstatus__infotekst">{t("system.familie.sivilstatus")}</div>
                <div className="sivilstatus__giftlabel">
                    {harDiskresjonskode
                        ? t("system.familie.sivilstatus.ikkeTilgang.label")
                        : t("system.familie.sivilstatus.label")}
                    <EktefelleInformasjon />
                </div>
            </Sporsmal>
            {harDiskresjonskode !== true && (
                <Informasjonspanel farge="viktig" ikon={"ella"}>
                    <h4 className="skjema-sporsmal__infotekst__tittel">
                        {t("system.familie.sivilstatus.informasjonspanel.tittel")}
                    </h4>
                    {t("system.familie.sivilstatus.informasjonspanel.tekst")}
                </Informasjonspanel>
            )}
        </div>
    );
};

export default EktefelleDetaljer;
