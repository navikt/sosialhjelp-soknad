import {useEffect, useState} from "react";
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
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {SkjemaStegLegacy} from "../../lib/components/SkjemaSteg/SkjemaStegLegacy";
import {digisosSkjemaConfig} from "../../lib/components/SkjemaSteg/digisosSkjema";
import {logInfo, logWarning} from "../../lib/utils/loggerUtils";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useTranslation} from "react-i18next";
import {NavEnhetInaktiv, NyNavEnhet} from "../01-personalia/adresse/NavEnhet";
import {useGetOppsummering} from "../../generated/oppsummering-ressurs/oppsummering-ressurs";
import {SendTilUrlFrontendSendtTil, Steg} from "../../generated/model";
import {useHentAdresser} from "../../generated/adresse-ressurs/adresse-ressurs";
import {erAktiv} from "../../lib/navEnhetStatus";
import {logAmplitudeEvent} from "../../lib/utils/amplitude";
import {sendSoknad} from "../../generated/soknad-actions/soknad-actions";
import {useFeatureFlags} from "../../lib/featureFlags";
import {OppsummeringSteg} from "./OppsummeringSteg";
import {OppsummeringHeading, NyOppsummeringPrototypePersonalia} from "./oppsummeringer/personalia";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentBegrunnelse} from "../../generated/begrunnelse-ressurs/begrunnelse-ressurs";
import {basePath, innsynURL} from "../../lib/config";
import {faro} from "@grafana/faro-react";
import {SjekkelisteIllustrasjon} from "../../lib/components/svg/illustrasjoner/SjekkelisteIllustrasjon";

const NyOppsummeringPrototypeBegrunnelse = () => {
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
    const {oppsummeringNavEnhet} = useFeatureFlags();
    const [bekreftet, setBekreftet] = useState<boolean>(false);
    const [bekreftetFeil, setBekreftetFeil] = useState<string | null>(null);
    const behandlingsId = useBehandlingsId();
    const {nyOppsummering} = useFeatureFlags();

    const navigate = useNavigate();

    const {t} = useTranslation("skjema");

    const {isLoading, data} = useGetOppsummering(behandlingsId);
    const [isError, setIsError] = useState<boolean>(false);

    const {data: adresser} = useHentAdresser(behandlingsId);

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

        attr.language = localStorage.getItem("digisos-language");

        return attr;
    };
    const adresseValg = useHentAdresser(behandlingsId).data?.valg;

    const sendInnSoknad = async () => {
        if (!bekreftet) {
            setBekreftetFeil("oppsummering.feilmelding.bekreftmangler");
            return;
        }

        logAmplitudeEvent("skjema fullført", getAttributesForSkjemaFullfortEvent());
        if (adresseValg) logInfo("klikk--" + adresseValg);

        try {
            const {id, sendtTil} = await sendSoknad(behandlingsId);

            const redirectUrl: Record<SendTilUrlFrontendSendtTil, string> = {
                FIKS_DIGISOS_API: `${innsynURL}${id}/status`,
                SVARUT: `${basePath}/skjema/${id}/ettersendelse`,
            };

            window.location.href = redirectUrl[sendtTil];
        } catch (e) {
            faro.api.pushError(e);
            setIsError(true);
        }
    };

    if (isLoading) return <ApplicationSpinner />;

    const kunLegacySteg = (steg: Steg) => !nyOppsummering || ![1, 2].includes(steg.stegNr);

    return (
        <SkjemaStegLegacy
            skjemaConfig={digisosSkjemaConfig}
            steg={"oppsummering"}
            onSend={sendInnSoknad}
            ikon={<SjekkelisteIllustrasjon />}
        >
            <div>
                {nyOppsummering && (
                    <>
                        <NyOppsummeringPrototypePersonalia />
                        <NyOppsummeringPrototypeBegrunnelse />
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
                    label={t("soknadsosialhjelp.oppsummering.harLestSamtykker")}
                    checked={bekreftet}
                    onChange={(e) => setBekreftet(e.target.checked)}
                    error={bekreftetFeil && t(bekreftetFeil)}
                >
                    {t("soknadsosialhjelp.oppsummering.bekreftOpplysninger")}
                </ConfirmationPanel>

                {isError && (
                    <Alert role="alert" variant="error" style={{marginTop: "1rem"}}>
                        {t("soknad.innsendingFeilet")}
                    </Alert>
                )}

                <NavEnhetInaktiv navEnhet={adresser?.navEnhet} />
            </div>
        </SkjemaStegLegacy>
    );
};
export default Oppsummering;
