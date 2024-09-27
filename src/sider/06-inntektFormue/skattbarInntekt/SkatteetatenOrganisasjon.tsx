import {Organisasjon} from "../../../generated/model";
import {useTranslation} from "react-i18next";
import {BodyShort, Table} from "@navikt/ds-react";
import {SkatteetatenUtbetalingView} from "./SkatteetatenUtbetalingView";
import {LocalizedDate} from "../../../lib/components/LocalizedDate";
import * as React from "react";

export const SkatteetatenOrganisasjon = ({
    organisasjon: {fom, organisasjonsnavn, orgnr, tom, utbetalinger},
}: {
    organisasjon: Organisasjon;
}) => {
    const {t} = useTranslation("skjema");

    return (
        <>
            <Table key={orgnr}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell className={"!border-hidden"} colSpan={2}>
                            {t("utbetalinger.inntekt.skattbar.inntekt.tittel")}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {utbetalinger?.map((u, i) => <SkatteetatenUtbetalingView utbetaling={u} key={i} />)}
                </Table.Body>
            </Table>
            <BodyShort size={"small"} className={"pt-4"}>
                {organisasjonsnavn}
            </BodyShort>
            <BodyShort size={"small"}>
                {t("utbetalinger.inntekt.fra")} <LocalizedDate date={fom} /> {t("utbetalinger.inntekt.til")}{" "}
                <LocalizedDate date={tom} />
            </BodyShort>
        </>
    );
};
