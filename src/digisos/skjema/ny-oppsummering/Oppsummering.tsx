import React, {useEffect, useState} from "react";
import {Accordion, ConfirmationPanel, Link, Label, Alert} from "@navikt/ds-react";
import {SoknadsmottakerInfoPanel} from "./SoknadsmottakerInfoPanel";
import {ListOfValues} from "./question/ListOfValues";
import {Edit} from "@navikt/ds-icons";
import {Question as QuestionEl} from "./question/Question";
import {SystemData} from "./question/SystemData";
import {FreeText} from "./question/FreeText";
import {Warning} from "./question/Warning";
import {SystemDataMap} from "./question/SystemDataMap";
import {Attachment} from "./question/Attachment";
import {useNavigate} from "react-router";
import {ApplicationSpinner} from "../../../nav-soknad/components/applicationSpinner/ApplicationSpinner";
import {Link as ReactRouterLink} from "react-router-dom";
import styled from "styled-components";
import StegMedNavigasjon from "../../../nav-soknad/components/SkjemaSteg/SkjemaStegLegacy";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import {logInfo, logWarning} from "../../../nav-soknad/utils/loggerUtils";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {useTranslation} from "react-i18next";
import {NavEnhetInaktiv} from "../personopplysninger/adresse/NavEnhet";
import {useGetOppsummering} from "../../../generated/oppsummering-ressurs/oppsummering-ressurs";
import {SendTilUrlFrontendSendtTil, Steg} from "../../../generated/model";
import {useHentAdresser} from "../../../generated/adresse-ressurs/adresse-ressurs";
import {erAktiv} from "../../../nav-soknad/containers/navEnhetStatus";
import {createSkjemaEventData, logAmplitudeEvent} from "../../../nav-soknad/utils/amplitude";
import {getInnsynUrl} from "../../../nav-soknad/utils/rest-utils";
import {basePath} from "../../../configuration";
import {useSendSoknad} from "../../../generated/soknad-actions/soknad-actions";

export const EditAnswerLink = (props: {steg: number; questionId: string}) => {
    const behandlingsId = useBehandlingsId();
    return (
        <Link href={`/sosialhjelp/soknad/skjema/${behandlingsId}/${props.steg}#${props.questionId}`}>
            <Edit />
            Endre svar
        </Link>
    );
};

export const Oppsummering = () => {
    const [bekreftet, setBekreftet] = useState<boolean>(false);
    const [bekreftetFeil, setBekreftetFeil] = useState<string | null>(null);
    const behandlingsId = useBehandlingsId();

    const navigate = useNavigate();

    const {t} = useTranslation("skjema");

    const {isLoading, data} = useGetOppsummering(behandlingsId);

    const {data: adresser} = useHentAdresser(behandlingsId);

    const {mutateAsync, isError} = useSendSoknad({
        mutation: {
            onSuccess: ({id, sendtTil}) => {
                const redirectUrl: Record<SendTilUrlFrontendSendtTil, string> = {
                    FIKS_DIGISOS_API: `${getInnsynUrl()}${id}/status`,
                    SVARUT: `${basePath}/skjema/${id}/ettersendelse`,
                };

                window.location.href = redirectUrl[sendtTil];
            },
        },
    });
    useEffect(() => {
        if (erAktiv(adresser?.navEnhet)) return;

        // TODO: Mer brukervennlig melding her
        logWarning(`Ugyldig søknadsmottaker ${adresser?.navEnhet} på side 9, sender bruker til side 1`);

        navigate("../1");
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

        logAmplitudeEvent("skjema fullført", createSkjemaEventData(getAttributesForSkjemaFullfortEvent()));
        if (adresseValg) logInfo("klikk--" + adresseValg);

        mutateAsync({behandlingsId});
    };

    const bekreftOpplysninger: string = t("soknadsosialhjelp.oppsummering.harLestSamtykker");

    if (isLoading) return <ApplicationSpinner />;

    return (
        <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"oppsummering"} onSend={sendInnSoknad}>
            <div>
                {data?.steg.map((bolk) => {
                    return (
                        <OppsummeringBolk bolk={bolk} key={bolk.stegNr}>
                            {bolk.avsnitt.map((avsnitt) => (
                                <QuestionEl key={avsnitt.tittel} title={t(avsnitt.tittel)}>
                                    {avsnitt.sporsmal?.map((sporsmal) => {
                                        return (
                                            <div key={sporsmal.tittel}>
                                                {sporsmal.tittel && <Label spacing>{t(sporsmal.tittel)} </Label>}
                                                {!sporsmal.erUtfylt && <Warning />}
                                                <SystemData
                                                    felter={sporsmal.felt?.filter((felt) => felt.type === "SYSTEMDATA")}
                                                />
                                                <SystemDataMap
                                                    felter={sporsmal.felt?.filter(
                                                        (felt) => felt.type === "SYSTEMDATA_MAP"
                                                    )}
                                                />
                                                <ListOfValues
                                                    felter={sporsmal.felt?.filter((felt) => felt.type === "CHECKBOX")}
                                                />
                                                <Attachment
                                                    behandlingsId={behandlingsId}
                                                    felter={sporsmal.felt?.filter((felt) => felt.type === "VEDLEGG")}
                                                />
                                                <FreeText
                                                    felter={sporsmal.felt?.filter((felt) => felt.type === "TEKST")}
                                                />
                                            </div>
                                        );
                                    })}
                                </QuestionEl>
                            ))}
                        </OppsummeringBolk>
                    );
                })}

                <SoknadsmottakerInfoPanel />

                <ConfirmationPanel
                    label={bekreftOpplysninger}
                    checked={bekreftet}
                    onChange={(e) => setBekreftet(e.target.checked)}
                    error={bekreftetFeil}
                >
                    {t("soknadsosialhjelp.oppsummering.bekreftOpplysninger")}
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

const EditAnswer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const OppsummeringBolk = (props: {bolk: Steg; children: React.ReactNode}) => {
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>{t(props.bolk.tittel)}</Accordion.Header>
                <Accordion.Content>
                    <EditAnswer>
                        <ReactRouterLink className="navds-link" to={`/skjema/${behandlingsId}/${props.bolk.stegNr}`}>
                            Gå tilbake for å endre
                        </ReactRouterLink>
                    </EditAnswer>
                    {props.children}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default Oppsummering;
