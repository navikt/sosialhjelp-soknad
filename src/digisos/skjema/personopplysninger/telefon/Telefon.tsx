import {useEffect} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {useSelector, useDispatch} from "react-redux";

import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {SysteminfoMedSkjema} from "../../../../nav-soknad/components/systeminfoMedSkjema";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import {erTelefonnummer} from "../../../../nav-soknad/validering/valideringer";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {Telefonnummer} from "./telefonTypes";
import {ValideringsFeilKode} from "../../../redux/validering/valideringActionTypes";
import {replaceDotWithUnderscore} from "../../../../nav-soknad/utils";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata, lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {clearValideringsfeil, setValideringsfeil} from "../../../redux/validering/valideringActions";
import {SingleLineElement, Systeminfo} from "../../../../nav-soknad/components/systeminfo/Systeminfo";
import * as React from "react";

const FAKTUM_KEY_TELEFON = "kontakt.telefon";
const FAKTUM_KEY_SYSTEM_TELEFON = "kontakt.system.telefoninfo";
const LANDKODE = "+47";

const TelefonView = () => {
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);

    const intl = useIntl();

    const dispatch = useDispatch();

    useEffect(() => {
        if (behandlingsId) {
            hentSoknadsdata(behandlingsId, SoknadsSti.TELEFONNUMMER, dispatch);
        }
    }, [behandlingsId, dispatch]);

    const setBrukerdefinert = (verdi: boolean) => {
        if (behandlingsId) {
            const telefonnummer = soknadsdata.personalia.telefonnummer;
            telefonnummer.brukerdefinert = verdi;
            telefonnummer.brukerutfyltVerdi = null;
            forberedOgSendTelefonnummer(telefonnummer, behandlingsId);

            dispatch(oppdaterSoknadsdataSti(SoknadsSti.TELEFONNUMMER, telefonnummer));
        }
    };

    const onChange = (verdi: any) => {
        const telefonnummer = soknadsdata.personalia.telefonnummer;
        telefonnummer.brukerutfyltVerdi = verdi;
        dispatch(clearValideringsfeil(FAKTUM_KEY_TELEFON));
        dispatch(oppdaterSoknadsdataSti(SoknadsSti.TELEFONNUMMER, telefonnummer));
    };

    const onBlur = () => {
        if (behandlingsId) {
            const telefonnummer = {...soknadsdata.personalia.telefonnummer};
            forberedOgSendTelefonnummer(telefonnummer, behandlingsId);
        }
    };

    const forberedOgSendTelefonnummer = (telefonnummer: Telefonnummer, brukerBehandlingId: string) => {
        let verdi = telefonnummer.brukerutfyltVerdi;
        let erGyldigTelefonnummer: boolean = true;

        if (verdi === "" || verdi === null) {
            dispatch(clearValideringsfeil(FAKTUM_KEY_TELEFON));
        } else {
            verdi = fjernLandkode(verdi);
            verdi = verdi.replace(/[.]/g, "");
            telefonnummer.brukerutfyltVerdi = verdi;
            erGyldigTelefonnummer = validerTelefonnummer(verdi);
        }

        if (erGyldigTelefonnummer) {
            if (telefonnummer.brukerutfyltVerdi !== null && telefonnummer.brukerutfyltVerdi !== "") {
                telefonnummer.brukerutfyltVerdi = LANDKODE + fjernLandkode(telefonnummer.brukerutfyltVerdi);
            }
            if (telefonnummer.brukerdefinert != null && !telefonnummer.brukerdefinert) {
                lagreSoknadsdata(brukerBehandlingId, SoknadsSti.TELEFONNUMMER, telefonnummer, dispatch, () =>
                    hentSoknadsdata(brukerBehandlingId, SoknadsSti.TELEFONNUMMER, dispatch)
                );
            } else {
                lagreSoknadsdata(brukerBehandlingId, SoknadsSti.TELEFONNUMMER, telefonnummer, dispatch);
            }
        }
    };

    const validerTelefonnummer = (verdi: string): boolean => {
        const erGyldigTelefonnummer = erTelefonnummer(verdi);
        if (verdi !== "" && !erGyldigTelefonnummer) {
            // onEndretValideringsfeil(feilkode, FAKTUM_KEY_TELEFON, this.props.feil, () => {
            dispatch(setValideringsfeil(ValideringsFeilKode.ER_TELEFONNUMMER, FAKTUM_KEY_TELEFON));
            // });
        } else {
            dispatch(clearValideringsfeil(FAKTUM_KEY_TELEFON));
        }
        return erGyldigTelefonnummer;
    };

    const fjernLandkode = (telefonnummer: string) => {
        telefonnummer = telefonnummer.replace(/^\+47/, "");
        telefonnummer = telefonnummer.replace(/^0047/, "");
        return telefonnummer;
    };

    const formatMessage = (id: string): string => {
        return intl.formatMessage({id});
    };

    const telefonnummer = soknadsdata.personalia.telefonnummer;

    const brukerdefinert = telefonnummer ? telefonnummer.brukerdefinert : false;
    const verdi = telefonnummer && telefonnummer.brukerutfyltVerdi ? telefonnummer.brukerutfyltVerdi : "";
    const systemverdi = telefonnummer ? telefonnummer.systemverdi : "";

    const faktumKey = telefonnummer.brukerdefinert ? FAKTUM_KEY_TELEFON : FAKTUM_KEY_SYSTEM_TELEFON;
    const endreLabel = formatMessage("kontakt.system.telefon.endreknapp.label");
    const avbrytLabel = formatMessage("systeminfo.avbrytendringknapp.label");
    const infotekst = formatMessage(faktumKey + ".infotekst.tekst");
    const sporsmal = formatMessage(faktumKey + ".sporsmal");
    const faktumKeyTelefonId = replaceDotWithUnderscore(FAKTUM_KEY_TELEFON);

    switch (systemverdi) {
        case null: {
            return (
                <Sporsmal
                    tekster={{
                        sporsmal,
                        infotekst,
                    }}
                >
                    <InputEnhanced
                        id={faktumKeyTelefonId}
                        type="tel"
                        maxLength={14}
                        bredde={"S"}
                        className="skjemaelement__enLinje185bredde"
                        verdi={verdi}
                        onChange={(input: string) => onChange(input)}
                        onBlur={() => onBlur()}
                        getName={() => FAKTUM_KEY_TELEFON}
                        faktumKey={FAKTUM_KEY_TELEFON}
                        required={false}
                    />
                </Sporsmal>
            );
        }
        default: {
            return (
                <Sporsmal
                    tekster={{
                        sporsmal,
                        infotekst,
                    }}
                >
                    <SysteminfoMedSkjema
                        skjemaErSynlig={brukerdefinert ? brukerdefinert : false}
                        onVisSkjema={() => setBrukerdefinert(true)}
                        onSkjulSkjema={() => setBrukerdefinert(false)}
                        endreLabel={endreLabel}
                        avbrytLabel={avbrytLabel}
                        skjema={
                            <InputEnhanced
                                id={faktumKeyTelefonId}
                                type="tel"
                                maxLength={14}
                                bredde={"S"}
                                className="skjemaelement__enLinje185bredde"
                                verdi={verdi}
                                onChange={(input: string) => onChange(input)}
                                onBlur={() => onBlur()}
                                getName={() => FAKTUM_KEY_TELEFON}
                                faktumKey={FAKTUM_KEY_TELEFON}
                                required={false}
                                autoFocus
                            />
                        }
                    >
                        {!brukerdefinert && (
                            <Systeminfo
                                systeminfoMap={[
                                    {
                                        key: <FormattedMessage id={"kontakt.system.telefon.label"} />,
                                        value: <SingleLineElement value={systemverdi} />,
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

export {TelefonView};

export default TelefonView;
