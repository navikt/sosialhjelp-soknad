import * as React from "react";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {CheckboksPanel} from "nav-frontend-skjema";
import {erKontonummer} from "../../../../nav-soknad/validering/valideringer";
import {FormattedMessage, useIntl} from "react-intl";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {SysteminfoMedSkjema} from "../../../../nav-soknad/components/systeminfoMedSkjema";
import {Kontonummer} from "./KontonummerType";
import {onEndretValideringsfeil} from "../../../redux/validering/valideringUtils";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {ValideringsFeilKode} from "../../../redux/validering/valideringActionTypes";
import {replaceDotWithUnderscore} from "../../../../nav-soknad/utils";
import {REST_STATUS} from "../../../redux/soknad/soknadTypes";

import {State} from "../../../redux/reducers";
import {clearValideringsfeil, setValideringsfeil} from "../../../redux/validering/valideringActions";
import {hentSoknadsdata, lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {OldSingleLineElement, OldSysteminfo} from "../../../../nav-soknad/components/systeminfo/Systeminfo";

const FAKTUM_KEY_KONTONUMMER = "kontakt.kontonummer";

const Bankinformasjon = () => {
    const dispatch = useDispatch();
    const [oppstartsModus, setOppstartsModus] = useState(true);

    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const feil = useSelector((state: State) => state.validering.feil);

    const intl = useIntl();

    useEffect(() => {
        if (oppstartsModus && soknadsdata.restStatus === REST_STATUS.OK) {
            setOppstartsModus(false);
        }
    }, [oppstartsModus, soknadsdata.restStatus]);

    useEffect(() => {
        if (behandlingsId) {
            dispatch(clearValideringsfeil(FAKTUM_KEY_KONTONUMMER));
            hentSoknadsdata(behandlingsId, SoknadsSti.BANKINFORMASJON, dispatch);
        }
    }, [behandlingsId, dispatch]);

    const onBlur = () => {
        if (behandlingsId) {
            let kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
            if (kontonummer.brukerutfyltVerdi !== null && kontonummer.brukerutfyltVerdi !== "") {
                if (validerKontonummer(kontonummer.brukerutfyltVerdi)) {
                    kontonummer = vaskKontonummerVerdi(kontonummer);
                    lagreSoknadsdata(behandlingsId, SoknadsSti.BANKINFORMASJON, kontonummer, dispatch);
                    dispatch(clearValideringsfeil(FAKTUM_KEY_KONTONUMMER));
                }
            } else {
                dispatch(clearValideringsfeil(FAKTUM_KEY_KONTONUMMER));
                lagreSoknadsdata(behandlingsId, SoknadsSti.BANKINFORMASJON, kontonummer, dispatch);
            }
        }
    };

    const validerKontonummer = (brukerutfyltVerdi: string): boolean => {
        brukerutfyltVerdi = brukerutfyltVerdi.replace(/[.]/g, "");
        if (!erKontonummer(brukerutfyltVerdi)) {
            onEndretValideringsfeil(ValideringsFeilKode.ER_KONTONUMMER, FAKTUM_KEY_KONTONUMMER, feil, () => {
                dispatch(setValideringsfeil(ValideringsFeilKode.ER_KONTONUMMER, FAKTUM_KEY_KONTONUMMER));
            });
            return false;
        }
        dispatch(clearValideringsfeil(FAKTUM_KEY_KONTONUMMER));

        return true;
    };

    const endreKontoBrukerdefinert = (brukerdefinert: boolean) => {
        if (behandlingsId) {
            const kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
            kontonummer.brukerdefinert = brukerdefinert;
            kontonummer.brukerutfyltVerdi = "";
            kontonummer.harIkkeKonto = false;
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.BANKINFORMASJON, kontonummer));
            if (!brukerdefinert) {
                lagreSoknadsdata(behandlingsId, SoknadsSti.BANKINFORMASJON, kontonummer, dispatch, () =>
                    hentSoknadsdata(behandlingsId, SoknadsSti.BANKINFORMASJON, dispatch)
                );
            } else {
                lagreSoknadsdata(behandlingsId, SoknadsSti.BANKINFORMASJON, kontonummer, dispatch);
            }
            dispatch(clearValideringsfeil(FAKTUM_KEY_KONTONUMMER));
        }
    };

    const vaskKontonummerVerdi = (kontonummer: Kontonummer) => {
        const kontonummerClone = {...kontonummer};
        if (kontonummerClone.brukerutfyltVerdi !== null && kontonummerClone.brukerutfyltVerdi.length > 1) {
            kontonummerClone.brukerutfyltVerdi = kontonummerClone.brukerutfyltVerdi.replace(/\D/g, "");
        }
        return kontonummerClone;
    };

    const onChangeInput = (brukerutfyltVerdi: string) => {
        dispatch(clearValideringsfeil(FAKTUM_KEY_KONTONUMMER));
        const kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
        kontonummer.brukerutfyltVerdi = brukerutfyltVerdi;
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.BANKINFORMASJON, kontonummer));
    };

    const onChangeCheckboks = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (behandlingsId) {
            const kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
            kontonummer.harIkkeKonto = event.target.checked;
            if (kontonummer.harIkkeKonto) {
                dispatch(clearValideringsfeil(FAKTUM_KEY_KONTONUMMER));
                kontonummer.brukerutfyltVerdi = "";
            }
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.BANKINFORMASJON, kontonummer));
            lagreSoknadsdata(behandlingsId, SoknadsSti.BANKINFORMASJON, kontonummer, dispatch);
        }
    };

    const kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
    const endreLabel: string = intl.formatMessage({
        id: "kontakt.system.kontonummer.endreknapp.label",
    });
    const avbrytLabel: string = intl.formatMessage({
        id: "systeminfo.avbrytendringknapp.label",
    });
    const inputVerdi: string = kontonummer && kontonummer.brukerutfyltVerdi ? kontonummer.brukerutfyltVerdi : "";
    const faktumKeyKontonummerId: string = replaceDotWithUnderscore(FAKTUM_KEY_KONTONUMMER);
    let infotekst: string = intl.formatMessage({
        id: "kontakt.system.personalia.infotekst.tekst",
    });

    if (kontonummer.brukerdefinert) {
        infotekst = intl.formatMessage({
            id: FAKTUM_KEY_KONTONUMMER + ".infotekst.tekst",
        });
    }
    const restStatus = soknadsdata.restStatus.personalia.kontonummer;
    if (oppstartsModus === true && restStatus === REST_STATUS.OK) {
        setOppstartsModus(false);
    }
    if (oppstartsModus) {
        return (
            <Sporsmal
                tekster={{
                    sporsmal: "Kontonummer",
                }}
            >
                <TextPlaceholder lines={3} />
            </Sporsmal>
        );
    }

    switch (kontonummer.systemverdi) {
        case null: {
            return (
                <Sporsmal
                    tekster={{
                        sporsmal: "Kontonummer",
                        infotekst,
                    }}
                >
                    <div>
                        <InputEnhanced
                            faktumKey={FAKTUM_KEY_KONTONUMMER}
                            id={faktumKeyKontonummerId}
                            inputMode="numeric"
                            className={"input--xxl faktumInput "}
                            disabled={kontonummer.harIkkeKonto ? kontonummer.harIkkeKonto : undefined}
                            verdi={inputVerdi}
                            required={false}
                            onChange={(input: string) => onChangeInput(input)}
                            onBlur={() => onBlur()}
                            maxLength={13}
                            bredde={"S"}
                        />
                        <CheckboksPanel
                            id="kontakt_kontonummer_har_ikke_checkbox"
                            name="kontakt_kontonummer_har_ikke_checkbox"
                            checked={kontonummer.harIkkeKonto ? kontonummer.harIkkeKonto : undefined}
                            onChange={(event: any) => onChangeCheckboks(event)}
                            label={
                                <div>
                                    {intl.formatMessage({
                                        id: FAKTUM_KEY_KONTONUMMER + ".harikke",
                                    })}
                                </div>
                            }
                        />
                    </div>
                </Sporsmal>
            );
        }
        default: {
            const faktumKeyFormatted = FAKTUM_KEY_KONTONUMMER.replace(/\./g, "_");
            return (
                <Sporsmal
                    faktumKey={FAKTUM_KEY_KONTONUMMER}
                    tekster={{
                        sporsmal: "Kontonummer",
                        infotekst,
                    }}
                >
                    <SysteminfoMedSkjema
                        skjemaErSynlig={kontonummer.brukerdefinert}
                        onVisSkjema={() => endreKontoBrukerdefinert(true)}
                        onSkjulSkjema={() => endreKontoBrukerdefinert(false)}
                        endreLabel={endreLabel}
                        avbrytLabel={avbrytLabel}
                        skjema={
                            <div id={faktumKeyFormatted}>
                                <InputEnhanced
                                    faktumKey={FAKTUM_KEY_KONTONUMMER}
                                    id={faktumKeyKontonummerId}
                                    inputMode="numeric"
                                    className={"input--xxl faktumInput "}
                                    disabled={kontonummer.harIkkeKonto ? kontonummer.harIkkeKonto : false}
                                    verdi={inputVerdi}
                                    required={false}
                                    onChange={(input: string) => onChangeInput(input)}
                                    onBlur={() => onBlur()}
                                    maxLength={13}
                                    bredde={"S"}
                                />

                                <CheckboksPanel
                                    id="kontakt_kontonummer_har_ikke_checkbox"
                                    name="kontakt_kontonummer_har_ikke_checkbox"
                                    checked={kontonummer.harIkkeKonto ? kontonummer.harIkkeKonto : false}
                                    onChange={(event: any) => onChangeCheckboks(event)}
                                    label={
                                        <div>
                                            {intl.formatMessage({
                                                id: FAKTUM_KEY_KONTONUMMER + ".harikke",
                                            })}
                                        </div>
                                    }
                                />
                            </div>
                        }
                    >
                        {!kontonummer.brukerdefinert && (
                            <OldSysteminfo
                                systeminfoMap={[
                                    {
                                        key: <FormattedMessage id={`${FAKTUM_KEY_KONTONUMMER}.label`} />,
                                        value: <OldSingleLineElement value={kontonummer.systemverdi} />,
                                    },
                                ]}
                            />
                        )}
                    </SysteminfoMedSkjema>
                </Sporsmal>
            );
        }
    }
};

export {Bankinformasjon as BankinformasjonView};

export default Bankinformasjon;
