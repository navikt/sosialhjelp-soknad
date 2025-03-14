import {BostotteSakDto, BostotteSakDtoVedtaksstatus} from "../../../generated/new/model";
import {useTranslation} from "react-i18next";
import {Table} from "@navikt/ds-react";
import {format} from "date-fns";
import * as React from "react";
import {DigisosLanguageKey} from "../../../lib/i18n/common.ts";

// Denne blir forenklet til String et eller annet sted upstream...
type HusbankenStatus = "UNDER_BEHANDLING" | "VEDTATT";
export type MonkeypatchedJsonBostotteSak = Omit<BostotteSakDto, "status"> & {status: HusbankenStatus};

// Utleder språknøkkel for vedtaksstatus
const getSakStatus = (vedtaksstatus: BostotteSakDtoVedtaksstatus, status: HusbankenStatus): DigisosLanguageKey => {
    if (status === "UNDER_BEHANDLING") return "inntekt.bostotte.husbanken.status.under_behandling";
    if (status !== "VEDTATT") throw new Error(`Ukjent status: ${status}`);

    if (vedtaksstatus === "AVSLAG") return "inntekt.bostotte.husbanken.vedtaksstatus.avslag";
    if (vedtaksstatus === "AVVIST") return "inntekt.bostotte.husbanken.vedtaksstatus.avvist";
    if (vedtaksstatus === "INNVILGET") return "inntekt.bostotte.husbanken.vedtaksstatus.innvilget";

    throw new Error(`Ugyldig vedtaksstatus: ${vedtaksstatus}`);
};

// OBS: Her har jeg måttet droppe "beskrivelses"-feltet.
export const HusbankenSaker = ({saker}: {saker: MonkeypatchedJsonBostotteSak[]}) => {
    const {t} = useTranslation("skjema");

    if (!saker.length) return <div>{t("inntekt.bostotte.husbanken.ingensakerfunnet")}</div>;

    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>{t("inntekt.bostotte.sak.dato")}</Table.HeaderCell>
                    <Table.HeaderCell colSpan={2}>{t("inntekt.bostotte.sak.status")}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {saker.map((sak, index) => (
                    <Table.Row key={index} shadeOnHover={false}>
                        <Table.DataCell colSpan={2}>{format(new Date(sak.dato!), "LLLL yyyy")}</Table.DataCell>
                        <Table.DataCell>{t(getSakStatus(sak.vedtaksstatus!, sak.status))}</Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};
