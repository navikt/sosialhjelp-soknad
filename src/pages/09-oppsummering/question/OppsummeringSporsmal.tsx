import {Sporsmal} from "../../../generated/model";
import {useTranslation} from "react-i18next";
import {Label} from "@navikt/ds-react";
import {mapChangedIntlKeys} from "../mapChangedIntlKeys";
import {Warning} from "./Warning";
import {SporsmalFelt} from "../SporsmalFelt";
import React from "react";

export const OppsummeringSporsmal = ({sporsmal}: {sporsmal: Sporsmal}) => {
    const {t} = useTranslation();
    return (
        <div>
            {sporsmal.tittel && <Label spacing>{t(mapChangedIntlKeys(sporsmal.tittel))}</Label>}
            {!sporsmal.erUtfylt && <Warning />}
            <SporsmalFelt felt={sporsmal.felt} />
        </div>
    );
};
