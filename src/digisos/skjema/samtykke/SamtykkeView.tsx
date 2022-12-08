import * as React from "react";
import {useEffect} from "react";
import Panel from "nav-frontend-paneler";
import {getIntlTextOrKey, getStegUrl} from "../../../nav-soknad/utils";
import {FormattedMessage, useIntl} from "react-intl";
import AppBanner from "../../../nav-soknad/components/appHeader/AppHeader";
import {Checkbox} from "nav-frontend-skjema";
import {useDispatch, useSelector} from "react-redux";
import {getErSystemdataEndret, hentSamtykker, oppdaterSamtykke} from "../../redux/soknad/soknadActions";
import {State} from "../../redux/reducers";
import {REST_STATUS} from "../../redux/soknad/soknadTypes";
import {ErSystemdataEndret, Samtykke} from "../../redux/soknad/soknadActionTypes";
import EllaKompakt from "../../../nav-soknad/components/svg/EllaKompakt";
import {useHistory} from "react-router";
import {ApplicationSpinner} from "../../../nav-soknad/components/applicationSpinner/ApplicationSpinner";
import {Button, GuidePanel} from "@navikt/ds-react";
import styled from "styled-components";
import {WhiteBackground} from "../../../nav-soknad/components/WhiteBackground";

const StyledGuidePanel = styled(GuidePanel)`
    /* TODO: Bytte ut --a-orange-200 med eks --a-surface-warning-subtle ? */
    --ac-guide-panel-border: var(--a-orange-200);
    --ac-guide-panel-illustration-bg: var(--a-orange-200);
    margin-bottom: 2rem;
`;

const SamtykkeView: React.FC = () => {
    const intl = useIntl();
    const dispatch = useDispatch();

    const behandlingsId: string | undefined = useSelector((state: State) => state.soknad.behandlingsId);
    const erSystemdataEndret: ErSystemdataEndret = useSelector((state: State) => state.soknad.erSystemdataEndret);
    const samtykker: Samtykke[] | undefined = useSelector((state: State) => state.soknad.samtykker);
    const samtykkeRestStatus: REST_STATUS = useSelector((state: State) => state.soknad.samtykkeRestStatus);
    let samtykkerTekst: string = "";

    const history = useHistory();

    useEffect(() => {
        if (behandlingsId) {
            dispatch(getErSystemdataEndret(behandlingsId));
            dispatch(hentSamtykker(behandlingsId));
        }
    }, [behandlingsId, dispatch]);

    const harLastetinnSamtykker = samtykkeRestStatus === REST_STATUS.OK;
    let harAvsjekketSamtykkeBoksen: boolean = false;
    let harSamtykker: boolean = false;

    if (harLastetinnSamtykker && samtykker) {
        const faktiskeSamtykker = samtykker.filter((samtykke) => (samtykke.verdi ? samtykke.verdi : false));
        harSamtykker = faktiskeSamtykker.length > 0;
        faktiskeSamtykker.forEach(function (item) {
            const text = getIntlTextOrKey(intl, "informasjon.samtykke." + item.type);
            samtykkerTekst += samtykkerTekst === "" ? text : " og " + text;
        });
    }

    if (harLastetinnSamtykker && behandlingsId && !harSamtykker && erSystemdataEndret === ErSystemdataEndret.NO) {
        history.push(getStegUrl(behandlingsId, 1));
    }

    function knappOppdaterSamtykkeOgGaTilSteg1() {
        if (behandlingsId && samtykker) {
            dispatch(oppdaterSamtykke(behandlingsId, harAvsjekketSamtykkeBoksen, samtykker, history));
        }
    }

    return (
        <WhiteBackground className="app-digisos">
            <AppBanner />
            {(!harLastetinnSamtykker || erSystemdataEndret === ErSystemdataEndret.NOT_ASKED) && <ApplicationSpinner />}
            {(harSamtykker || erSystemdataEndret === ErSystemdataEndret.YES) && (
                <Panel className={"skjema-content"}>
                    <StyledGuidePanel illustration={<EllaKompakt />} poster>
                        {erSystemdataEndret === ErSystemdataEndret.YES && (
                            <div className="skjemaelement--horisontal" style={{marginBottom: "8px"}}>
                                <FormattedMessage id="oppsummering.systemdataendret.true" />
                            </div>
                        )}
                        {harSamtykker && (
                            <>
                                <div className="skjemaelement--horisontal" style={{marginBottom: "8px"}}>
                                    <FormattedMessage id="informasjon.samtykke.info_del1" />
                                    {" " + samtykkerTekst + ". "}
                                    <FormattedMessage id="informasjon.samtykke.info_del2" />
                                </div>
                                <Checkbox
                                    label={
                                        getIntlTextOrKey(intl, "informasjon.samtykke.sporsmal") +
                                        " " +
                                        samtykkerTekst +
                                        "."
                                    }
                                    onChange={(event: any) => (harAvsjekketSamtykkeBoksen = event.target.checked)}
                                />
                            </>
                        )}
                    </StyledGuidePanel>
                    <Button
                        variant="primary"
                        id="gi_bostotte_samtykke"
                        onClick={() => {
                            knappOppdaterSamtykkeOgGaTilSteg1();
                        }}
                        className="samtykke_knapp_padding"
                    >
                        {getIntlTextOrKey(intl, "informasjon.samtykke.knapp")}
                    </Button>
                </Panel>
            )}
        </WhiteBackground>
    );
};

export default SamtykkeView;
