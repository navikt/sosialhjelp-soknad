import * as React from "react";
import {Panel} from "nav-frontend-paneler";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import Knapp from "nav-frontend-knapper";
import {FormattedMessage, useIntl} from "react-intl";
import AppBanner from "../../../nav-soknad/components/appHeader/AppHeader";
import {Checkbox} from "nav-frontend-skjema";
import {useDispatch, useSelector} from "react-redux";
import {
    getErSystemdataEndret, hentSamtykker,
    oppdaterSamtykke
} from "../../redux/soknad/soknadActions";
import {State} from "../../redux/reducers";
import {useEffect} from "react";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";

const Samtykke: React.FC = () => {
    const intl = useIntl();
    let harSamtykket:boolean = false;

    const dispatch = useDispatch();

    const erSystemdataEndret = useSelector(
        (state: State) => state.soknad.erSystemdataEndret
    );
    const behandlingsId = useSelector(
        (state: State) => state.soknad.behandlingsId
    );
    const samtykker = useSelector(
        (state: State) => state.soknad.samtykker
    );

    useEffect(() => {
        if (behandlingsId) {
            dispatch(getErSystemdataEndret(behandlingsId));
            dispatch(hentSamtykker(behandlingsId))
        }
    }, [behandlingsId, dispatch]);

    function setSamtykkeOgGaTilSteg1(harSamtykket: boolean) {
        console.log("DEBUG behandlingsId, harSamtykket, samtykker: " + behandlingsId, harSamtykket, samtykker);
        if(behandlingsId && samtykker) {
            dispatch(oppdaterSamtykke(behandlingsId, harSamtykket, samtykker));
        }
    }

    const systemdataEndretInfoPanel = (
        <div className="skjema-sporsmal">
            <Informasjonspanel
                ikon={InformasjonspanelIkon.ELLA}
                farge={DigisosFarge.VIKTIG}
            >
                <FormattedMessage id="oppsummering.systemdataendret.true" />
            </Informasjonspanel>
        </div>
    );

    return (
        <div className="app-digisos informasjon-side">
            <AppBanner/>
            <Panel className={"skjema-content"}>

                {erSystemdataEndret && systemdataEndretInfoPanel}
                <Panel border={true} className="skjema-content samtykke-boks">
                    <div className="skjemaelement--horisontal">
                        <FormattedMessage id="informasjon.samtykke.info"/>
                    </div>
                    <Checkbox
                        label={<FormattedMessage id="informasjon.samtykke.sporsmal"/>}
                        onChange={(event: any) =>
                            harSamtykket = event.target.checked
                        }
                    />
                </Panel>
                <Knapp
                    id="gi_bostotte_samtykke"
                    type="hoved"
                    onClick={() => {
                        setSamtykkeOgGaTilSteg1(harSamtykket)
                    }}
                >
                    {getIntlTextOrKey(intl, "ga_til_soknaden")}
                </Knapp>
            </Panel>
        </div>
    );
};

export default Samtykke;
