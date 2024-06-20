import React from "react";
import {Heading} from "@navikt/ds-react";
import {Avsnitt} from "../../../generated/model";
import {OppsummeringSporsmal} from "./OppsummeringSporsmal";
import {useTranslation} from "react-i18next";

export const OppsummeringAvsnitt = ({avsnitt: {tittel, sporsmal}}: {avsnitt: Avsnitt}) => {
    const {t} = useTranslation();

    return (
        <div className={"mb-8"}>
            <div className={"flex items-baseline gap-3"}>
                <Heading level="3" size="small" spacing>
                    {t(tittel)}
                </Heading>
            </div>
            {sporsmal?.map((sporsmal) => <OppsummeringSporsmal sporsmal={sporsmal} key={sporsmal.tittel} />)}
        </div>
    );
};
