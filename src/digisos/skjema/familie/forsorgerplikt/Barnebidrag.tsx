import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import * as React from "react";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../../redux/reducers";
import {lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import {useTranslation} from "react-i18next";

const FAKTUM_KEY = "familie.barn.true.barnebidrag";

const Barnebidrag = () => {
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const dispatch = useDispatch();
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const {t} = useTranslation("skjema");

    const handleClickRadio = (verdi: string) => {
        if (behandlingsId) {
            const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
            forsorgerplikt.barnebidrag = verdi;
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt));
            lagreSoknadsdata(behandlingsId, SoknadsSti.FORSORGERPLIKT, forsorgerplikt, dispatch);
        }
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
