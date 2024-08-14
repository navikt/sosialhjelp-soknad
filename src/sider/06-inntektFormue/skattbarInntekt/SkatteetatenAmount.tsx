import {Table} from "@navikt/ds-react";
import {LocalizedCurrency} from "../../../lib/components/LocalizedCurrency";
import * as React from "react";

export const SkatteetatenAmount = ({label, amount}: {label: string; amount: number}) => (
    <Table.Row shadeOnHover={false}>
        <Table.HeaderCell>{label}</Table.HeaderCell>
        <Table.DataCell align={"right"}>
            <LocalizedCurrency value={amount} />
        </Table.DataCell>
    </Table.Row>
);
