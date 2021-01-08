import * as React from "react";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {FormattedMessage} from "react-intl";

import Detaljeliste, {DetaljelisteElement} from "../../../../nav-soknad/components/detaljeliste";
import {SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";

const BasisPersonaliaView = () => {
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);

    const dispatch = useDispatch();

    useEffect(() => {
        if (behandlingsId) {
            dispatch(hentSoknadsdata(behandlingsId, SoknadsSti.BASIS_PERSONALIA));
        }
    }, [behandlingsId, dispatch]);

    const basisPersonalia = soknadsdata.personalia.basisPersonalia;
    let statsborgerskap = basisPersonalia && basisPersonalia.statsborgerskap;
    let statsborgerskapVisning = <span className="tekst-capitalize">{statsborgerskap}</span>;
    if (statsborgerskap === "XXX" || statsborgerskap === "xxx") {
        statsborgerskap = "Statsløs";
        statsborgerskapVisning = <span>{statsborgerskap}</span>;
    } else if (statsborgerskap === "XUK" || statsborgerskap === null) {
        statsborgerskap = "Vi har ikke opplysninger om ditt statsborgerskap";
        statsborgerskapVisning = <span>{statsborgerskap}</span>;
    }
    const restStatus = soknadsdata.restStatus.personalia.basisPersonalia;
    const visAnimerteStreker = restStatus !== REST_STATUS.OK;

    return (
        <Sporsmal
            faktumKey="kontakt.system.personalia"
            stil={"system"}
            visLedetekst={visAnimerteStreker !== true}
            sprakNokkel="kontakt.system.personalia"
        >
            {visAnimerteStreker !== true && basisPersonalia && (
                <Detaljeliste>
                    <DetaljelisteElement
                        tittel={<FormattedMessage id="kontakt.system.personalia.navn" />}
                        verdi={basisPersonalia.navn.fulltNavn}
                    />
                    <DetaljelisteElement
                        skjulDersomTomVerdi={true}
                        tittel={<FormattedMessage id="kontakt.system.personalia.fnr" />}
                        verdi={basisPersonalia.fodselsnummer}
                    />
                    {statsborgerskap && (
                        <DetaljelisteElement
                            tittel={<FormattedMessage id="kontakt.system.personalia.statsborgerskap" />}
                            verdi={statsborgerskapVisning}
                        />
                    )}
                </Detaljeliste>
            )}
            {visAnimerteStreker && <TextPlaceholder lines={3} />}
        </Sporsmal>
    );
};

export default BasisPersonaliaView;
