import {useTranslation} from "react-i18next";
import {BodyShort, Table} from "@navikt/ds-react";
import {LocalizedDate} from "../../../lib/components/LocalizedDate";
import {LocalizedCurrency} from "../../../lib/components/LocalizedCurrency";
import * as React from "react";
import {JsonOkonomiOpplysningUtbetaling} from "../../../generated/client/model";

// FIXME: Should not initialize with empty list; empty list should be returned from API
export const HusbankenUtbetalinger = ({utbetalinger}: {utbetalinger?: JsonOkonomiOpplysningUtbetaling[]}) => {
    const {t} = useTranslation("skjema");

    if (!utbetalinger) return null;
    if (!utbetalinger.length) return <BodyShort>{t("inntekt.bostotte.husbanken.ingenutbetalingerfunnet")}</BodyShort>;

    const getMottakerText = (mottaker: JsonOkonomiOpplysningUtbetaling["mottaker"]) => {
        if (mottaker === "Husstand") return "inntekt.bostotte.husbanken.mottaker.husstand";
        if (mottaker === "Kommune") return "inntekt.bostotte.husbanken.mottaker.kommune";
        throw new Error(`Ukjent mottaker: ${mottaker}`);
    };

    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>{t("utbetalinger.utbetaling.erutbetalt.label")}</Table.HeaderCell>
                    <Table.HeaderCell className={"w-fit"}>{t("inntekt.bostotte.utbetaling.mottaker")}</Table.HeaderCell>
                    <Table.HeaderCell align={"left"}>{t("inntekt.bostotte.utbetaling.belop")}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {utbetalinger.map((utbetaling, index) => (
                    <Table.Row key={index} shadeOnHover={false}>
                        <Table.DataCell>
                            <LocalizedDate date={utbetaling.utbetalingsdato} />
                        </Table.DataCell>
                        <Table.DataCell>{t(getMottakerText(utbetaling.mottaker))}</Table.DataCell>

                        <Table.DataCell align={"left"}>
                            <LocalizedCurrency value={utbetaling.netto} />
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
