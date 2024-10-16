import * as React from "react";
import {Alert, Heading, Box} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {TextPlaceholder} from "../../../lib/components/animasjoner/TextPlaceholder";
import {useSkatteetatenData} from "../../../lib/hooks/data/useSkatteetatenData";
import {SkatteetatenOrganisasjon} from "./SkatteetatenOrganisasjon";

export const Skatteetaten = () => {
    const {inntekt, isError, isPending} = useSkatteetatenData();
    const {t} = useTranslation("skjema");

    if (isPending || !inntekt) return <TextPlaceholder lines={3} />;
    if (isError) return <Alert variant="error">{t("utbetalinger.skattbar.kontaktproblemer")}</Alert>;

    if (inntekt.length === 0)
        return (
            <>
                <Heading size={"xsmall"} level={"4"}>
                    {t("utbetalinger.inntekt.skattbar.ingen")}
                </Heading>
            </>
        );

    return (
        <Box>
            {inntekt.map(({organisasjoner}) =>
                organisasjoner?.map((o) => <SkatteetatenOrganisasjon key={o.orgnr} organisasjon={o} />)
            )}
        </Box>
    );
};
