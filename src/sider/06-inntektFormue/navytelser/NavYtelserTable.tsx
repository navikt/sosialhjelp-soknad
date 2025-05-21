import {Table} from "@navikt/ds-react";
import {LocalizedDate} from "../../../lib/components/LocalizedDate";
import * as React from "react";
import {LocalizedCurrency} from "../../../lib/components/LocalizedCurrency";
import {NavUtbetalingerDto} from "../../../generated/new/model";
import {useTranslations} from "next-intl";

export const NavYtelserTable = ({navUtbetalinger}: {navUtbetalinger: NavUtbetalingerDto[]}) => {
    const t = useTranslations("NavYtelserTable");

    return (
        <Table className={"border-hidden"}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>{t("utbetalt")}</Table.HeaderCell>
                    <Table.HeaderCell>{t("ytelse")}</Table.HeaderCell>
                    <Table.HeaderCell>{t("belop")}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {navUtbetalinger.map(({belop, utbetalingsdato}, index) => (
                    <Table.Row key={index} shadeOnHover={false} className="border-b border-blue-200 last:border-b-0">
                        <Table.DataCell>
                            <LocalizedDate date={utbetalingsdato} />
                        </Table.DataCell>
                        <Table.DataCell>{t("ytelse")}</Table.DataCell>
                        <Table.DataCell align={"left"}>
                            <LocalizedCurrency value={belop} />
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
