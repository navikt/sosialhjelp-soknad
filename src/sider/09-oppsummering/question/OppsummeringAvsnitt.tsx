import React from "react";
import {Heading, VStack} from "@navikt/ds-react";
import {Avsnitt} from "../../../generated/model";
import {OppsummeringSporsmal} from "./OppsummeringSporsmal";
import {useTranslation} from "react-i18next";
import {DigisosLanguageKey} from "../../../lib/i18n/common.ts";

export const OppsummeringAvsnitt = ({avsnitt: {tittel, sporsmal}}: {avsnitt: Avsnitt}) => {
    const {t} = useTranslation();

    return (
        <div className={"mb-8"}>
            <div className={"flex items-baseline gap-3"}>
                <Heading level="3" size="small" spacing>
                    {t(tittel as DigisosLanguageKey)}
                </Heading>
            </div>
            <VStack gap="4">
                {sporsmal?.map((sporsmal, i) => <OppsummeringSporsmal sporsmal={sporsmal} key={i} />)}
            </VStack>
        </div>
    );
};
