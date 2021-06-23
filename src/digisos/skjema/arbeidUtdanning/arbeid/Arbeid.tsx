import * as React from "react";
import {FormattedMessage, injectIntl, useIntl} from "react-intl";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import Sporsmal, {SporsmalStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import ArbeidDetaljer from "./ArbeidDetaljer";
import TextareaEnhanced from "../../../../nav-soknad/faktum/TextareaEnhanced";
import {maksLengde} from "../../../../nav-soknad/validering/valideringer";
import {
    connectSoknadsdataContainer,
    onEndretValideringsfeil,
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {Arbeidsforhold} from "./arbeidTypes";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {ValideringsFeilKode} from "../../../redux/validering/valideringActionTypes";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../../redux/reducers";
import {lagreSoknadsdata, hentSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {setValideringsfeil, clearValideringsfeil} from "../../../redux/validering/valideringActions";

const MAX_CHARS = 500;
const FAKTUM_KEY_KOMMENTARER = "opplysninger.arbeidsituasjon.kommentarer";

const ArbeidView = () => {
    const [oppstartsModus, setOppstartsModus] = useState(true);

    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const feil = useSelector((state: State) => state.validering.feil);

    const dispatch = useDispatch();

    const intl = useIntl();

    useEffect(() => {
        if (behandlingsId) {
            dispatch(hentSoknadsdata(behandlingsId, SoknadsSti.ARBEID));
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
        validerTekstfeltVerdi(verdi, FAKTUM_KEY_KOMMENTARER);
    };

    const lagreHvisGyldig = () => {
        const arbeid = soknadsdata.arbeid;
        const kommentarTilArbeidsforhold = arbeid.kommentarTilArbeidsforhold;
        const feilkode: ValideringsFeilKode | undefined = validerTekstfeltVerdi(
            kommentarTilArbeidsforhold ? kommentarTilArbeidsforhold : "",
            FAKTUM_KEY_KOMMENTARER
        );
        if (!feilkode && behandlingsId) {
            dispatch(lagreSoknadsdata(behandlingsId, SoknadsSti.ARBEID, arbeid));
        }
    };

    const validerTekstfeltVerdi = (verdi: string, faktumKey: string): ValideringsFeilKode | undefined => {
        const feilkode: ValideringsFeilKode | undefined = maksLengde(verdi, MAX_CHARS);
        onEndretValideringsfeil(feilkode, faktumKey, feil, () => {
            if (feilkode) {
                dispatch(setValideringsfeil(feilkode, faktumKey));
            } else {
                dispatch(clearValideringsfeil(faktumKey));
            }
        });
        return feilkode;
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
    const restStatus = soknadsdata.restStatus.arbeid;
    if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
        setOppstartsModus(false);
    }
    const style: SporsmalStyle = "system";
    if (oppstartsModus) {
        return (
            <div className="skjema-sporsmal">
                <Sporsmal sprakNokkel="arbeidsforhold" stil={style}>
                    <TextPlaceholder lines={6} />
                </Sporsmal>
            </div>
        );
    }
    return (
        <Sporsmal tekster={getFaktumSporsmalTekst(intl, "arbeidsforhold")} stil="system">
            <div>
                <FormattedMessage id="arbeidsforhold.infotekst" />
            </div>
            {(alleArbeidsforhold == null || alleArbeidsforhold.length === 0) && (
                <p>
                    <FormattedMessage id="arbeidsforhold.ingen" />
                </p>
            )}
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
                placeholder={intl.formatMessage({
                    id: "begrunnelse.hvorfor.placeholder",
                })}
                onChange={(evt: any) => onChange(evt.target.value)}
                onBlur={() => lagreHvisGyldig()}
                faktumKey={FAKTUM_KEY_KOMMENTARER}
                maxLength={MAX_CHARS}
                value={kommentarTilArbeidsforhold ? kommentarTilArbeidsforhold : ""}
            />
        </Sporsmal>
    );
};

export {ArbeidView};

export default connectSoknadsdataContainer(injectIntl(ArbeidView));
