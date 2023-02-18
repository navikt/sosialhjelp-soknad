import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";

import {SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import Barnebidrag from "./Barnebidrag";
import RegistrerteBarn from "./RegistrerteBarn";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../../nav-soknad/hooks/useBehandlingsId";
import {REST_STATUS} from "../../../redux/soknadsdata/soknadsdataTypes";

const ForsorgerPliktView = () => {
    const [oppstartsModus, setOppstartsModus] = useState(true);

    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useBehandlingsId();
    useEffect(() => {
        if (behandlingsId) {
            hentSoknadsdata(behandlingsId, SoknadsSti.FORSORGERPLIKT, dispatch);
        }
    }, [behandlingsId, dispatch]);

    useEffect(() => {
        const restStatus = soknadsdata.restStatus.familie.forsorgerplikt;
        if (oppstartsModus && restStatus === REST_STATUS.OK) {
            setOppstartsModus(false);
        }
    }, [oppstartsModus, soknadsdata.restStatus.familie.forsorgerplikt]);

    const ansvar = soknadsdata.familie.forsorgerplikt.ansvar;
    const antallBarn = ansvar.length;
    const restStatus = soknadsdata.restStatus.familie.forsorgerplikt;
    if (oppstartsModus && restStatus === REST_STATUS.OK) {
        setOppstartsModus(false);
    }
    if (oppstartsModus) {
        return (
            <Sporsmal tekster={getFaktumSporsmalTekst(t, "familierelasjon.faktum")}>
                <TextPlaceholder style={{marginTop: "1rem"}} />
            </Sporsmal>
        );
    }
    if (ansvar && antallBarn === 0) {
        return (
            <Sporsmal tekster={getFaktumSporsmalTekst(t, "familierelasjon.faktum")}>
                <p>{t("familierelasjon.ingen_registrerte_barn_tittel")}</p>
                <p>
                    <b>{t("familierelasjon.ingen_registrerte_barn_tekst")}</b>
                </p>
            </Sporsmal>
        );
    }
    if (ansvar && antallBarn > 0) {
        return (
            <Sporsmal
                tekster={getFaktumSporsmalTekst(t, "familierelasjon.faktum")}
                stil="system"
                legendTittelStyle={LegendTittleStyle.DEFAULT}
            >
                <p>{t("familierelasjon.ingress_folkeregisteret")}</p>
                <p>
                    <b>{t("familierelasjon.ingress_forsorger")}</b>
                    {t("familierelasjon.ingress_antallBarn", {antallBarn})}
                </p>

                <RegistrerteBarn />
                <Barnebidrag />
            </Sporsmal>
        );
    }
    return <div />;
};

export default ForsorgerPliktView;
