import React, {useEffect, useState} from "react";
import {Alert, ConfirmationPanel, Heading, Label} from "@navikt/ds-react";
import {SoknadsmottakerInfoPanel} from "./SoknadsmottakerInfoPanel";
import {ListOfValues} from "./question/ListOfValues";
import {OppsummeringSporsmal} from "./question/OppsummeringSporsmal";
import {SystemData} from "./question/SystemData";
import {FreeText} from "./question/FreeText";
import {Warning} from "./question/Warning";
import {SystemDataMap} from "./question/SystemDataMap";
import {Attachment} from "./question/Attachment";
import {useNavigate} from "react-router";
import {ApplicationSpinner} from "../../nav-soknad/components/applicationSpinner/ApplicationSpinner";
import StegMedNavigasjon from "../../nav-soknad/components/SkjemaSteg/SkjemaStegLegacy";
import {digisosSkjemaConfig} from "../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import {logInfo, logWarning} from "../../nav-soknad/utils/loggerUtils";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {useTranslation} from "react-i18next";
import {NavEnhetInaktiv, NyNavEnhet} from "../01-personalia/adresse/NavEnhet";
import {useGetOppsummering} from "../../generated/oppsummering-ressurs/oppsummering-ressurs";
import {SendTilUrlFrontendSendtTil, Steg} from "../../generated/model";
import {useHentAdresser} from "../../generated/adresse-ressurs/adresse-ressurs";
import {erAktiv} from "../../nav-soknad/containers/navEnhetStatus";
import {logAmplitudeEvent} from "../../nav-soknad/utils/amplitude";
import {basePath} from "../../configuration";
import {useSendSoknad} from "../../generated/soknad-actions/soknad-actions";
import {useFeatureFlags} from "../../lib/featureFlags";
import {OppsummeringSteg} from "./OppsummeringSteg";
import {OppsummeringHeading, OppsummeringPersonalia} from "./oppsummeringer/personalia";
import {useAlgebraic} from "../../lib/hooks/useAlgebraic";
import {useHentBegrunnelse} from "../../generated/begrunnelse-ressurs/begrunnelse-ressurs";

const OppsummeringBegrunnelse = () => {
    const {expectOK} = useAlgebraic(useHentBegrunnelse(useBehandlingsId()));

    return expectOK(({hvorforSoke, hvaSokesOm}) => {
        return (
            <div>
                <OppsummeringHeading stepNr={2}>Søknad</OppsummeringHeading>
                <div className={"space-y-2 py-2 "}>
                    <Heading level={"4"} size={"xsmall"}>
                        Du søker om:
                    </Heading>
                    <div>{hvaSokesOm}</div>
                    <Heading level={"4"} size={"xsmall"}>
                        Begrunnelse:
                    </Heading>
                    <div>{hvorforSoke}</div>
                </div>
            </div>
        );
    });
};

