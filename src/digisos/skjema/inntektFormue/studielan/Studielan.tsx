import * as React from "react";
import {useDispatch, useSelector} from "react-redux";

import {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, getIntlTextOrKey} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {Studielan} from "./StudielanTypes";
import Informasjonspanel from "../../../../nav-soknad/components/Informasjonspanel";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata, lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {UndertekstBold} from "nav-frontend-typografi";
import {Heading, Link} from "@navikt/ds-react";
import {Trans, useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../../nav-soknad/hooks/useBehandlingsId";

const FAKTUM_STUDIELAN = "inntekt.studielan";

const STUDERER_INFO_TITTEL = "informasjon.student.studielan.tittel";
const STUDERER_INFO_DEL1 = "informasjon.student.studielan.1.v2";
const STUDERER_INFO_DEL2 = "informasjon.student.studielan.2";

const StudielanView = () => {
    const [oppstartsModus, setOppstartsModus] = React.useState(true);

    const dispatch = useDispatch();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation("skjema");

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
            <Heading size="medium" level="2">
                {getIntlTextOrKey(t, "inntekt.studielan.titel")}
            </Heading>
            <JaNeiSporsmal
                visPlaceholder={oppstartsModus}
                tekster={getFaktumSporsmalTekst(t, FAKTUM_STUDIELAN)}
                faktumKey={FAKTUM_STUDIELAN}
                verdi={studielan ? studielan.bekreftelse : null}
                onChange={(verdi: boolean) => handleClickJaNeiSpsm(verdi)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            />
            {studielan && studielan.bekreftelse === false && (
                <Informasjonspanel ikon={"ella"} farge="viktig">
                    <UndertekstBold className="skjema-sporsmal__infotekst__tittel">
                        {t(STUDERER_INFO_TITTEL)}
                    </UndertekstBold>
                    <p>
                        <Trans
                            t={t}
                            i18nKey={STUDERER_INFO_DEL1}
                            components={{
                                lenke: (
                                    <Link
                                        href={t("informasjon.student.studielan.url")}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        {null}
                                    </Link>
                                ),
                            }}
                        />
                    </p>
                    <p>{t(STUDERER_INFO_DEL2)}</p>
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
