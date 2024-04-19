import * as React from "react";
import {BodyShort, Heading, Table} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {TextPlaceholder} from "../../../lib/components/animasjoner/TextPlaceholder";
import {SkattbarInntektOgForskuddstrekk, Utbetaling} from "../../../generated/model";
import {LocalizedDate} from "../../../lib/components/LocalizedDate";
import {LocalizedCurrency} from "../../../lib/components/LocalizedCurrency";
import styled from "styled-components";

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
/*
const getLenkeSti = ({orgnr, tom}: Organisasjon): string => {
    const baseUrl = "https://skatt.skatteetaten.no/web/innsynamelding/inntekt";
    const url = new URL(orgnr ? `${baseUrl}/${orgnr}` : baseUrl);

    const tomDate = new Date(tom);

    const params = new URLSearchParams({
        year: format(tomDate, "yyyy"),
        month: format(tomDate, "MM"),
    });

    url.search = params.toString();

    return url.toString();
};
*/
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
export const SkattbarinntektForskuddstrekk = ({inntektOgForskuddstrekk}: SkattbartForskuddProps) => {
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