// Midlertidig hack for å fortsatt bruke gamle oppsummering inntil brukertest av ny
const INTL_KEYS_MAP: Record<string, string> = {
    "begrunnelse.hva.sporsmal": "begrunnelse.hva.label",
    "begrunnelse.hvorfor.sporsmal": "begrunnelse.hvorfor.label",
    "dinsituasjon.studerer.true.grad.sporsmal": "dinsituasjon.studerer.grad.sporsmal",
    "dinsituasjon.studerer.true.grad.deltid": "dinsituasjon.studerer.grad.deltid",
    "dinsituasjon.studerer.true.grad.heltid": "dinsituasjon.studerer.grad.heltid",
};
const mapChangedIntlKeys = (intlKey: string): string => INTL_KEYS_MAP?.[intlKey] ?? intlKey;
export const Oppsummering = () => {
    const {viStolerPaaDeg, oppsummeringNavEnhet} = useFeatureFlags();
    const [bekreftet, setBekreftet] = useState<boolean>(false);
    const [bekreftetFeil, setBekreftetFeil] = useState<string | null>(null);
    const behandlingsId = useBehandlingsId();
    const {nyOppsummering} = useFeatureFlags();

    const navigate = useNavigate();

    const {t} = useTranslation("skjema");

    const {isLoading, data} = useGetOppsummering(behandlingsId);

    const {data: adresser} = useHentAdresser(behandlingsId);

    const {mutateAsync, isError} = useSendSoknad({
        mutation: {
            onSuccess: ({id, sendtTil}) => {
                const redirectUrl: Record<SendTilUrlFrontendSendtTil, string> = {
                    FIKS_DIGISOS_API: `${process.env.REACT_APP_INNSYN_URL}${id}/status`,
                    SVARUT: `${basePath}/skjema/${id}/ettersendelse`,
                };

                window.location.href = redirectUrl[sendtTil];
            },
        },
    });
    useEffect(() => {
        if (adresser === undefined) return;
        if (erAktiv(adresser.navEnhet)) return;

        logWarning(`Ugyldig søknadsmottaker ${adresser.navEnhet} på side 9, ville normalt sendt bruker til side 1`);

        //navigate("../1");
    }, [adresser, navigate]);

    const getAttributesForSkjemaFullfortEvent = () => {
        const attr: Record<string, any> = {};
        if (!data) return attr;

        data.steg.forEach((steg) =>
            steg.avsnitt.forEach((avsnitt) =>
                avsnitt.sporsmal.forEach(({tittel, felt}) => {
                    if (tittel === "bosituasjon.sporsmal") attr["valgtBosted"] = !!felt?.length;
                    if (tittel === "arbeidsforhold.infotekst") attr["harArbeidsforhold"] = !!felt?.length;
                    if (tittel === "utbetalinger.inntekt.skattbar.har_gitt_samtykke") attr["skattSamtykke"] = true;
                    if (tittel === "utbetalinger.inntekt.skattbar.mangler_samtykke") attr["skattSamtykke"] = false;
                })
            )
        );

        return attr;
    };
    const adresseValg = useHentAdresser(behandlingsId).data?.valg;

    const sendInnSoknad = async () => {
        if (!bekreftet) {
            setBekreftetFeil("Du må bekrefte før du kan fortsette");
            return;
        }

        logAmplitudeEvent("skjema fullført", getAttributesForSkjemaFullfortEvent());
        if (adresseValg) logInfo("klikk--" + adresseValg);

        await mutateAsync({behandlingsId});
    };

    if (isLoading) return <ApplicationSpinner />;

    const kunLegacySteg = (steg: Steg) => !nyOppsummering || ![1, 2].includes(steg.stegNr);

    return (
        <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"oppsummering"} onSend={sendInnSoknad}>
            <div>
                {nyOppsummering && (
                    <>
                        <OppsummeringPersonalia />
                        <OppsummeringBegrunnelse />
                    </>
                )}
                {data?.steg.filter(kunLegacySteg).map((steg) => (
                    <OppsummeringSteg steg={steg} key={steg.stegNr}>
                        {steg.avsnitt.map((avsnitt) => (
                            <OppsummeringSporsmal key={avsnitt.tittel} title={t(avsnitt.tittel)}>
                                {avsnitt.sporsmal?.map((sporsmal) => {
                                    return (
                                        <div key={sporsmal.tittel}>
                                            {sporsmal.tittel && (
                                                <Label spacing>{t(mapChangedIntlKeys(sporsmal.tittel))} </Label>
                                            )}
                                            {!sporsmal.erUtfylt && <Warning />}
                                            <SystemData
                                                felter={sporsmal.felt?.filter((felt) => felt.type === "SYSTEMDATA")}
                                            />
                                            <SystemDataMap
                                                felter={sporsmal.felt?.filter((felt) => felt.type === "SYSTEMDATA_MAP")}
                                            />
                                            <ListOfValues
                                                felter={sporsmal.felt?.filter((felt) => felt.type === "CHECKBOX")}
                                            />
                                            <Attachment
                                                behandlingsId={behandlingsId}
                                                felter={sporsmal.felt?.filter((felt) => felt.type === "VEDLEGG")}
                                            />
                                            <FreeText felter={sporsmal.felt?.filter((felt) => felt.type === "TEKST")} />
                                        </div>
                                    );
                                })}
                            </OppsummeringSporsmal>
                        ))}
                    </OppsummeringSteg>
                ))}

                {oppsummeringNavEnhet ? <NyNavEnhet navEnhet={adresser?.navEnhet} /> : <SoknadsmottakerInfoPanel />}

                <ConfirmationPanel
                    label={
                        viStolerPaaDeg ? (
                            <div className={"!whitespace-pre"}>
                                {t("soknadsosialhjelp.oppsummering.bekreftelse.ny.checkbox")}
                            </div>
                        ) : (
                            t("soknadsosialhjelp.oppsummering.harLestSamtykker")
                        )
                    }
                    checked={bekreftet}
                    onChange={(e) => setBekreftet(e.target.checked)}
                    error={bekreftetFeil}
                >
                    {viStolerPaaDeg ? (
                        <Heading level={"4"} size={"small"}>
                            {t("soknadsosialhjelp.oppsummering.bekreftelse.ny.label")}
                        </Heading>
                    ) : (
                        t("soknadsosialhjelp.oppsummering.bekreftOpplysninger")
                    )}
                </ConfirmationPanel>

                {isError && (
                    <div role="alert">
                        <Alert variant="error" style={{marginTop: "1rem"}}>
                            Vi klarte ikke sende søknaden din, grunnet en midlertidig teknisk feil. Vi ber deg prøve
                            igjen. Søknaden din er lagret og dersom problemet fortsetter kan du forsøke igjen senere.
                            Kontakt ditt NAV kontor dersom du er i en nødsituasjon.
                        </Alert>
                    </div>
                )}

                <NavEnhetInaktiv navEnhet={adresser?.navEnhet} />
            </div>
        </StegMedNavigasjon>
    );
};

export default Oppsummering;
