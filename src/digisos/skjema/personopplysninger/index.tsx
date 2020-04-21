import * as React from "react";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../redux/reducers";
import {ErSystemdataEndret} from "../../redux/soknad/soknadActionTypes";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import William from "../../../nav-soknad/components/svg/illustrasjoner/William";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import {FormattedMessage} from "react-intl";
import Telefon from "./telefon/Telefon";
import Bankinformasjon from "./bankinfo/Bankinformasjon";
import Adresse from "./adresse/Adresse";
import BasisPersonalia from "./personalia/BasisPersonalia";
import NavFrontendSpinner from "nav-frontend-spinner";
import {getErSystemdataEndret} from "../../redux/soknad/soknadActions";
import {useEffect} from "react";

const Personopplysninger = () => {
    const {erGjenopptattSoknad, skalSjekkeOmSystemdataErEndret, erSystemdataEndret, behandlingsId} = useSelector(
        (state: State) => state.soknad
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (skalSjekkeOmSystemdataErEndret && behandlingsId) {
            dispatch(getErSystemdataEndret(behandlingsId));
        }
    });

    const skjulGjenopptattInfoPanel = true;
    const gjenopptattSoknadInfoPanel = (
        <div className="skjema-sporsmal">
            <Informasjonspanel ikon={InformasjonspanelIkon.ELLA} farge={DigisosFarge.VIKTIG}>
                <FormattedMessage id="applikasjon.advarsel.gjenopptatt" />
            </Informasjonspanel>
        </div>
    );
    const systemdataEndretInfoPanel = (
        <div className="skjema-sporsmal">
            <Informasjonspanel ikon={InformasjonspanelIkon.ELLA} farge={DigisosFarge.VIKTIG}>
                <FormattedMessage id="oppsummering.systemdataendret.true" />
            </Informasjonspanel>
        </div>
    );

    if (skalSjekkeOmSystemdataErEndret) {
        return (
            <div className="application-spinner">
                <NavFrontendSpinner type="XXL" />
            </div>
        );
    }

    return (
        <DigisosSkjemaSteg steg={DigisosSteg.kontakt} ikon={<William />}>
            {!skjulGjenopptattInfoPanel &&
                erGjenopptattSoknad &&
                erSystemdataEndret === ErSystemdataEndret.NO &&
                gjenopptattSoknadInfoPanel}
            {erSystemdataEndret === ErSystemdataEndret.YES && systemdataEndretInfoPanel}
            <BasisPersonalia />
            <Adresse />
            <Telefon />
            <Bankinformasjon />
        </DigisosSkjemaSteg>
    );
};

export default Personopplysninger;
