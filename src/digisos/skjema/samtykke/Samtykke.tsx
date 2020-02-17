import * as React from "react";
import {useEffect} from "react";
import {Panel} from "nav-frontend-paneler";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import Knapp from "nav-frontend-knapper";
import {FormattedMessage, useIntl} from "react-intl";
import AppBanner from "../../../nav-soknad/components/appHeader/AppHeader";
import {Checkbox} from "nav-frontend-skjema";
import {useDispatch, useSelector} from "react-redux";
import {getErSystemdataEndret, hentSamtykker, oppdaterSamtykke} from "../../redux/soknad/soknadActions";
import {State} from "../../redux/reducers";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import {REST_STATUS} from "../../redux/soknad/soknadTypes";
import {ErSystemdataEndret, Samtykke} from "../../redux/soknad/soknadActionTypes";

const SamtykkeView: React.FC = () => {
    const intl = useIntl();
    let harSamtykket: boolean = false;

    const dispatch = useDispatch();

    const erSystemdataEndret: ErSystemdataEndret = useSelector(
        (state: State) => state.soknad.erSystemdataEndret
    );
    const behandlingsId: string | undefined = useSelector(
        (state: State) => state.soknad.behandlingsId
    );
    const samtykker: Samtykke[] | undefined = useSelector(
        (state: State) => state.soknad.samtykker
    );
    const samtykkeRestStatus: REST_STATUS = useSelector(
        (state: State) => state.soknad.restStatus
    );

    const harLastetinnSamtykker = samtykkeRestStatus === REST_STATUS.OK;
    let harSamtykker: boolean = false;
    let samtykkerTekst: string = "";
    if (harLastetinnSamtykker && samtykker) {
        const faktiskeSamtykker = samtykker.filter(samtykke => samtykke.verdi? samtykke.verdi : false);
        harSamtykker = faktiskeSamtykker.length > 0;
        faktiskeSamtykker.forEach(function (item) {
            const text = getIntlTextOrKey(intl, "informasjon.samtykke." + item.type);
            samtykkerTekst += samtykkerTekst===""?text:" og " + text;
        })
    }
    console.dir(samtykkerTekst);

    useEffect(() => {
        if (behandlingsId) {
            dispatch(getErSystemdataEndret(behandlingsId));
            dispatch(hentSamtykker(behandlingsId))
        }
    }, [behandlingsId, dispatch]);

    function setSamtykkeOgGaTilSteg1(harSamtykket: boolean) {
        if (behandlingsId && samtykker) {
            dispatch(oppdaterSamtykke(behandlingsId, harSamtykket, samtykker));
        }
    }

    return (
        <div className="app-digisos informasjon-side">
            <AppBanner/>
            <Panel className={"skjema-content"}>

                <Informasjonspanel
                    ikon={InformasjonspanelIkon.ELLA}
                    farge={DigisosFarge.VIKTIG}
                >
                    {erSystemdataEndret && (
                        <div className="skjemaelement--horisontal">
                            <FormattedMessage id="oppsummering.systemdataendret.true"/>
                        </div>
                    )}
                    {harSamtykker && (
                        <>
                            <div className="skjemaelement--horisontal">
                                <FormattedMessage id="informasjon.samtykke.info_del1"/>
                                {" " + samtykkerTekst + ". "}
                                <FormattedMessage id="informasjon.samtykke.info_del2"/>
                            </div>
                            <Checkbox
                                label={getIntlTextOrKey(intl, "informasjon.samtykke.sporsmal") + " " + samtykkerTekst + "."}
                                onChange={(event: any) =>
                                    harSamtykket = event.target.checked
                                }
                            />
                        </>
                    )}
                </Informasjonspanel>
                <Knapp
                    id="gi_bostotte_samtykke"
                    type="hoved"
                    onClick={() => {
                        setSamtykkeOgGaTilSteg1(harSamtykket)
                    }}
                >
                    {getIntlTextOrKey(intl, "informasjon.samtykke.knapp")}
                </Knapp>
            </Panel>
        </div>
    );
};

export default SamtykkeView;
