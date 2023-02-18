import React from "react";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import ArbeidDetaljer from "./ArbeidDetaljer";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {Arbeidsforhold} from "./arbeidTypes";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../../redux/reducers";
import {lagreSoknadsdata, hentSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {clearValideringsfeil} from "../../../redux/validering/valideringActions";
import {validateAndDispatchTextFieldMaxLength} from "../../../../nav-soknad/validering/validateAndDispatch";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../../nav-soknad/hooks/useBehandlingsId";
import {REST_STATUS} from "../../../redux/soknadsdata/soknadsdataTypes";

const MAX_CHARS = 500;
const FAKTUM_KEY_KOMMENTARER = "opplysninger.arbeidsituasjon.kommentarer";

const Arbeid = () => {
    const [oppstartsModus, setOppstartsModus] = useState(true);

    const behandlingsId = useBehandlingsId();
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const feil = useSelector((state: State) => state.validering.feil);

    const dispatch = useDispatch();

    const {t} = useTranslation("skjema");

    useEffect(() => {
        if (behandlingsId) {
            hentSoknadsdata(behandlingsId, SoknadsSti.ARBEID, dispatch);
            dispatch(clearValideringsfeil(FAKTUM_KEY_KOMMENTARER));
        }
    }, [behandlingsId, dispatch]);

    useEffect(() => {
        const restStatus = soknadsdata.restStatus.arbeid;
        if (oppstartsModus && restStatus === REST_STATUS.OK) {
            setOppstartsModus(false);
        }
    }, [oppstartsModus, soknadsdata.restStatus.arbeid]);

    const onChange = (verdi: string) => {
        const arbeid = soknadsdata.arbeid;
        arbeid.kommentarTilArbeidsforhold = verdi;
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.ARBEID, arbeid));
        validateAndDispatchTextFieldMaxLength(
            kommentarTilArbeidsforhold ? kommentarTilArbeidsforhold : "",
            FAKTUM_KEY_KOMMENTARER,
            MAX_CHARS,
            feil,
            dispatch
        );
    };

    const lagreHvisGyldig = () => {
        const arbeid = soknadsdata.arbeid;
        const kommentarTilArbeidsforhold = arbeid.kommentarTilArbeidsforhold;
        const erInnenforMaksLengde = validateAndDispatchTextFieldMaxLength(
            kommentarTilArbeidsforhold ? kommentarTilArbeidsforhold : "",
            FAKTUM_KEY_KOMMENTARER,
            MAX_CHARS,
            feil,
            dispatch
        );
        if (erInnenforMaksLengde && behandlingsId) {
            lagreSoknadsdata(behandlingsId, SoknadsSti.ARBEID, arbeid, dispatch);
        }
    };

    const arbeid = soknadsdata.arbeid;
    let alleArbeidsforhold: Arbeidsforhold[] | null = null;
    let kommentarTilArbeidsforhold = "";
    const faktumKommentarerId = FAKTUM_KEY_KOMMENTARER.replace(/\./g, "_");
    if (arbeid) {
        if (arbeid.kommentarTilArbeidsforhold) {
            kommentarTilArbeidsforhold = arbeid.kommentarTilArbeidsforhold;
        }
        if (arbeid.arbeidsforhold) {
            alleArbeidsforhold = arbeid.arbeidsforhold;
        }
    }

    if (oppstartsModus) {
        if (soknadsdata.restStatus.arbeid === REST_STATUS.OK) setOppstartsModus(false);

        return (
            <div className="skjema-sporsmal">
                <Sporsmal tekster={getFaktumSporsmalTekst(t, "arbeidsforhold")} stil={"system"}>
                    <TextPlaceholder lines={6} />
                </Sporsmal>
            </div>
        );
    }
    return (
        <Sporsmal tekster={getFaktumSporsmalTekst(t, "arbeidsforhold")} stil="system">
            <div>{t("arbeidsforhold.infotekst")}</div>
            {(alleArbeidsforhold == null || alleArbeidsforhold.length === 0) && <p>{t("arbeidsforhold.ingen")}</p>}
            {alleArbeidsforhold && alleArbeidsforhold.length > 0 && (
                <ul className={"arbeidsgiverliste"}>
                    {alleArbeidsforhold.map((arbeidsforhold: Arbeidsforhold, index: any) => (
                        <li key={index} className="arbeidsgiverliste__arbeidsgiver">
                            <ArbeidDetaljer arbeidsforhold={arbeidsforhold} />
                        </li>
                    ))}
                </ul>
            )}
            <TextareaEnhanced
                id={faktumKommentarerId}
                placeholder={t("arbeidsforhold.kommentar.placeholder")}
                onChange={(evt: any) => onChange(evt.target.value)}
                onBlur={() => lagreHvisGyldig()}
                faktumKey={FAKTUM_KEY_KOMMENTARER}
                maxLength={MAX_CHARS}
                value={kommentarTilArbeidsforhold ? kommentarTilArbeidsforhold : ""}
            />
        </Sporsmal>
    );
};

export default Arbeid;
