import * as React from "react";
import {FormattedMessage} from "react-intl";
import Panel from "nav-frontend-paneler";
import Lesmerpanel from "nav-frontend-lesmerpanel";
import {useDispatch, useSelector} from "react-redux";

import {SkattbarInntektInfo, SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {SkattbarInntekt} from "./inntektTypes";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import SkattbarinntektForskuddstrekk from "./SkattbarinntektForskuddstrekk";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";

const Skatt = () => {
    const dispatch = useDispatch();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);

    React.useEffect(() => {
        if (behandlingsId) {
            dispatch(hentSoknadsdata(behandlingsId, SoknadsSti.SKATTBARINNTEKT));
        }
    }, [behandlingsId, dispatch]);

    const restStatus = soknadsdata.restStatus.inntekt.skattbarinntektogforskuddstrekk;
    const skattbarinntektogforskuddstrekk: SkattbarInntektInfo = soknadsdata.inntekt.skattbarinntektogforskuddstrekk;
    const visAnimerteStreker = restStatus !== REST_STATUS.OK;

    // TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt
    const inntektFraSkatteetaten: SkattbarInntekt[] = skattbarinntektogforskuddstrekk.inntektFraSkatteetaten;
    const inntektFraSkatteetatenFeilet: boolean = skattbarinntektogforskuddstrekk.inntektFraSkatteetatenFeilet;
    const tittel: JSX.Element = (
        <h4>
            <FormattedMessage id="utbetalinger.inntekt.skattbar.tittel" />
        </h4>
    );

    return (
        <div className={"skatt-wrapper"}>
            {inntektFraSkatteetatenFeilet && (
                <Panel border={true} className={"ytelser_panel"}>
                    <div>
                        {tittel}
                        <FormattedMessage id="utbetalinger.skattbar.kontaktproblemer" />
                    </div>
                </Panel>
            )}
            {!visAnimerteStreker && inntektFraSkatteetaten && inntektFraSkatteetaten.length > 0 && (
                <Lesmerpanel
                    apneTekst={"Se detaljer"}
                    lukkTekst={"Lukk"}
                    intro={
                        <div>
                            {tittel}
                            <FormattedMessage id="utbetalinger.inntekt.skattbar.beskrivelse" />
                        </div>
                    }
                    border={true}
                >
                    <div className="utbetalinger">
                        <SkattbarinntektForskuddstrekk skattbarinntektogforskuddstrekk={inntektFraSkatteetaten} />
                    </div>
                </Lesmerpanel>
            )}
            {!visAnimerteStreker &&
                !inntektFraSkatteetatenFeilet &&
                inntektFraSkatteetaten &&
                inntektFraSkatteetaten.length === 0 && (
                    <Panel border={true} className={"ytelser_panel"}>
                        <div>
                            <h4>{tittel}</h4>
                            <FormattedMessage id="utbetalinger.inntekt.skattbar.ingen" />
                        </div>
                    </Panel>
                )}
            {visAnimerteStreker && <TextPlaceholder lines={3} />}
        </div>
    );
};

export {Skatt};

export default Skatt;
