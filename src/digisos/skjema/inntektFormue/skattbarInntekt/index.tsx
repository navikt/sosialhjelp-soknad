import * as React from "react";
import {FormattedMessage} from "react-intl";
import {Panel} from "nav-frontend-paneler";
import Lesmerpanel from "nav-frontend-lesmerpanel";
import {useDispatch, useSelector} from "react-redux";

import {
    SkattbarInntektInfo,
    SoknadsSti,
} from "../../../redux/soknadsdata/soknadsdataReducer";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {SkattbarInntekt} from "./inntektTypes";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import SkattbarinntektForskuddstrekk from "./SkattbarinntektForskuddstrekk";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata, settSamtykkeOgOppdaterData} from "../../../redux/soknadsdata/soknadsdataActions";
import Knapp from "nav-frontend-knapper";

const Skatt = () => {
    const dispatch = useDispatch();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector(
        (state: State) => state.soknad.behandlingsId
    );

    React.useEffect(() => {
        if (behandlingsId) {
            dispatch(
                hentSoknadsdata(behandlingsId, SoknadsSti.SKATTBARINNTEKT)
            );
        }
    }, [behandlingsId, dispatch]);

    const restStatus =
        soknadsdata.restStatus.inntekt.skattbarinntektogforskuddstrekk;
    const skattbarinntektogforskuddstrekk: SkattbarInntektInfo =
        soknadsdata.inntekt.skattbarinntektogforskuddstrekk;
    const harSamtykke: boolean = soknadsdata.inntekt.skattbarinntektogforskuddstrekk.samtykke;
    const visAnimerteStreker = restStatus !== REST_STATUS.OK;

    // TODO DIGISOS-1175: Håndter flere måneder med skattbar inntekt
    const inntektFraSkatteetaten: SkattbarInntekt[] =
        skattbarinntektogforskuddstrekk.inntektFraSkatteetaten;
    const inntektFraSkatteetatenFeilet: boolean =
        skattbarinntektogforskuddstrekk.inntektFraSkatteetatenFeilet;
    const skattbarTittel: JSX.Element = (
        <h4>
            <FormattedMessage id="utbetalinger.inntekt.skattbar.tittel" />
        </h4>
    );

    function handleSettSkatteetatenSamtykke(harSamtykke: boolean) {
        if (!visAnimerteStreker && behandlingsId) {
            dispatch(settSamtykkeOgOppdaterData(
                behandlingsId,
                SoknadsSti.SKATTBARINNTEKT_SAMTYKKE,
                harSamtykke,
                SoknadsSti.SKATTBARINNTEKT
            ))

        }
    }

    return (
        <div className={"skatt-wrapper"}>
            {harSamtykke && inntektFraSkatteetatenFeilet && (
                <Panel border={true} className={"ytelser_panel"}>
                    <div>
                        {skattbarTittel}
                        <FormattedMessage id="utbetalinger.skattbar.kontaktproblemer" />
                    </div>
                </Panel>
            )}
            {!visAnimerteStreker &&
                inntektFraSkatteetaten &&
                inntektFraSkatteetaten.length > 0 && (
                    <Lesmerpanel
                        apneTekst={"Se detaljer"}
                        lukkTekst={"Lukk"}
                        intro={
                            <div>
                                {skattbarTittel}
                                <FormattedMessage id="utbetalinger.inntekt.skattbar.beskrivelse" />
                            </div>
                        }
                        border={true}
                    >
                        <div className="utbetalinger">
                            <SkattbarinntektForskuddstrekk
                                skattbarinntektogforskuddstrekk={
                                    inntektFraSkatteetaten
                                }
                            />
                        </div>
                        <Knapp
                            id="ta_bort_bostotte_samtykke"
                            type="flat"
                            mini={true}
                            onClick={() => {
                                handleSettSkatteetatenSamtykke(false)
                            }}
                        >
                            <FormattedMessage id="utbetalinger.inntekt.skattbar.ta_bort_samtykke" />
                        </Knapp>
                    </Lesmerpanel>
                )}
            {!visAnimerteStreker &&
                !inntektFraSkatteetatenFeilet &&
                inntektFraSkatteetaten &&
                inntektFraSkatteetaten.length === 0 && (
                    <Panel border={true} className={"ytelser_panel"}>
                        {harSamtykke && (
                            <>
                                <div>
                                    {skattbarTittel}
                                    <FormattedMessage id="utbetalinger.inntekt.skattbar.ingen" />
                                </div>
                                <Knapp
                                    id="ta_bort_bostotte_samtykke"
                                    type="flat"
                                    mini={true}
                                    onClick={() => {
                                        handleSettSkatteetatenSamtykke(false)
                                    }}
                                >
                                    <FormattedMessage id="utbetalinger.inntekt.skattbar.ta_bort_samtykke"/>
                                </Knapp>
                            </>
                        )}
                        {!harSamtykke && (
                            <>
                                <div>
                                    <h4>
                                        <FormattedMessage id="utbetalinger.inntekt.skattbar.samtykke_sporsmal" />
                                    </h4>
                                    <FormattedMessage id="utbetalinger.inntekt.skattbar.samtykke_info" />
                                </div>
                                <Knapp
                                    id="gi_bostotte_samtykke"
                                    type="standard"
                                    mini={false}
                                    onClick={() => {
                                        handleSettSkatteetatenSamtykke(true)
                                    }}
                                >
                                    <FormattedMessage id="utbetalinger.inntekt.skattbar.gi_samtykke"/>
                                </Knapp>
                            </>
                        )}
                    </Panel>
                )}
            {visAnimerteStreker && <TextPlaceholder lines={3} />}
        </div>
    );
};

export {Skatt};

export default Skatt;
