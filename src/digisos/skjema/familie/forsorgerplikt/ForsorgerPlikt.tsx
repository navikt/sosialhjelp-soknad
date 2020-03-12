import {FormattedHTMLMessage} from "react-intl";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";

import {SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {
    LegendTittleStyle,
} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema";
import Barnebidrag from "./Barnebidrag";
import RegistrerteBarn from "./RegistrerteBarn";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import BrukerregistrerteBarn from "./BrukerregistrerteBarn";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";

const ForsorgerPliktView = () => {
    const [oppstartsModus, setOppstartsModus] = useState(true);

    const dispatch = useDispatch();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector(
        (state: State) => state.soknad.behandlingsId
    );

    useEffect(() => {
        if (behandlingsId) {
            dispatch(hentSoknadsdata(behandlingsId, SoknadsSti.FORSORGERPLIKT));
        }
    }, [behandlingsId, dispatch]);

    useEffect(() => {
        const restStatus = soknadsdata.restStatus.familie.forsorgerplikt;
        if (oppstartsModus && restStatus === REST_STATUS.OK) {
            setOppstartsModus(false);
        }
    }, [oppstartsModus, soknadsdata.restStatus.familie.forsorgerplikt]);

    const ansvar = soknadsdata.familie.forsorgerplikt.ansvar;
    const brukerregistrertAnsvar = soknadsdata.familie.forsorgerplikt.brukerregistrertAnsvar;
    const antallBarn = ansvar.length;
    const antallBrukerregistrerteBarn = brukerregistrertAnsvar.length;
    const restStatus = soknadsdata.restStatus.familie.forsorgerplikt;
    if (oppstartsModus && restStatus === REST_STATUS.OK) {
        setOppstartsModus(false);
    }
    if (oppstartsModus) {
        return (
            <Sporsmal sprakNokkel="familierelasjon.faktum">
                <TextPlaceholder style={{marginTop: "1rem"}}/>
            </Sporsmal>
        );
    }
    if (ansvar && antallBarn === 0) {
        return (
            <Sporsmal sprakNokkel="familierelasjon.faktum">
                <p><FormattedHTMLMessage id="familierelasjon.ingen_registrerte_barn"/></p>
                <BrukerregistrerteBarn/>
                {brukerregistrertAnsvar && antallBrukerregistrerteBarn > 0 && <Barnebidrag/>}
            </Sporsmal>
        );
    }
    if (ansvar && antallBarn > 0) {
        return (
            <Sporsmal
                sprakNokkel="familierelasjon.faktum"
                stil="system"
                legendTittelStyle={LegendTittleStyle.DEFAULT}
            >
                <FormattedHTMLMessage
                    id="familierelasjon.ingress"
                    values={{antallBarn}}
                />
                <SysteminfoMedSkjema>
                    <RegistrerteBarn/>
                    <BrukerregistrerteBarn/>
                    <Barnebidrag/>
                </SysteminfoMedSkjema>
            </Sporsmal>
        );
    }
    return <div/>;
};

export default ForsorgerPliktView;
