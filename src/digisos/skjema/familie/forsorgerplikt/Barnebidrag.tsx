import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import * as React from "react";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../../redux/reducers";
import {lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";

const FAKTUM_KEY = "familie.barn.true.barnebidrag";

const Barnebidrag = () => {
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);

    const dispatch = useDispatch();

    const handleClickRadio = (verdi: string) => {
        if (behandlingsId) {
            const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
            forsorgerplikt.barnebidrag = verdi;
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt));
            const payload = {
                barnebidrag: verdi,
            };
            dispatch(lagreSoknadsdata(behandlingsId, SoknadsSti.FORSORGERPLIKT, payload));
        }
    };

    const renderRadio = (verdi: string) => {
        const barnebidrag = soknadsdata.familie.forsorgerplikt.barnebidrag;
        return (
            <RadioEnhanced
                getName={() => "familie_barnebidrag_radio_" + verdi}
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
            <Sporsmal sprakNokkel="familie.barn.true.barnebidrag" legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
                {renderRadio("betaler")}
                {renderRadio("mottar")}
                {renderRadio("begge")}
                {renderRadio("ingen")}
            </Sporsmal>
        </div>
    );
};

export default Barnebidrag;
