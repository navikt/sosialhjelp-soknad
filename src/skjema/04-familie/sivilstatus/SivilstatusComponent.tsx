import {Familie, lagBlankPerson, Status} from "./FamilieTypes";
import * as React from "react";
import {useDispatch} from "react-redux";

import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import RadioEnhanced from "../../../nav-soknad/faktum/RadioEnhanced";
import Underskjema from "../../../nav-soknad/components/underskjema";
import PersonSkjema from "./PersonSkjema";
import {oppdaterSoknadsdataSti, SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {lagreSoknadsdata} from "../../../digisos/redux/soknadsdata/soknadsdataActions";
import {getFaktumSporsmalTekst} from "../../../nav-soknad/utils";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {Alert, BodyShort, Heading} from "@navikt/ds-react";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";

interface RadioProps {
    id?: string;
    verdi: Status;
    checked: boolean;
    onClick: (verdi: Status) => void;
}

const SivilstatusRadioknapp: React.FunctionComponent<RadioProps> = ({verdi, id, checked, onClick}) => {
    const componentId = id ? id : "sivilstatus_" + verdi + "_radio";
    return (
        <RadioEnhanced
            name="sivilstatus"
            id={componentId}
            faktumKey="familie.sivilstatus"
            value={verdi}
            checked={checked}
            onChange={() => onClick(verdi)}
        />
    );
};

const SivilstatusComponent = () => {
    const behandlingsId = useBehandlingsId();
    const soknadsdata = useSoknadsdata();

    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");

    const onClickSivilstatus = (verdi: Status) => {
        if (behandlingsId) {
            let sivilstatus = soknadsdata.familie.sivilstatus;
            const oldStatus = sivilstatus.sivilstatus;
            if (oldStatus !== verdi) {
                if (verdi === Status.GIFT) {
                    sivilstatus = {
                        kildeErSystem: false,
                        sivilstatus: Status.GIFT,
                        ektefelle: lagBlankPerson(),
                    };
                } else {
                    sivilstatus = {
                        kildeErSystem: false,
                        sivilstatus: verdi,
                    };
                }
                dispatch(oppdaterSoknadsdataSti(SoknadsSti.SIVILSTATUS, sivilstatus));
                lagreSoknadsdata(behandlingsId, SoknadsSti.SIVILSTATUS, sivilstatus, dispatch);
            }
        }
    };

    const familie: Familie = soknadsdata.familie;
    const sivilstatus = familie && familie.sivilstatus ? familie.sivilstatus.sivilstatus : null;

    return (
        <div className="skjema-sporsmal">
            <Sporsmal tekster={getFaktumSporsmalTekst(t, "familie.sivilstatus")}>
                <SivilstatusRadioknapp
                    verdi={Status.GIFT}
                    checked={sivilstatus === Status.GIFT}
                    onClick={(verdi) => onClickSivilstatus(verdi)}
                />
                {sivilstatus === Status.GIFT && (
                    <div className="skjema-sporsmal--jaNeiSporsmal">
                        <Underskjema visible={sivilstatus === Status.GIFT} arrow={true}>
                            <Sporsmal
                                tekster={getFaktumSporsmalTekst(t, "familie.sivilstatus.gift.ektefelle")}
                                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
                            >
                                <div className="blokk-s">
                                    <PersonSkjema />
                                </div>
                            </Sporsmal>
                        </Underskjema>
                    </div>
                )}
                <SivilstatusRadioknapp
                    verdi={Status.UGIFT}
                    checked={sivilstatus === Status.UGIFT}
                    onClick={(verdi) => onClickSivilstatus(verdi)}
                />
                <SivilstatusRadioknapp
                    verdi={Status.SAMBOER}
                    checked={sivilstatus === Status.SAMBOER}
                    onClick={(verdi) => onClickSivilstatus(verdi)}
                />
                <SivilstatusRadioknapp
                    verdi={Status.ENKE}
                    checked={sivilstatus === Status.ENKE}
                    onClick={(verdi) => onClickSivilstatus(verdi)}
                />
                <SivilstatusRadioknapp
                    verdi={Status.SKILT}
                    checked={sivilstatus === Status.SKILT}
                    onClick={(verdi) => onClickSivilstatus(verdi)}
                />
                <SivilstatusRadioknapp
                    verdi={Status.SEPARERT}
                    checked={sivilstatus === Status.SEPARERT}
                    onClick={(verdi) => onClickSivilstatus(verdi)}
                />
            </Sporsmal>
            {sivilstatus === Status.GIFT && (
                <Alert variant={"warning"}>
                    <Heading level={"4"} size={"small"} spacing>
                        {t("system.familie.sivilstatus.informasjonspanel.tittel")}
                    </Heading>
                    <BodyShort>{t("system.familie.sivilstatus.informasjonspanel.tekst")}</BodyShort>
                </Alert>
            )}
        </div>
    );
};

export default SivilstatusComponent;
