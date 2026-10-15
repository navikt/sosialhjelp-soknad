import {useTranslation} from "react-i18next";
import {BodyShort, Table} from "@navikt/ds-react";
import {SkatteetatenUtbetalingView} from "./SkatteetatenUtbetalingView";
import {LocalizedDate} from "../../../lib/components/LocalizedDate";
import * as React from "react";
import {OrganisasjonDto} from "../../../generated/model";

export const SkatteetatenOrganisasjon = ({
    organisasjon: {fom, organisasjonsnavn, orgnr, tom, utbetalinger},
}: {
    organisasjon: OrganisasjonDto;
}) => {
    const {t} = useTranslation("skjema");

    return (
        <>
            <BodyShort size={"small"} className={"pt-4"}>
                {organisasjonsnavn}
            </BodyShort>
            <BodyShort size={"small"}>
                {t("utbetalinger.inntekt.fra")} <LocalizedDate date={fom} /> {t("utbetalinger.inntekt.til")}{" "}
                <LocalizedDate date={tom} />
            </BodyShort>
            <Table key={orgnr}>
                <Table.Body>
                    {utbetalinger?.map((u, i) => (
                        <SkatteetatenUtbetalingView utbetaling={u} key={i} />
                    ))}
                </Table.Body>
            </Table>
        </>
    );
};
