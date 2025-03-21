import * as React from "react";
import {Sivilstatus} from "./Sivilstatus";
import {EktefelleDetaljer} from "./EktefelleDetaljer";
import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder";
import {useTranslation} from "react-i18next";
import {useSivilstatus} from "../../lib/hooks/data/useSivilstatus";
import {Heading} from "@navikt/ds-react";

export const DinSivilstatus = () => {
    const {sivilstatus, ektefelle, isLoading} = useSivilstatus();
    const {t} = useTranslation("skjema");

    if (isLoading) {
        return (
            <div>
                <Heading level={"2"} size={"medium"} spacing>
                    {t("familie.sivilstatus.sporsmal")}
                </Heading>
                <TextPlaceholder lines={6} />
            </div>
        );
    }

    if (sivilstatus === "GIFT" && ektefelle?.kildeErSystem) return <EktefelleDetaljer />;

    return <Sivilstatus />;
};
