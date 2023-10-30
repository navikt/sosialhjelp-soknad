import {useTranslation} from "react-i18next";
import {BodyShort, Table} from "@navikt/ds-react";
import LocalizedDate from "../../../components/LocalizedDate";
import {fmtCurrency} from "../../../lib/fmtCurrency";
import * as React from "react";
import {SysteminntektFrontend} from "../../../generated/model";

export const NavYtelserTable = ({systeminntekter = []}: {systeminntekter?: SysteminntektFrontend[]}) => {
    const {t, i18n} = useTranslation("skjema");

    if (!systeminntekter.length) return <BodyShort>{t("utbetalinger.ingen.true")}</BodyShort>;

    return (
        <div className={"border-l-4 bg-[var(--a-surface-info-subtle)] border-l-[var(--a-surface-info)] p-4 space-y-4"}>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{t("utbetalinger.utbetaling.erutbetalt.label")}</Table.HeaderCell>
                        <Table.HeaderCell>{t("utbetalinger.utbetaling.type.label")}</Table.HeaderCell>
                        <Table.HeaderCell align={"right"}>{t("inntekt.bostotte.utbetaling.belop")}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {systeminntekter.map((utbetaling, index) => (
                        <Table.Row key={index}>
                            <Table.DataCell>
                                <LocalizedDate date={utbetaling.utbetalingsdato} />
                            </Table.DataCell>
                            <Table.DataCell>{utbetaling.inntektType}</Table.DataCell>
                            <Table.DataCell align={"right"}>
                                {fmtCurrency(i18n.language, utbetaling.belop)}
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};
