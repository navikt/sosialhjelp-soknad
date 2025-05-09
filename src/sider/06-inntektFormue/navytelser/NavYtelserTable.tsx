import {useTranslation} from "react-i18next";
import {BodyShort, Table} from "@navikt/ds-react";
import {LocalizedDate} from "../../../lib/components/LocalizedDate";
import * as React from "react";
import {LocalizedCurrency} from "../../../lib/components/LocalizedCurrency";
import {NavUtbetalingerDto} from "../../../generated/new/model";

export const NavYtelserTable = ({systeminntekter = []}: {systeminntekter?: NavUtbetalingerDto[]}) => {
    const {t} = useTranslation("skjema");

    if (!systeminntekter.length) return <BodyShort>{t("utbetalinger.ingen.true")}</BodyShort>;

    return (
        <div className={"bg-lightblue-50 border-l-[var(--a-surface-info)] p-4 space-y-4 rounded-md"}>
            <Table className={"border-hidden"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{t("utbetalinger.utbetaling.erutbetalt.label")}</Table.HeaderCell>
                        <Table.HeaderCell>{t("utbetalinger.utbetaling.type.label")}</Table.HeaderCell>
                        <Table.HeaderCell>{t("utbetalinger.utbetaling.belop.label")}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {systeminntekter.map((utbetaling, index) => (
                        <Table.Row
                            key={index}
                            shadeOnHover={false}
                            className={index === systeminntekter.length - 1 ? "" : "border-b border-blue-200"}
                        >
                            <Table.DataCell>
                                <LocalizedDate date={utbetaling.utbetalingsdato} />
                            </Table.DataCell>
                            <Table.DataCell>{utbetaling.ytelsestype}</Table.DataCell>
                            <Table.DataCell align={"left"}>
                                <LocalizedCurrency value={utbetaling.belop} />
                            </Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};
