import * as React from "react";
import {Alert, Box, InlineMessage} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {TextPlaceholder} from "../../../lib/components/animasjoner/TextPlaceholder";
import {useSkatteetatenData} from "../../../lib/hooks/data/useSkatteetatenData";
import {SkatteetatenOrganisasjon} from "./SkatteetatenOrganisasjon";

export const Skatteetaten = () => {
    const {inntekt, isError, isPending} = useSkatteetatenData();
    const {t} = useTranslation("skjema");

    if (isError) return <Alert variant="error">{t("utbetalinger.skattbar.kontaktproblemer")}</Alert>;
    if (isPending || !inntekt) return <TextPlaceholder lines={3} />;

    if (inntekt.length === 0)
        return (
            <>
                <InlineMessage status="info" size="medium">
                    {t("utbetalinger.inntekt.skattbar.ingen")}
                </InlineMessage>
            </>
        );

    return (
        <Box padding="space-16">
            {inntekt.map(({organisasjoner}) =>
                organisasjoner?.map((o) => <SkatteetatenOrganisasjon key={o.orgnr} organisasjon={o} />)
            )}
        </Box>
    );
};
