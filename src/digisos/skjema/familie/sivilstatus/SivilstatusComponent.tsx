import {Familie, lagBlankPerson, Status} from "./FamilieTypes";
import {FormattedMessage, useIntl} from "react-intl";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";

import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import {DigisosFarge} from "../../../../nav-soknad/components/svg/DigisosFarger";
import Informasjonspanel from "../../../../nav-soknad/components/informasjonspanel";
import PersonSkjema from "./PersonSkjema";
import {oppdaterSoknadsdataSti, SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {State} from "../../../redux/reducers";
import {lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";

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
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const soknadsdata = useSelector((state: State) => state.soknadsdata);

    const dispatch = useDispatch();
    const intl = useIntl();

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
            <Sporsmal tekster={getFaktumSporsmalTekst(intl, "familie.sivilstatus")}>
                <SivilstatusRadioknapp
                    verdi={Status.GIFT}
                    checked={sivilstatus === Status.GIFT}
                    onClick={(verdi) => onClickSivilstatus(verdi)}
                />
                {sivilstatus === Status.GIFT && (
                    <div className="skjema-sporsmal--jaNeiSporsmal">
                        <Underskjema visible={sivilstatus === Status.GIFT} arrow={true}>
                            <Sporsmal
                                tekster={getFaktumSporsmalTekst(intl, "familie.sivilstatus.gift.ektefelle")}
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

export default SivilstatusComponent;
