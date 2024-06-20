// TODO: Vi må filtrere vekk entries der organisasjoner er null. Garantert bare rot i DTOen på backend.
import {SkattbarInntektOgForskuddstrekk} from "../../generated/model";
import {useTranslation} from "react-i18next";
import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder";
import {BodyShort, Heading, Table} from "@navikt/ds-react";
import {LocalizedDate} from "../../lib/components/LocalizedDate";
import * as React from "react";
import {SkatteetatenUtbetalingView} from "../06-inntektFormue/skattbarInntekt/SkatteetatenUtbetalingView";

export const HentetFraSkatteetaten = ({inntekt}: {inntekt: SkattbarInntektOgForskuddstrekk[] | undefined}) => {
    const {t} = useTranslation("skjema");

    return (
        <div className={"bg-lightblue-50 border-l-[var(--a-surface-info)] p-4 space-y-4 rounded-md"}>
            {!inntekt ? (
                <TextPlaceholder lines={3} />
            ) : !inntekt.length ? (
                <Heading size={"xsmall"} level={"4"}>
                    {t("utbetalinger.inntekt.skattbar.ingen")}
                </Heading>
            ) : (
                inntekt.map(({organisasjoner}) =>
                    organisasjoner?.map(({fom, organisasjonsnavn, orgnr, tom, utbetalinger}) => (
                        <Table key={orgnr}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell colSpan={2}>
                                        {t("utbetalinger.inntekt.skattbar.inntekt.tittel")}
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {utbetalinger?.map((u, i) => <SkatteetatenUtbetalingView utbetaling={u} key={i} />)}
                                <BodyShort size={"small"} className={"pt-4"}>
                                    {organisasjonsnavn}
                                </BodyShort>
                                <BodyShort size={"small"}>
                                    {t("utbetalinger.inntekt.fra")} <LocalizedDate date={fom} />{" "}
                                    {t("utbetalinger.inntekt.til")} <LocalizedDate date={tom} />
                                </BodyShort>
                            </Table.Body>
                        </Table>
                    ))
                )
            )}
        </div>
    );
};
