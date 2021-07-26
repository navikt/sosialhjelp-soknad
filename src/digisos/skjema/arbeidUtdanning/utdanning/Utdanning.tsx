import * as React from "react";
import {useSelector, useDispatch} from "react-redux";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import {useIntl} from "react-intl";

import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata, lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";

const FAKTUM_STUDIER = "dinsituasjon.studerer";
const FAKTUM_STUDERER = "dinsituasjon.studerer.true.grad";

const UtdanningView = () => {
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const soknadsdata = useSelector((state: State) => state.soknadsdata);

    const dispatch = useDispatch();

    const intl = useIntl();

    React.useEffect(() => {
        if (behandlingsId) {
            hentSoknadsdata(behandlingsId, SoknadsSti.UTDANNING, dispatch);
        }
    }, [behandlingsId, dispatch]);

    const handleClickJaNeiSpsm = (verdi: boolean) => {
        if (behandlingsId) {
            const utdanning = soknadsdata.utdanning;
            utdanning.erStudent = verdi;
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.UTDANNING, utdanning));
            lagreSoknadsdata(behandlingsId, SoknadsSti.UTDANNING, utdanning, dispatch);
        }
    };

    const handleClickHeltidDeltid = (verdi: boolean) => {
        if (behandlingsId) {
            const utdanning = soknadsdata.utdanning;
            utdanning.studengradErHeltid = verdi;
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.UTDANNING, utdanning));
            lagreSoknadsdata(behandlingsId, SoknadsSti.UTDANNING, utdanning, dispatch);
        }
    };

    const utdanning = soknadsdata.utdanning;
    const {erStudent, studengradErHeltid} = utdanning;
    return (
        <JaNeiSporsmal
            tekster={getFaktumSporsmalTekst(intl, FAKTUM_STUDIER)}
            faktumKey={FAKTUM_STUDIER}
            verdi={erStudent}
            onChange={(verdi: boolean) => handleClickJaNeiSpsm(verdi)}
            legendTittelStyle={LegendTittleStyle.FET_NORMAL}
        >
            <Sporsmal
                tekster={getFaktumSporsmalTekst(intl, FAKTUM_STUDERER)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <RadioEnhanced
                    name="studerer_radio"
                    id="studerer_radio_heltid"
                    faktumKey={FAKTUM_STUDERER}
                    value="heltid"
                    checked={studengradErHeltid !== null && studengradErHeltid === true}
                    onChange={() => handleClickHeltidDeltid(true)}
                />
                <RadioEnhanced
                    name="studerer_radio"
                    id="studerer_radio_deltid"
                    faktumKey={FAKTUM_STUDERER}
                    value="deltid"
                    checked={studengradErHeltid !== null && studengradErHeltid === false}
                    onChange={() => handleClickHeltidDeltid(false)}
                />
            </Sporsmal>
        </JaNeiSporsmal>
    );
};

export default UtdanningView;
