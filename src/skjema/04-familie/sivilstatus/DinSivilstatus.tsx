import * as React from "react";
import {Sivilstatus} from "./Sivilstatus";
import {EktefelleDetaljer} from "./EktefelleDetaljer";
import {Sporsmal} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {TextPlaceholder} from "../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {getFaktumSporsmalTekst} from "../../../nav-soknad/utils";
import {useTranslation} from "react-i18next";
import {useSivilstatus} from "./useSivilstatus";

const DinSivilstatusView = () => {
    const {sivilstatus, isPending} = useSivilstatus();
    const {t} = useTranslation("skjema");

    if (isPending) {
        return (
            <Sporsmal tekster={getFaktumSporsmalTekst(t, "familie.sivilstatus")}>
                <TextPlaceholder lines={6} />
            </Sporsmal>
        );
    }

    if (sivilstatus?.sivilstatus === "gift" && sivilstatus.kildeErSystem) return <EktefelleDetaljer />;

    return <Sivilstatus />;
};

export default DinSivilstatusView;
