import * as React from "react";
import {useState, useEffect} from "react";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {Status} from "./FamilieTypes";
import {Sivilstatus} from "./Sivilstatus";
import {EktefelleDetaljer} from "./EktefelleDetaljer";
import {Sporsmal} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {TextPlaceholder} from "../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {getFaktumSporsmalTekst} from "../../../nav-soknad/utils";
import {useTranslation} from "react-i18next";
import {REST_STATUS} from "../../../digisos/redux/soknadsdata/soknadsdataTypes";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";

const useSivilstatus = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {soknadsdata} = useSoknadsdata(SoknadsSti.SIVILSTATUS);
    const sivilstatus = soknadsdata.familie.sivilstatus;
    const restStatus = soknadsdata.restStatus.familie.sivilstatus;

    useEffect(() => {
        if (isLoading && restStatus === REST_STATUS.OK) setIsLoading(false);
    }, [isLoading, restStatus]);

    // Denne er vel unødvendig...
    if (isLoading && restStatus === REST_STATUS.OK) setIsLoading(false);

    return {sivilstatus, isLoading};
};

const DinSivilstatusView = () => {
    const {sivilstatus, isLoading} = useSivilstatus();
    const {t} = useTranslation("skjema");

    if (isLoading) {
        return (
            <Sporsmal tekster={getFaktumSporsmalTekst(t, "familie.sivilstatus")}>
                <TextPlaceholder lines={6} />
            </Sporsmal>
        );
    }

    if (sivilstatus?.sivilstatus === Status.GIFT && sivilstatus.kildeErSystem) {
        return <EktefelleDetaljer />;
    } else {
        return <Sivilstatus />;
    }
};

export default DinSivilstatusView;
