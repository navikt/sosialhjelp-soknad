import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {SingleLineElement, Systeminfo} from "../../../../nav-soknad/components/systeminfo/Systeminfo";
import {capitalizeText} from "../../../../nav-soknad/utils/stringUtils";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import {useIntl} from "react-intl";

export const getFormatedStatsborgerskap = (statsborgerskap: string | null) => {
    if (statsborgerskap === "xxx" || statsborgerskap === "XXX") {
        return "Statsløs";
    }
    if (statsborgerskap === "???" || statsborgerskap === "XUK" || statsborgerskap === null) {
        return "Vi har ikke opplysninger om ditt statsborgerskap";
    }
    return capitalizeText(statsborgerskap);
};

const BasisPersonaliaView = () => {
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);

    const dispatch = useDispatch();
    const intl = useIntl();

    useEffect(() => {
        if (!behandlingsId) return;
        hentSoknadsdata(behandlingsId, SoknadsSti.BASIS_PERSONALIA, dispatch);
    }, [behandlingsId, dispatch]);

    const basisPersonalia = soknadsdata.personalia.basisPersonalia;
    const statsborgerskap = getFormatedStatsborgerskap(basisPersonalia && basisPersonalia.statsborgerskap);

    const restStatus = soknadsdata.restStatus.personalia.basisPersonalia;
    const visAnimerteStreker = restStatus !== REST_STATUS.OK;

    return (
        <Sporsmal
            tekster={getFaktumSporsmalTekst(intl, "kontakt.system.personalia")}
            stil={"system"}
            skjulLedetekst={visAnimerteStreker}
            sprakNokkel="kontakt.system.personalia"
        >
            {!visAnimerteStreker && basisPersonalia && (
                <Systeminfo
                    systeminfoMap={[
                        {
                            key: "kontakt.system.personalia.navn",
                            value: <SingleLineElement value={basisPersonalia.navn.fulltNavn} />,
                        },
                        {
                            key: "kontakt.system.personalia.fnr",
                            value: <SingleLineElement value={basisPersonalia.fodselsnummer} />,
                        },
                        {
                            key: "kontakt.system.personalia.statsborgerskap",
                            value: <SingleLineElement value={statsborgerskap} />,
                        },
                    ]}
                />
            )}
            {visAnimerteStreker && <TextPlaceholder lines={3} />}
        </Sporsmal>
    );
};

export default BasisPersonaliaView;
