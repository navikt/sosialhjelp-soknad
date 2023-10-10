import * as React from "react";
import {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst, getIntlTextOrKey} from "../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../nav-soknad/faktum/JaNeiSporsmal";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {Studielan} from "./StudielanTypes";
import Informasjonspanel from "../../../nav-soknad/components/Informasjonspanel";
import {Detail, Heading, Link} from "@navikt/ds-react";
import {Trans, useTranslation} from "react-i18next";
import {REST_STATUS} from "../../../digisos/redux/soknadsdata/soknadsdataTypes";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";

const FAKTUM_STUDIELAN = "inntekt.studielan";

const STUDERER_INFO_TITTEL = "informasjon.student.studielan.tittel";
const STUDERER_INFO_DEL1 = "informasjon.student.studielan.1.v2";
const STUDERER_INFO_DEL2 = "informasjon.student.studielan.2";

const StudielanView = () => {
    const [oppstartsModus, setOppstartsModus] = React.useState(true);
    const {soknadsdata, lagre, oppdater} = useSoknadsdata(SoknadsSti.STUDIELAN);
    const {t} = useTranslation("skjema");
    const studielan: Studielan | undefined = soknadsdata.inntekt.studielan;
    const restStatus = soknadsdata.restStatus.inntekt.studielan;

    React.useEffect(() => {
        if (oppstartsModus && soknadsdata.restStatus.inntekt.studielan === REST_STATUS.OK) {
            setOppstartsModus(false);
        }
    }, [oppstartsModus, soknadsdata.restStatus.inntekt.studielan]);

    const handleClickJaNeiSpsm = (verdi: boolean) => {
        if (!(restStatus === REST_STATUS.OK && studielan)) return;
        studielan.bekreftelse = verdi;
        oppdater(studielan);
        lagre(studielan);
    };

    if (oppstartsModus && restStatus === REST_STATUS.OK) setOppstartsModus(false);

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
            {studielan && studielan.bekreftelse === true && (
                <Informasjonspanel ikon={"ella"} farge="viktig">
                    <Detail className="skjema-sporsmal__infotekst__tittel">{t(STUDERER_INFO_TITTEL)}</Detail>
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
