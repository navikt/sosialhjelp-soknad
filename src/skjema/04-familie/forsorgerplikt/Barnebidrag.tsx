import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import * as React from "react";
import RadioEnhanced from "../../../nav-soknad/faktum/RadioEnhanced";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {getFaktumSporsmalTekst} from "../../../nav-soknad/utils";
import {useTranslation} from "react-i18next";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";

const FAKTUM_KEY = "familie.barn.true.barnebidrag";

const Barnebidrag = () => {
    const {soknadsdata, lagre, oppdater} = useSoknadsdata(SoknadsSti.FORSORGERPLIKT);
    const {t} = useTranslation("skjema");

    const handleClickRadio = (verdi: string) => {
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        forsorgerplikt.barnebidrag = verdi;
        oppdater(forsorgerplikt);
        lagre(forsorgerplikt);
    };

    const renderRadio = (verdi: string) => {
        const barnebidrag = soknadsdata.familie.forsorgerplikt.barnebidrag;
        return (
            <RadioEnhanced
                name="familie_barnebidrag_radio"
                id={"familie_barnebidrag_radio_" + verdi}
                faktumKey={FAKTUM_KEY}
                value={verdi}
                checked={verdi === barnebidrag}
                onChange={() => handleClickRadio(verdi)}
            />
        );
    };

    return (
        <div className="blokk barnebidrag">
            <Sporsmal
                tekster={getFaktumSporsmalTekst(t, "familie.barn.true.barnebidrag")}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                {renderRadio("betaler")}
                {renderRadio("mottar")}
                {renderRadio("begge")}
                {renderRadio("ingen")}
            </Sporsmal>
        </div>
    );
};

export default Barnebidrag;
