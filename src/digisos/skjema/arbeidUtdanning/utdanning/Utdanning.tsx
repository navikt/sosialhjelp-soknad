import * as React from "react";
import {useDispatch} from "react-redux";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {hentSoknadsdata, lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {useSoknadsdata} from "../../../redux/soknadsdata/useSoknadsdata";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../../nav-soknad/hooks/useBehandlingsId";

const FAKTUM_STUDIER = "dinsituasjon.studerer";
const FAKTUM_STUDERER = "dinsituasjon.studerer.true.grad";

const UtdanningView = () => {
    const behandlingsId = useBehandlingsId();
    const {utdanning} = useSoknadsdata();
    const {erStudent, studengradErHeltid} = utdanning;

    const dispatch = useDispatch();

    const {t} = useTranslation("skjema");

    React.useEffect(() => {
        behandlingsId && hentSoknadsdata(behandlingsId, SoknadsSti.UTDANNING, dispatch);
    }, [behandlingsId, dispatch]);

    const handleClickJaNeiSpsm = (erStudent: boolean) => {
        if (!behandlingsId) return;

        const nyUtdanning = {...utdanning, erStudent};

        dispatch(oppdaterSoknadsdataSti(SoknadsSti.UTDANNING, nyUtdanning));
        lagreSoknadsdata(behandlingsId, SoknadsSti.UTDANNING, nyUtdanning, dispatch);
    };

    const handleClickHeltidDeltid = (studengradErHeltid: boolean) => {
        if (!behandlingsId) return;

        const nyUtdanning = {...utdanning, studengradErHeltid};

        dispatch(oppdaterSoknadsdataSti(SoknadsSti.UTDANNING, nyUtdanning));
        lagreSoknadsdata(behandlingsId, SoknadsSti.UTDANNING, nyUtdanning, dispatch);
    };

    return (
        <JaNeiSporsmal
            tekster={getFaktumSporsmalTekst(t, FAKTUM_STUDIER)}
            faktumKey={FAKTUM_STUDIER}
            verdi={erStudent}
            onChange={(verdi: boolean) => handleClickJaNeiSpsm(verdi)}
            legendTittelStyle={LegendTittleStyle.FET_NORMAL}
        >
            <Sporsmal
                tekster={getFaktumSporsmalTekst(t, FAKTUM_STUDERER)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <RadioEnhanced
                    name="studerer_radio"
                    id="studerer_radio_heltid"
                    faktumKey={FAKTUM_STUDERER}
                    value="heltid"
                    checked={studengradErHeltid === true}
                    onChange={() => handleClickHeltidDeltid(true)}
                />
                <RadioEnhanced
                    name="studerer_radio"
                    id="studerer_radio_deltid"
                    faktumKey={FAKTUM_STUDERER}
                    value="deltid"
                    checked={studengradErHeltid === false}
                    onChange={() => handleClickHeltidDeltid(false)}
                />
            </Sporsmal>
        </JaNeiSporsmal>
    );
};

export default UtdanningView;
