import {FormattedMessage, useIntl} from "react-intl";
import * as React from "react";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {getIntlTextOrKey} from "../../../../nav-soknad/utils";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import AdresseDetaljer from "./AdresseDetaljer";
import {AdresseKategori, AdressesokTreff, Gateadresse, NavEnhet} from "./AdresseTypes";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import {formaterSoknadsadresse} from "./AdresseUtils";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import SoknadsmottakerInfo from "./SoknadsmottakerInfo";
import Detaljeliste, {DetaljelisteElement} from "../../../../nav-soknad/components/detaljeliste";
import {Valideringsfeil} from "../../../redux/validering/valideringActionTypes";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata, lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {clearValideringsfeil} from "../../../redux/validering/valideringActions";
import {AdresseTypeahead} from "./AdresseTypeaheadDownshift";
import {logAmplitudeEvent} from "../../../../nav-soknad/utils/amplitude";

const FAKTUM_KEY = "soknadsmottaker";

const AdresseView = () => {
    const [oppstartsModus, setOppstartsModus] = useState(true);
    const [adressePending, setAdressePending] = useState(false);

    const dispatch = useDispatch();

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const feil = useSelector((state: State) => state.validering.feil);

    const intl = useIntl();
    const adresserStatus = soknadsdata.restStatus.personalia.adresser;

    useEffect(() => {
        if (behandlingsId) {
            const restStatus: REST_STATUS = adresserStatus;
            if (restStatus === REST_STATUS.INITIALISERT) {
                hentSoknadsdata(behandlingsId, SoknadsSti.ADRESSER, dispatch);
                hentSoknadsdata(behandlingsId, SoknadsSti.VALGT_NAV_ENHET, dispatch);
            }
        }
    }, [behandlingsId, dispatch, adresserStatus]);

    useEffect(() => {
        if (adresserStatus === REST_STATUS.OK && oppstartsModus) {
            setOppstartsModus(false);
        }
    }, [adresserStatus, oppstartsModus]);

    const onClickRadio = (adresseKategori: AdresseKategori) => {
        const restStatus: REST_STATUS = soknadsdata.restStatus.personalia.adresser;
        if (restStatus === REST_STATUS.INITIALISERT || restStatus === REST_STATUS.PENDING) {
            return;
        }
        const adresser = soknadsdata.personalia.adresser;
        const tidligereValg = adresser.valg;
        adresser.valg = adresseKategori;
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.ADRESSER, adresser));
        if (adresseKategori !== tidligereValg) {
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.NAV_ENHETER, []));
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.VALGT_NAV_ENHET, null));
            if (adresseKategori === AdresseKategori.SOKNAD) {
                const soknad: any = {
                    type: "gateadresse",
                    gateadresse: null,
                    matrikkeladresse: null,
                    ustrukturert: null,
                };
                dispatch(oppdaterSoknadsdataSti(SoknadsSti.ADRESSER + "/soknad", soknad));
            } else {
                lagreAdresseValg(adresser, adresseKategori);
            }
        }
    };

    const lagreAdresseValg = (payload: any, valg: AdresseKategori) => {
        if (behandlingsId) {
            setAdressePending(true);
            lagreSoknadsdata(behandlingsId, SoknadsSti.ADRESSER, payload, dispatch, (navEnheter: NavEnhet[]) => {
                if (Array.isArray(navEnheter)) {
                    if (navEnheter.length === 1) {
                        const valgtNavEnhet: NavEnhet = navEnheter[0];
                        valgtNavEnhet.valgt = true;
                        lagreSoknadsdata(behandlingsId, SoknadsSti.NAV_ENHETER, valgtNavEnhet, dispatch);
                        dispatch(oppdaterSoknadsdataSti(SoknadsSti.VALGT_NAV_ENHET, valgtNavEnhet));
                        slettEventuelleValideringsfeil();
                    }
                    dispatch(oppdaterSoknadsdataSti(SoknadsSti.NAV_ENHETER, navEnheter));
                    setAdressePending(false);
                }
                if (valg === AdresseKategori.MIDLERTIDIG) {
                    hentSoknadsdata(behandlingsId, SoknadsSti.ADRESSER, dispatch);
                }
            });
        }
    };

    const velgAnnenAdresse = (adresse: AdressesokTreff) => {
        if (adresse) {
            const payload = {
                valg: "soknad",
                soknad: {
                    type: "gateadresse",
                    gateadresse: {
                        kommunenummer: adresse.kommunenummer,
                        postnummer: adresse.postnummer,
                        poststed: adresse.poststed,
                        gatenavn: adresse.adresse,
                        husnummer: adresse.husnummer,
                        husbokstav: adresse.husbokstav,
                    },
                },
            };
            lagreAdresseValg(payload, AdresseKategori.SOKNAD);
            const soknad: any = {
                type: "gateadresse",
                gateadresse: {
                    landkode: "NOR",
                    kommunenummer: adresse.kommunenummer,
                    adresselinjer: [],
                    bolignummer: null,
                    postnummer: adresse.postnummer,
                    poststed: adresse.poststed,
                    gatenavn: adresse.adresse,
                    husnummer: adresse.husnummer,
                    husbokstav: adresse.husbokstav,
                },
                matrikkeladresse: null,
                ustrukturert: null,
            };
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.ADRESSER + "/soknad", soknad));
        }
    };

    const slettEventuelleValideringsfeil = () => {
        const feilkode = feil.find((f: Valideringsfeil) => f.faktumKey === FAKTUM_KEY);
        if (feilkode) {
            dispatch(clearValideringsfeil(FAKTUM_KEY));
        }
    };

    const nullstillAdresseTypeahead = () => {
        const adresser = soknadsdata.personalia.adresser;
        if (adresser.soknad) {
            adresser.soknad.gateadresse = null;
        }
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.NAV_ENHETER, []));
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.VALGT_NAV_ENHET, null));
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.ADRESSER, adresser));
    };

    const restStatus: REST_STATUS = soknadsdata.restStatus.personalia.adresser;
    const adresser = soknadsdata.personalia.adresser;
    const folkeregistrertAdresse = adresser && adresser.folkeregistrert && adresser.folkeregistrert.gateadresse;
    const midlertidigAdresse = adresser && adresser.midlertidig && adresser.midlertidig.gateadresse;
    const soknadAdresse: Gateadresse | null = adresser && adresser.soknad && adresser.soknad.gateadresse;
    const formatertSoknadAdresse = formaterSoknadsadresse(soknadAdresse);

    const matrikkelAdresse = adresser && adresser.folkeregistrert && adresser.folkeregistrert.matrikkeladresse;
    const gnrBnr: string =
        (matrikkelAdresse && matrikkelAdresse.gaardsnummer ? matrikkelAdresse.gaardsnummer : "") +
        (matrikkelAdresse && matrikkelAdresse.bruksnummer ? " / " + matrikkelAdresse.bruksnummer : "");
    const matrikkelKommune: string | null = matrikkelAdresse && matrikkelAdresse.kommunenummer;

    const midlertidigMatrikkelAdresse = adresser && adresser.midlertidig && adresser.midlertidig.matrikkeladresse;
    const midlertidigGnrBnr: string =
        (midlertidigMatrikkelAdresse && midlertidigMatrikkelAdresse.gaardsnummer
            ? midlertidigMatrikkelAdresse.gaardsnummer
            : "") +
        (midlertidigMatrikkelAdresse && midlertidigMatrikkelAdresse.bruksnummer
            ? " / " + midlertidigMatrikkelAdresse.bruksnummer
            : "");
    const midlertidigMatrikkelKommune: string | null =
        midlertidigMatrikkelAdresse && midlertidigMatrikkelAdresse.kommunenummer;

    let folkeregistrertAdresseLabel = null;
    let annenAdresseLabel = null;
    if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
        setOppstartsModus(false);
    }
    if (oppstartsModus) {
        folkeregistrertAdresseLabel = <TextPlaceholder lines={3} />;
        annenAdresseLabel = <TextPlaceholder lines={3} />;
    } else {
        folkeregistrertAdresseLabel = (
            <div id="folkeregistrertAdresse_data_loaded">
                <FormattedMessage id="kontakt.system.oppholdsadresse.folkeregistrertAdresse" />
                {folkeregistrertAdresse && <AdresseDetaljer adresse={folkeregistrertAdresse} />}
            </div>
        );
        annenAdresseLabel = (
            <div>
                <FormattedMessage id="kontakt.system.oppholdsadresse.valg.soknad" />
            </div>
        );
    }

    let matrikkelAdresseLabel = null;
    if (matrikkelAdresse) {
        matrikkelAdresseLabel = (
            <div>
                <FormattedMessage id="kontakt.system.oppholdsadresse.folkeregistrertAdresse" />
                <Detaljeliste>
                    <DetaljelisteElement tittel={<FormattedMessage id="matrikkel.gnrbnr" />} verdi={gnrBnr} />
                    <DetaljelisteElement
                        tittel={<FormattedMessage id="matrikkel.kommunenr" />}
                        verdi={matrikkelKommune}
                    />
                </Detaljeliste>
            </div>
        );
    }

    let midlertidigAdresseLabel = null;
    if (midlertidigAdresse) {
        midlertidigAdresseLabel = (
            <div>
                <FormattedMessage id="kontakt.system.oppholdsadresse.midlertidigAdresse" />
                <AdresseDetaljer adresse={midlertidigAdresse} />
            </div>
        );
    }

    let midlertidigMatrikkelAdresseLabel = null;
    if (midlertidigMatrikkelAdresse) {
        midlertidigMatrikkelAdresseLabel = (
            <div>
                <FormattedMessage id="kontakt.system.oppholdsadresse.midlertidigAdresse" />
                <Detaljeliste>
                    <DetaljelisteElement
                        tittel={<FormattedMessage id="matrikkel.gnrbnr" />}
                        verdi={midlertidigGnrBnr}
                    />
                    <DetaljelisteElement
                        tittel={<FormattedMessage id="matrikkel.kommunenr" />}
                        verdi={midlertidigMatrikkelKommune}
                    />
                </Detaljeliste>
            </div>
        );
    }

    const feilkode: Valideringsfeil | undefined = feil.find((f: Valideringsfeil) => f.faktumKey === FAKTUM_KEY);
    const feilmelding = intl.formatMessage({
        id: "soknadsmottaker.feilmelding",
    });

    return (
        <div className="sosialhjelp-oppholdsadresse skjema-sporsmal" id="soknadsmottaker">
            <Sporsmal
                id="soknadsmottaker"
                faktumKey={FAKTUM_KEY}
                noValidateOnBlur={true}
                sprakNokkel="soknadsmottaker"
                feil={feilkode ? feilmelding : undefined}
            >
                <span>
                    {(folkeregistrertAdresse || matrikkelAdresse) && (
                        <RadioEnhanced
                            id="oppholdsadresse_folkeregistrert"
                            value="folkeregistrert"
                            onChange={() => onClickRadio(AdresseKategori.FOLKEREGISTRERT)}
                            checked={adresser.valg === AdresseKategori.FOLKEREGISTRERT}
                            label={folkeregistrertAdresse ? folkeregistrertAdresseLabel : matrikkelAdresseLabel}
                            name="oppholdsadresse"
                        />
                    )}
                </span>

                {(midlertidigAdresse || midlertidigMatrikkelAdresse) && (
                    <span>
                        <RadioEnhanced
                            id="oppholdsadresse_midlertidig"
                            value="midlertidig"
                            onChange={() => onClickRadio(AdresseKategori.MIDLERTIDIG)}
                            checked={adresser.valg === AdresseKategori.MIDLERTIDIG}
                            label={
                                midlertidigAdresse != null ? midlertidigAdresseLabel : midlertidigMatrikkelAdresseLabel
                            }
                            name="oppholdsadresse"
                        />
                    </span>
                )}
                <RadioEnhanced
                    id="oppholdsadresse_soknad"
                    value="soknad"
                    onChange={() => onClickRadio(AdresseKategori.SOKNAD)}
                    checked={adresser.valg === AdresseKategori.SOKNAD}
                    label={annenAdresseLabel}
                    name="oppholdsadresse"
                />
                <div className="skjema-sporsmal--jaNeiSporsmal">
                    <Underskjema visible={adresser.valg === AdresseKategori.SOKNAD}>
                        <div className="utvidetAddresseSok">
                            <Sporsmal
                                tittelRenderer={() =>
                                    getIntlTextOrKey(intl, "kontakt.system.oppholdsadresse.hvorOppholder")
                                }
                                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
                            >
                                <div style={{marginBottom: "1rem"}}>
                                    <FormattedMessage id="kontakt.system.kontaktinfo.infotekst.tekst" />
                                </div>
                                <FormattedMessage id="kontakt.system.kontaktinfo.infotekst.ekstratekst" />
                                <AdresseTypeahead
                                    valgtAdresse={formatertSoknadAdresse}
                                    onVelgAnnenAdresse={(adresse: AdressesokTreff) => velgAnnenAdresse(adresse)}
                                    onNullstill={nullstillAdresseTypeahead}
                                />
                            </Sporsmal>
                        </div>
                    </Underskjema>
                </div>
            </Sporsmal>
            <SoknadsmottakerInfo skjul={adressePending} />
        </div>
    );
};

export {AdresseView};

export default AdresseView;
