import * as React from "react";
import {useEffect} from "react";
import {useIntl} from "react-intl";
import {useSelector, useDispatch} from "react-redux";

import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import Detaljeliste, {
    DetaljelisteElement,
} from "../../../../nav-soknad/components/detaljeliste";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import {erTelefonnummer} from "../../../../nav-soknad/validering/valideringer";
import {
    SoknadsSti,
    oppdaterSoknadsdataSti,
} from "../../../redux/soknadsdata/soknadsdataReducer";
import {Telefonnummer} from "./telefonTypes";
import {ValideringsFeilKode} from "../../../redux/validering/valideringActionTypes";
import {replaceDotWithUnderscore} from "../../../../nav-soknad/utils";
import {State} from "../../../redux/reducers";
import {
    hentSoknadsdata,
    lagreSoknadsdata,
} from "../../../redux/soknadsdata/soknadsdataActions";
import {
    clearValideringsfeil,
    setValideringsfeil,
} from "../../../redux/validering/valideringActions";

const FAKTUM_KEY_TELEFON = "kontakt.telefon";
const FAKTUM_KEY_SYSTEM_TELEFON = "kontakt.system.telefoninfo";
const LANDKODE = "+47";

const TelefonView = () => {
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector(
        (state: State) => state.soknad.behandlingsId
    );

    const intl = useIntl();

    const dispatch = useDispatch();

    useEffect(() => {
        if (behandlingsId) {
            dispatch(hentSoknadsdata(behandlingsId, SoknadsSti.TELEFONNUMMER));
        }
    }, [behandlingsId, dispatch]);

    const setBrukerdefinert = (verdi: boolean) => {
        if (behandlingsId) {
            const telefonnummer = soknadsdata.personalia.telefonnummer;
            telefonnummer.brukerdefinert = verdi;
            telefonnummer.brukerutfyltVerdi = null;
            forberedOgSendTelefonnummer(telefonnummer, behandlingsId);

            dispatch(
                oppdaterSoknadsdataSti(SoknadsSti.TELEFONNUMMER, telefonnummer)
            );
        }
    };

    const onChange = (verdi: any) => {
        const telefonnummer = soknadsdata.personalia.telefonnummer;
        telefonnummer.brukerutfyltVerdi = verdi;
        dispatch(clearValideringsfeil(FAKTUM_KEY_TELEFON));
        dispatch(
            oppdaterSoknadsdataSti(SoknadsSti.TELEFONNUMMER, telefonnummer)
        );
    };

    const onBlur = () => {
        if (behandlingsId) {
            const telefonnummer = {...soknadsdata.personalia.telefonnummer};
            forberedOgSendTelefonnummer(telefonnummer, behandlingsId);
        }
    };

    const forberedOgSendTelefonnummer = (
        telefonnummer: Telefonnummer,
        brukerBehandlingId: string
    ) => {
        let verdi = telefonnummer.brukerutfyltVerdi;
        let feilkode: ValideringsFeilKode | undefined = undefined;

        if (verdi === "" || verdi === null) {
            dispatch(clearValideringsfeil(FAKTUM_KEY_TELEFON));
        } else {
            verdi = fjernLandkode(verdi);
            verdi = verdi.replace(/[.]/g, "");
            telefonnummer.brukerutfyltVerdi = verdi;
            feilkode = validerTelefonnummer(verdi);
        }

        if (!feilkode) {
            if (
                telefonnummer.brukerutfyltVerdi !== null &&
                telefonnummer.brukerutfyltVerdi !== ""
            ) {
                telefonnummer.brukerutfyltVerdi =
                    LANDKODE + fjernLandkode(telefonnummer.brukerutfyltVerdi);
            }
            if (
                telefonnummer.brukerdefinert != null &&
                !telefonnummer.brukerdefinert
            ) {
                dispatch(
                    lagreSoknadsdata(
                        brukerBehandlingId,
                        SoknadsSti.TELEFONNUMMER,
                        telefonnummer,
                        () =>
                            dispatch(
                                hentSoknadsdata(
                                    brukerBehandlingId,
                                    SoknadsSti.TELEFONNUMMER
                                )
                            )
                    )
                );
            } else {
                dispatch(
                    lagreSoknadsdata(
                        brukerBehandlingId,
                        SoknadsSti.TELEFONNUMMER,
                        telefonnummer
                    )
                );
            }
        }
    };

    const validerTelefonnummer = (
        verdi: string
    ): ValideringsFeilKode | undefined => {
        const feilkode: ValideringsFeilKode | undefined = erTelefonnummer(
            verdi
        );
        if (verdi !== "" && feilkode) {
            // onEndretValideringsfeil(feilkode, FAKTUM_KEY_TELEFON, this.props.feil, () => {
            dispatch(setValideringsfeil(feilkode, FAKTUM_KEY_TELEFON));
            // });
        } else {
            dispatch(clearValideringsfeil(FAKTUM_KEY_TELEFON));
        }
        return feilkode;
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
    const verdi =
        telefonnummer && telefonnummer.brukerutfyltVerdi
            ? telefonnummer.brukerutfyltVerdi
            : "";
    const systemverdi = telefonnummer ? telefonnummer.systemverdi : "";

    const faktumKey = telefonnummer.brukerdefinert
        ? FAKTUM_KEY_TELEFON
        : FAKTUM_KEY_SYSTEM_TELEFON;
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
                        infotekst: {tittel: undefined, tekst: infotekst},
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
                        infotekst: {tittel: undefined, tekst: infotekst},
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
                            />
                        }
                    >
                        {!brukerdefinert && (
                            <Detaljeliste>
                                <DetaljelisteElement
                                    tittel={intl.formatHTMLMessage({
                                        id: "kontakt.system.telefon.label",
                                    })}
                                    verdi={systemverdi}
                                />
                            </Detaljeliste>
                        )}
                    </SysteminfoMedSkjema>
                </Sporsmal>
            );
        }
    }
};

export {TelefonView};

export default TelefonView;
