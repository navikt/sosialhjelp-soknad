import * as React from "react";
import {useState, useEffect} from "react";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {Sivilstatus, Status} from "./FamilieTypes";
import SivilstatusComponent from "./SivilstatusComponent";
import EktefelleDetaljer from "./EktefelleDetaljer";
import Sporsmal from "../../../nav-soknad/components/sporsmal/Sporsmal";
import TextPlaceholder from "../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {getFaktumSporsmalTekst} from "../../../nav-soknad/utils";
import {useTranslation} from "react-i18next";
import {REST_STATUS} from "../../../digisos/redux/soknadsdata/soknadsdataTypes";
import {useHentSoknadsdata} from "../../../digisos/redux/soknadsdata/useHentSoknadsdata";

const DinSivilstatusView = () => {
    const [oppstartsModus, setOppstartsModus] = useState(true);

    const soknadsdata = useHentSoknadsdata(SoknadsSti.SIVILSTATUS);
    const {t} = useTranslation("skjema");

    useEffect(() => {
        const restStatus = soknadsdata.restStatus.familie.sivilstatus;
        if (oppstartsModus && restStatus === REST_STATUS.OK) {
            setOppstartsModus(false);
        }
    }, [oppstartsModus, soknadsdata.restStatus.familie.sivilstatus]);

    const sivilstatus: Sivilstatus = soknadsdata.familie.sivilstatus;
    const restStatus = soknadsdata.restStatus.familie.sivilstatus;
    if (oppstartsModus && restStatus === REST_STATUS.OK) {
        setOppstartsModus(false);
    }
    if (oppstartsModus) {
        return (
            <div className="skjema-sporsmal">
                <Sporsmal tekster={getFaktumSporsmalTekst(t, "familie.sivilstatus")}>
                    <TextPlaceholder lines={6} />
                </Sporsmal>
            </div>
        );
    }
    if (sivilstatus && sivilstatus.sivilstatus === Status.GIFT && sivilstatus.kildeErSystem) {
        return <EktefelleDetaljer />;
    } else {
        return <SivilstatusComponent />;
    }
};

export default DinSivilstatusView;
