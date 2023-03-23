import * as React from "react";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst} from "../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../nav-soknad/faktum/JaNeiSporsmal";
import {Barneutgifter, BarneutgifterKeys} from "./BarneutgifterTypes";
import CheckboxPanel from "../../../nav-soknad/faktum/CheckboxPanel";
import {useDispatch} from "react-redux";
import {lagreSoknadsdata} from "../../../digisos/redux/soknadsdata/soknadsdataActions";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {useHentSoknadsdata} from "../../../digisos/redux/soknadsdata/useHentSoknadsdata";

const BarneutgifterKey = "utgifter.barn";

export const BarneutgifterView = () => {
    const behandlingsId = useBehandlingsId();
    const soknadsdata = useHentSoknadsdata(SoknadsSti.BARNEUTGIFTER);

    const dispatch = useDispatch();

    const {t} = useTranslation("skjema");

    const handleClickJaNeiSpsm = (verdi: boolean) => {
        const barneutgifter: Barneutgifter = soknadsdata.utgifter.barneutgifter;
        barneutgifter.bekreftelse = verdi;
        if (!verdi) {
            barneutgifter.fritidsaktiviteter = false;
            barneutgifter.barnehage = false;
            barneutgifter.sfo = false;
            barneutgifter.tannregulering = false;
            barneutgifter.annet = false;
        }
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.BARNEUTGIFTER, barneutgifter));
        lagreSoknadsdata(behandlingsId, SoknadsSti.BARNEUTGIFTER, barneutgifter, dispatch);
    };

    const handleClickRadio = (idToToggle: BarneutgifterKeys) => {
        const barneutgifter: Barneutgifter = soknadsdata.utgifter.barneutgifter;
        barneutgifter[idToToggle] = !barneutgifter[idToToggle];
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.BARNEUTGIFTER, barneutgifter));
        lagreSoknadsdata(behandlingsId, SoknadsSti.BARNEUTGIFTER, barneutgifter, dispatch);
    };

    const renderCheckBox = (navn: BarneutgifterKeys, textKey: string) => {
        const barneutgifter: Barneutgifter = soknadsdata.utgifter.barneutgifter;

        const barneutgifterElement: boolean | null = barneutgifter[navn];
        const isChecked: boolean = barneutgifterElement ? barneutgifterElement : false;

        return (
            <CheckboxPanel
                id={"barneutgifter_" + navn + "_checkbox"}
                name={navn}
                checked={isChecked}
                label={t(BarneutgifterKey + ".true.utgifter." + textKey)}
                onClick={() => handleClickRadio(navn)}
            />
        );
    };

    const barneutgifter: Barneutgifter = soknadsdata.utgifter.barneutgifter;
    return (
        <JaNeiSporsmal
            tekster={getFaktumSporsmalTekst(t, BarneutgifterKey)}
            visible={barneutgifter.harForsorgerplikt}
            faktumKey={BarneutgifterKey}
            verdi={barneutgifter.bekreftelse}
            onChange={(verdi: boolean) => handleClickJaNeiSpsm(verdi)}
            legendTittelStyle={LegendTittleStyle.FET_NORMAL}
        >
            <Sporsmal
                tekster={getFaktumSporsmalTekst(t, BarneutgifterKey + ".true.utgifter")}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                {renderCheckBox(BarneutgifterKeys.FRITIDSAKTIVITETER, BarneutgifterKeys.FRITIDSAKTIVITETER)}
                {renderCheckBox(BarneutgifterKeys.BARNEHAGE, BarneutgifterKeys.BARNEHAGE)}
                {renderCheckBox(BarneutgifterKeys.SFO, BarneutgifterKeys.SFO)}
                {renderCheckBox(BarneutgifterKeys.TANNREGULERING, BarneutgifterKeys.TANNREGULERING)}
                {renderCheckBox(BarneutgifterKeys.ANNET, BarneutgifterKeys.ANNET)}
            </Sporsmal>
        </JaNeiSporsmal>
    );
};

export default BarneutgifterView;
