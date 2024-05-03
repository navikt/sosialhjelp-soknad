import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder";
import {Alert, BodyShort, Button, Heading, Link, Table} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useSkattData} from "../../lib/hooks/data/useSkattData";
import {MinusIcon} from "@navikt/aksel-icons";
import * as React from "react";
import styled from "styled-components";
import {SkattbarInntektOgForskuddstrekk, Utbetaling} from "../../generated/model";
import {LocalizedCurrency} from "../../lib/components/LocalizedCurrency";
import {LocalizedDate} from "../../lib/components/LocalizedDate";

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

const UtbetalingsListe = ({utbetalinger}: {utbetalinger?: Utbetaling[]}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "utbetalinger.inntekt.skattbar"});

    return (
        <>
            {utbetalinger?.map(({brutto, forskuddstrekk: trekk}, index) => (
                <React.Fragment key={`utbetaling-${index}`}>
                    {brutto && (
                        <Table.Row shadeOnHover={false}>
                            <Table.HeaderCell>
                                <BodyShort>{t("bruttoinntekt")}:</BodyShort>
                            </Table.HeaderCell>
                            <Table.DataCell align={"right"}>
                                <LocalizedCurrency value={brutto} />
                            </Table.DataCell>
                        </Table.Row>
                    )}
                    {trekk && (
                        <Table.Row shadeOnHover={false}>
                            <Table.HeaderCell>
                                <BodyShort>{t("forskuddstrekk")}:</BodyShort>
                            </Table.HeaderCell>
                            <Table.DataCell align={"right"}>
                                <LocalizedCurrency value={trekk} />
                            </Table.DataCell>
                        </Table.Row>
                    )}
                    {brutto && trekk && (
                        <Table.Row shadeOnHover={false}>
                            <Table.HeaderCell>
                                <BodyShort>{t("nettoinntekt")}:</BodyShort>
                            </Table.HeaderCell>
                            <Table.DataCell align={"right"}>
                                <LocalizedCurrency value={brutto - trekk} />
                            </Table.DataCell>
                        </Table.Row>
                    )}
                </React.Fragment>
            ))}
        </>
    );
};

type SkattbartForskuddProps = {
    inntektOgForskuddstrekk?: SkattbarInntektOgForskuddstrekk[];
};

// TODO: Vi må filtrere vekk entries der organisasjoner er null. Garantert bare rot i DTOen på backend.
const SkattbarinntektForskuddstrekk = ({inntektOgForskuddstrekk}: SkattbartForskuddProps) => {
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

export const HentFraSkatteetaten = () => {
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
                </>
            )}

            {samtykke && (
                <>
                    <SkattbarinntektForskuddstrekk inntektOgForskuddstrekk={inntektFraSkatteetaten} />
                    <Link onClick={() => setSamtykke(false)}>
                        <div className={"flex gap-1 items-center"}>
                            <MinusIcon aria-label={""} /> {t("utbetalinger.inntekt.skattbar.ta_bort_samtykke")}
                        </div>
                    </Link>
                </>
            )}
        </div>
    );
};
