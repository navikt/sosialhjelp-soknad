import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder";
import {Alert, BodyShort, Button, Heading, Link, Table} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useSkattData} from "../../lib/hooks/data/useSkattData";
import {MinusIcon} from "@navikt/aksel-icons";
import * as React from "react";
import styled from "styled-components";
import {SkattbarInntektOgForskuddstrekk} from "../../generated/model";
import {LocalizedDate} from "../../lib/components/LocalizedDate";
import {useEffect, useRef} from "react";
import {LastOppFil} from "./upload/LastOppFil";
import {OpplastetVedlegg} from "./OpplastetVedlegg";
import {VedleggFrontendVedleggStatus} from "../../generated/model";
import {useVedlegg} from "./upload/useVedlegg";
import {Opplysning} from "../../lib/opplysninger";
import {UploadError} from "./upload/UploadError";
import {FaroErrorBoundary} from "@grafana/faro-react";
import {useOpplysningTekster} from "./useOpplysningTekster";
import {LinkButton} from "../../lib/components/LinkButton";
import {useOpplysning} from "./useOpplysning";
import {OpplysningInputRad} from "./OpplysningInputRad";
import {VedleggFrontend} from "../../generated/model";
import {UtbetalingsListe} from "../06-inntektFormue/skattbarInntekt/SkattbarinntektForskuddstrekk";

const TabellView = ({opplysning}: {opplysning: VedleggFrontend}) => {
    const {
        textKey,
        multirow,
        inputs,
        form: {control},
        rows: {entries, append, remove},
    } = useOpplysning(opplysning);

    const {leggTilRad} = useOpplysningTekster(opplysning.type);

    return (
        <form>
            {entries.length > 0 && (
                <ul>
                    {entries.map(({id}, index) => (
                        <OpplysningInputRad
                            key={id}
                            textKey={textKey}
                            index={index}
                            control={control}
                            fields={inputs}
                            onDelete={index > 0 ? remove : undefined}
                        />
                    ))}
                    {multirow && (
                        <li className={`pt-3 pb-4`}>
                            <LinkButton onClick={() => append({})}>
                                <span aria-hidden={true}>+ </span>
                                {leggTilRad}
                            </LinkButton>
                        </li>
                    )}
                </ul>
            )}
        </form>
    );
};

const VedleggView = ({opplysning}: {opplysning: Opplysning}) => {
    const {t} = useTranslation();
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const previousErrorRef = useRef<string | null | undefined>();
    const {leggTilDokumentasjon} = useOpplysningTekster(opplysning.type);
    const {deleteFile, files, upload, error, loading} = useVedlegg(opplysning);

    useEffect(() => {
        if (error && error !== previousErrorRef.current) {
            setShowErrorAlert(true);
        } else if (!error) {
            setShowErrorAlert(false);
        }
        previousErrorRef.current = error;
    }, [error]);

    return (
        <div className={"pt-6 pb-6"}>
            <BodyShort size={"small"}>{leggTilDokumentasjon}</BodyShort>
            <FaroErrorBoundary fallback={(error, resetError) => <UploadError error={error} resetError={resetError} />}>
                <LastOppFil
                    opplysning={opplysning}
                    isDisabled={
                        loading || opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt
                    }
                    visSpinner={!!opplysning.pendingLasterOppFil}
                    doUpload={(file) => {
                        return upload(file).then(() => setShowSuccessAlert(true));
                    }}
                    resetAlerts={() => {
                        setShowSuccessAlert(false);
                        setShowErrorAlert(false);
                    }}
                />
            </FaroErrorBoundary>

            <ul className="vedleggsliste pb-2">
                {files.map((fil) => (
                    <OpplastetVedlegg
                        key={fil.uuid}
                        fil={fil}
                        onDelete={() => {
                            deleteFile(fil.uuid);
                            setShowSuccessAlert(false);
                        }}
                    />
                ))}
            </ul>
            {showSuccessAlert && <Alert variant="success">{t("vedlegg.opplasting.suksess")}</Alert>}
            {showErrorAlert && <Alert variant="error">{error}</Alert>}
        </div>
    );
};

