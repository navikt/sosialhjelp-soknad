import {FormattedMessage} from "react-intl";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";

import {SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import Barnebidrag from "./Barnebidrag";
import RegistrerteBarn from "./RegistrerteBarn";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";

const ForsorgerPliktView = () => {
    const [oppstartsModus, setOppstartsModus] = useState(true);

    const dispatch = useDispatch();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);

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
                <TextPlaceholder style={{marginTop: "1rem"}} />
            </Sporsmal>
        );
    }
    if (ansvar && antallBarn === 0) {
        return (
            <Sporsmal sprakNokkel="familierelasjon.faktum">
                <p>
                    <FormattedMessage id="familierelasjon.ingen_registrerte_barn_tittel" />
                </p>
                <p>
                    <b>
                        <FormattedMessage id="familierelasjon.ingen_registrerte_barn_tekst" />
                    </b>
                </p>
                {/*<BrukerregistrerteBarn/> TODO: Kommentert ut intil alle FSLer er klare. */}
                {brukerregistrertAnsvar && antallBrukerregistrerteBarn > 0 && <Barnebidrag />}
            </Sporsmal>
        );
    }
    if (ansvar && antallBarn > 0) {
        return (
            <Sporsmal sprakNokkel="familierelasjon.faktum" stil="system" legendTittelStyle={LegendTittleStyle.DEFAULT}>
                <p>
                    <FormattedMessage id="familierelasjon.ingress_folkeregisteret" />
                </p>
                <p>
                    <b>
                        <FormattedMessage id="familierelasjon.ingress_forsorger" />
                    </b>
                    <FormattedMessage id="familierelasjon.ingress_antallBarn" values={{antallBarn}} />
                </p>

                <RegistrerteBarn />
                {/*<BrukerregistrerteBarn/> TODO: Kommentert ut intil alle FSLer er klare. */}
                <Barnebidrag />
            </Sporsmal>
        );
    }
    return <div />;
};

export default ForsorgerPliktView;
