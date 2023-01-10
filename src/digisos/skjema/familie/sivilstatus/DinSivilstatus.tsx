import * as React from "react";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {Sivilstatus, Status} from "./FamilieTypes";
import SivilstatusComponent from "./SivilstatusComponent";
import EktefelleDetaljer from "./EktefelleDetaljer";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import {useIntl} from "react-intl";

const DinSivilstatusView = () => {
    const [oppstartsModus, setOppstartsModus] = useState(true);

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);

    const dispatch = useDispatch();
    const intl = useIntl();

    useEffect(() => {
        if (behandlingsId) {
            hentSoknadsdata(behandlingsId, SoknadsSti.SIVILSTATUS, dispatch);
        }
    }, [behandlingsId, dispatch]);

    useEffect(() => {
        const restStatus = soknadsdata.restStatus.familie.sivilstatus;
        if (oppstartsModus && restStatus === REST_STATUS.OK) {
            setOppstartsModus(false);
        }
    }, [oppstartsModus, soknadsdata.restStatus.familie.sivilstatus]);

    const sivilstatus: Sivilstatus = soknadsdata.familie.sivilstatus;
    const restStatus = soknadsdata.restStatus.familie.sivilstatus;
    if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
        setOppstartsModus(false);
    }
    if (oppstartsModus) {
        return (
            <div className="skjema-sporsmal">
                <Sporsmal tekster={getFaktumSporsmalTekst(intl, "familie.sivilstatus")}>
                    <TextPlaceholder lines={6} />
                </Sporsmal>
            </div>
        );
    }
    if (sivilstatus && sivilstatus.sivilstatus === Status.GIFT && sivilstatus.kildeErSystem === true) {
        return <EktefelleDetaljer />;
    } else {
        return <SivilstatusComponent />;
    }
};

export default DinSivilstatusView;
