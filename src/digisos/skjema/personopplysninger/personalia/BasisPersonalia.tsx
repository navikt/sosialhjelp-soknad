import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import {hentSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {SingleLineElement, Systeminfo} from "../../../../nav-soknad/components/systeminfo/Systeminfo";
import {capitalizeText} from "../../../../nav-soknad/utils/stringUtils";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import {FormattedMessage, useIntl} from "react-intl";
import {useSoknadsdata} from "../../../redux/soknadsdata/useSoknadsdata";
import {useBehandlingsId} from "../../../../nav-soknad/hooks/useBehandlingsId";
import * as React from "react";

// TODO: Hvor er denne dataen, spesielt casene xxx/???/XUK dokumentert?
export const fmtStatsborgerskap = (statsborgerskap: string | null) => {
    if (statsborgerskap?.toLowerCase() === "xxx") return "Statsløs";

    if (statsborgerskap === "???" || statsborgerskap === "XUK" || statsborgerskap === null) {
        return "Vi har ikke opplysninger om ditt statsborgerskap";
    }

    return capitalizeText(statsborgerskap);
};

const BasisPersonaliaView = () => {
    const {
        personalia: {basisPersonalia},
        restStatus,
    } = useSoknadsdata();
    const behandlingsId = useBehandlingsId();

    const loading = restStatus.personalia.basisPersonalia !== REST_STATUS.OK;

    const dispatch = useDispatch();
    const intl = useIntl();

    useEffect(() => {
        hentSoknadsdata(behandlingsId, SoknadsSti.BASIS_PERSONALIA, dispatch);
    }, [behandlingsId, dispatch]);

    return (
        <Sporsmal
            tekster={getFaktumSporsmalTekst(intl, "kontakt.system.personalia")}
            stil={"system"}
            skjulLedetekst={loading}
        >
            {loading ? (
                <TextPlaceholder lines={3} />
            ) : (
                <Systeminfo
                    systeminfoMap={[
                        {
                            key: <FormattedMessage id={"kontakt.system.personalia.navn"} />,
                            value: <SingleLineElement value={basisPersonalia.navn.fulltNavn} />,
                        },
                        {
                            key: <FormattedMessage id={"kontakt.system.personalia.fnr"} />,
                            value: <SingleLineElement value={basisPersonalia.fodselsnummer} />,
                        },
                        {
                            key: <FormattedMessage id={"kontakt.system.personalia.statsborgerskap"} />,
                            value: <SingleLineElement value={fmtStatsborgerskap(basisPersonalia?.statsborgerskap)} />,
                        },
                    ]}
                />
            )}
        </Sporsmal>
    );
};

export default BasisPersonaliaView;
