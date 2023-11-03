import * as React from "react";
import {Sivilstatus} from "./Sivilstatus";
import {EktefelleDetaljer} from "./EktefelleDetaljer";
import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder";
import {useTranslation} from "react-i18next";
import {useSivilstatus} from "../../lib/hooks/data/useSivilstatus";
import {Heading} from "@navikt/ds-react";

export const DinSivilstatus = () => {
    const {sivilstatus, isPending} = useSivilstatus();
    const {t} = useTranslation("skjema");

    if (isPending) {
        return (
            <div>
                <Heading level={"2"} size={"medium"} spacing>
                    {t("familie.sivilstatus.sporsmal")}
                </Heading>
                <TextPlaceholder lines={6} />
            </div>
        );
    }

    if (sivilstatus?.sivilstatus === "gift" && sivilstatus.kildeErSystem) return <EktefelleDetaljer />;

    return <Sivilstatus />;
};