const UnderskjemaArrow = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0.75rem 0.75rem 0.75rem;
    border-color: transparent transparent var(--a-lightblue-50) transparent;
    margin: 0;
    margin-left: 1rem;
    padding: 0;
`;

type SkattbartForskuddProps = {
    inntektOgForskuddstrekk?: SkattbarInntektOgForskuddstrekk[];
};

// TODO: Vi må filtrere vekk entries der organisasjoner er null. Garantert bare rot i DTOen på backend.
const HentetFraSkatteetaten = ({inntektOgForskuddstrekk}: SkattbartForskuddProps) => {
    const {t} = useTranslation("skjema", {keyPrefix: "utbetalinger.inntekt"});

    if (!inntektOgForskuddstrekk) return <TextPlaceholder lines={3} />;

    return (
        <div>
            <UnderskjemaArrow />
            <div className={"bg-lightblue-50 border-l-[var(--a-surface-info)] p-4 space-y-4 rounded-md"}>
                {!inntektOgForskuddstrekk.length && (
                    <Heading size={"xsmall"} level={"4"}>
                        {t("skattbar.ingen")}
                    </Heading>
                )}
                {inntektOgForskuddstrekk.map(
                    ({organisasjoner}) =>
                        organisasjoner?.map((org) => (
                            <Table key={org.orgnr}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan={2}>{t("skattbar.inntekt.tittel")}</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <UtbetalingsListe utbetalinger={org.utbetalinger} />
                                    <BodyShort size={"small"} className={"pt-4"}>
                                        {org.organisasjonsnavn}
                                    </BodyShort>
                                    <BodyShort size={"small"}>
                                        {t("fra")} <LocalizedDate date={org.fom} /> {t("til")}{" "}
                                        <LocalizedDate date={org.tom} />
                                    </BodyShort>
                                </Table.Body>
                            </Table>
                        ))
                )}
            </div>
        </div>
    );
};

export const ArbeidsVedlegg = ({opplysning}: {opplysning: Opplysning}) => {
    const {t} = useTranslation();

    const {data, samtykke, samtykkeTidspunkt, isLoading, setSamtykke} = useSkattData();

    const inntektFraSkatteetaten = data?.inntektFraSkatteetaten;
    const inntektFraSkatteetatenFeilet = data?.inntektFraSkatteetatenFeilet;

    if (isLoading) return <TextPlaceholder lines={3} />;
    if (inntektFraSkatteetatenFeilet)
        return <Alert variant="error">{t("utbetalinger.skattbar.kontaktproblemer")}</Alert>;
    if (samtykke && samtykkeTidspunkt === "")
        return <Alert variant="error">{t("utbetalinger.skattbar.kontaktproblemer")}</Alert>;

    return (
        <div>
            <BodyShort className={"pb-6"}>{t("opplysninger.arbeid.jobb.undertekst")}</BodyShort>

            {!samtykke && (
                <>
                    <BodyShort className={"pb-2"}>
                        {t("utbetalinger.inntekt.skattbar.hent.info.skatteetaten")}
                    </BodyShort>
                    <Button
                        variant="secondary"
                        className="last-opp-vedlegg-knapp"
                        onClick={() => setSamtykke(true)}
                        style={{backgroundColor: "var(--a-surface-default)"}}
                    >
                        <div className={"flex gap-1 items-center"}>
                            {t("utbetalinger.inntekt.skattbar.gi_samtykke")}
                        </div>
                    </Button>
                    <VedleggView opplysning={opplysning} />
                    <TabellView opplysning={opplysning} />
                </>
            )}

            {samtykke && (
                <>
                    <HentetFraSkatteetaten inntektOgForskuddstrekk={inntektFraSkatteetaten} />
                    <Link onClick={() => setSamtykke(false)}>
                        <div className={"flex gap-1 items-center"}>
                            <MinusIcon aria-label={""} /> {t("utbetalinger.inntekt.skattbar.ta_bort_samtykke")}
                        </div>
                    </Link>
                    {!inntektFraSkatteetaten?.length && (
                        <>
                            <VedleggView opplysning={opplysning} />
                            <TabellView opplysning={opplysning} />
                        </>
                    )}
                </>
            )}
        </div>
    );
};
