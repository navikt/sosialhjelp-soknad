// TODO: Vi må filtrere vekk entries der organisasjoner er null. Garantert bare rot i DTOen på backend.
import {SkattbarInntektOgForskuddstrekk} from "../../generated/model";
import {useTranslation} from "react-i18next";
import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder";
import {BodyShort, Heading, Table} from "@navikt/ds-react";
import {UtbetalingsListe} from "../06-inntektFormue/skattbarInntekt/SkattbarinntektForskuddstrekk";
import {LocalizedDate} from "../../lib/components/LocalizedDate";
import * as React from "react";

export const HentetFraSkatteetaten = ({
    inntektOgForskuddstrekk,
}: {
    inntektOgForskuddstrekk?: SkattbarInntektOgForskuddstrekk[];
}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "utbetalinger.inntekt"});

    if (!inntektOgForskuddstrekk) return <TextPlaceholder lines={3} />;

    return (
        <div>
            <div className={"bg-lightblue-50 border-l-[var(--a-surface-info)] p-4 space-y-4 rounded-md"}>
                {!inntektOgForskuddstrekk.length && (
                    <Heading size={"xsmall"} level={"4"}>
                        {t("skattbar.ingen")}
                    </Heading>
                )}
                {inntektOgForskuddstrekk.map(({organisasjoner}) =>
                    organisasjoner?.map((org) => (
                        <Table key={org.orgnr}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell colSpan={2}>{t("skattbar.inntekt.tittel")}</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <UtbetalingsListe utbetalinger={org.utbetalinger} />
                                <BodyShort size={"small"} className={"pt-4"}>
                                    {org.organisasjonsnavn}
                                </BodyShort>
                                <BodyShort size={"small"}>
                                    {t("fra")} <LocalizedDate date={org.fom} /> {t("til")}{" "}
                                    <LocalizedDate date={org.tom} />
                                </BodyShort>
                            </Table.Body>
                        </Table>
                    ))
                )}
            </div>
        </div>
    );
};
