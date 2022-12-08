import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage, useIntl} from "react-intl";

import {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, getIntlTextOrKey} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {Studielan} from "./StudielanTypes";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../../nav-soknad/components/svg/DigisosFarger";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata, lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {UndertekstBold} from "nav-frontend-typografi";
import {Link} from "@navikt/ds-react";

const FAKTUM_STUDIELAN = "inntekt.studielan";

const STUDERER_INFO_TITTEL = "informasjon.student.studielan.tittel";
const STUDERER_INFO_DEL1 = "informasjon.student.studielan.1.v2";
const STUDERER_INFO_DEL2 = "informasjon.student.studielan.2";

const StudielanView = () => {
    const [oppstartsModus, setOppstartsModus] = React.useState(true);

    const dispatch = useDispatch();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);

    const intl = useIntl();

    React.useEffect(() => {
        if (behandlingsId) {
            hentSoknadsdata(behandlingsId, SoknadsSti.STUDIELAN, dispatch);
        }
    }, [behandlingsId, dispatch]);

    React.useEffect(() => {
        if (oppstartsModus && soknadsdata.restStatus.inntekt.studielan === REST_STATUS.OK) {
            setOppstartsModus(false);
        }
    }, [oppstartsModus, soknadsdata.restStatus.inntekt.studielan]);

    const handleClickJaNeiSpsm = (verdi: boolean) => {
        const restStatus = soknadsdata.restStatus.inntekt.studielan;
        if (restStatus === REST_STATUS.OK) {
            const studielan: Studielan | undefined = soknadsdata.inntekt.studielan;
            if (studielan && behandlingsId) {
                studielan.bekreftelse = verdi;
                dispatch(oppdaterSoknadsdataSti(SoknadsSti.STUDIELAN, studielan));
                lagreSoknadsdata(behandlingsId, SoknadsSti.STUDIELAN, studielan, dispatch);
            }
        }
    };

    const studielan: Studielan | undefined = soknadsdata.inntekt.studielan;
    const restStatus = soknadsdata.restStatus.inntekt.studielan;
    if (oppstartsModus && restStatus === REST_STATUS.OK) {
        setOppstartsModus(false);
    }

    const studielanSporsmal = (
        <div className="skjema-sporsmal">
            <h2>{getIntlTextOrKey(intl, "inntekt.studielan.titel")}</h2>
            <JaNeiSporsmal
                visPlaceholder={oppstartsModus}
                tekster={getFaktumSporsmalTekst(intl, FAKTUM_STUDIELAN)}
                faktumKey={FAKTUM_STUDIELAN}
                verdi={studielan ? studielan.bekreftelse : null}
                onChange={(verdi: boolean) => handleClickJaNeiSpsm(verdi)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            />
            {studielan && studielan.bekreftelse === false && (
                <Informasjonspanel ikon={InformasjonspanelIkon.ELLA} farge={DigisosFarge.VIKTIG}>
                    <UndertekstBold className="skjema-sporsmal__infotekst__tittel">
                        <FormattedMessage id={STUDERER_INFO_TITTEL} />
                    </UndertekstBold>
                    <p>
                        <FormattedMessage
                            id={STUDERER_INFO_DEL1}
                            values={{
                                a: (msg) => (
                                    <Link
                                        href={intl.formatMessage({id: "informasjon.student.studielan.url"})}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        {msg}
                                    </Link>
                                ),
                            }}
                        />
                    </p>
                    <p>
                        <FormattedMessage id={STUDERER_INFO_DEL2} />
                    </p>
                </Informasjonspanel>
            )}
        </div>
    );
    if (typeof studielan !== "undefined" && studielan.skalVises) {
        return studielanSporsmal;
    } else {
        return null;
    }
};

export default StudielanView;
