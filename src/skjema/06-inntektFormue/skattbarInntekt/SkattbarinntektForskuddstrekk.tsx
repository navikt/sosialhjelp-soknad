import * as React from "react";
import {Detail, Heading, Link, Table} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {fmtCurrency} from "../../../lib/fmtCurrency";
import TextPlaceholder from "../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {Organisasjon, SkattbarInntektOgForskuddstrekk, Utbetaling} from "../../../generated/model";
import {LocalizedDate} from "../../../components/LocalizedDate";
import i18next from "i18next";
import {format} from "date-fns";

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

const UtbetalingsListe = ({utbetalinger}: {utbetalinger?: Utbetaling[]}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "utbetalinger.inntekt.skattbar"});

    return (
        <>
            {utbetalinger?.map(({brutto, forskuddstrekk: trekk}, index) => (
                <React.Fragment key={`utbetaling-${index}`}>
                    {brutto && (
                        <Table.Row>
                            <Table.HeaderCell>{t("bruttoinntekt")}:</Table.HeaderCell>
                            <Table.DataCell align={"right"}>{fmtCurrency(i18next.language, brutto)}</Table.DataCell>
                        </Table.Row>
                    )}
                    {trekk && (
                        <Table.Row>
                            <Table.HeaderCell>{t("forskuddstrekk")}:</Table.HeaderCell>
                            <Table.DataCell align={"right"}>{fmtCurrency(i18next.language, trekk)}</Table.DataCell>
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
        <div className={"border-l-4 bg-[var(--a-surface-info-subtle)] border-l-[var(--a-surface-info)] p-4 space-y-4"}>
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
                                    <Table.HeaderCell colSpan={2}>
                                        <div>{org.organisasjonsnavn}</div>
                                        <Detail>
                                            {t("fra")} <LocalizedDate date={org.fom} /> {t("til")}{" "}
                                            <LocalizedDate date={org.tom} />
                                        </Detail>
                                        <Detail>
                                            <Link href={getLenkeSti(org)} target="_blank" rel="noopener noreferrer">
                                                {t("skattbar.skatteetaten")}
                                            </Link>
                                        </Detail>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <UtbetalingsListe utbetalinger={org.utbetalinger} />
                            </Table.Body>
                        </Table>
                    ))
            )}
        </div>
    );
};

export default SkattbarinntektForskuddstrekk;
