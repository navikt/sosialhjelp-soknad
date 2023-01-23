import {FormattedMessage, useIntl} from "react-intl";
import * as React from "react";
import {useSelector} from "react-redux";

import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import {DigisosFarge} from "../../../../nav-soknad/components/svg/DigisosFarger";
import Informasjonspanel from "../../../../nav-soknad/components/informasjonspanel";

import {State} from "../../../redux/reducers";
import {
    SingleLineDateElement,
    OldSingleLineElement,
    OldSysteminfo,
} from "../../../../nav-soknad/components/systeminfo/Systeminfo";

const INTL_ID_EKTEFELLE = "system.familie.sivilstatus.gift.ektefelle";

const SivilstatusLabel = (props: {ektefelleHarDiskresjonskode: boolean | undefined}) => {
    if (props.ektefelleHarDiskresjonskode && props.ektefelleHarDiskresjonskode === true) {
        return <FormattedMessage id="system.familie.sivilstatus.ikkeTilgang.label" />;
    }
    return <FormattedMessage id="system.familie.sivilstatus.label" />;
};

const EktefelleInformasjon = () => {
    const {ektefelle, erFolkeregistrertSammen} = useSelector((state: State) => state.soknadsdata.familie.sivilstatus);
    const systeminfo = [];

    if (ektefelle?.navn?.fulltNavn) {
        systeminfo.push({
            key: <FormattedMessage id={`${INTL_ID_EKTEFELLE}.navn`} />,
            value: <OldSingleLineElement value={ektefelle.navn.fulltNavn} />,
        });
        if (ektefelle?.fodselsdato) {
            systeminfo.push({
                key: <FormattedMessage id={`${INTL_ID_EKTEFELLE}.fodselsdato`} />,
                value: <SingleLineDateElement value={ektefelle.fodselsdato} />,
            });
        }
        systeminfo.push({
            key: <FormattedMessage id={`${INTL_ID_EKTEFELLE}.folkereg`} />,
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

    const intl = useIntl();

    return (
        <div className="sivilstatus skjema-sporsmal">
            <Sporsmal tekster={getFaktumSporsmalTekst(intl, "system.familie.sivilstatus")} stil="system">
                <div className="sivilstatus__infotekst">
                    <FormattedMessage id="system.familie.sivilstatus" />
                </div>
                <div className="sivilstatus__giftlabel">
                    <SivilstatusLabel ektefelleHarDiskresjonskode={harDiskresjonskode} />
                    <EktefelleInformasjon />
                </div>
            </Sporsmal>
            {harDiskresjonskode !== true && (
                <Informasjonspanel farge={DigisosFarge.VIKTIG} ikon={"ella"}>
                    <h4 className="skjema-sporsmal__infotekst__tittel">
                        <FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tittel" />
                    </h4>
                    <FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tekst" />
                </Informasjonspanel>
            )}
        </div>
    );
};

export default EktefelleDetaljer;
