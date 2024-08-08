import {Sporsmal} from "../../../generated/client/model";
import {Label} from "@navikt/ds-react";
import {Warning} from "./Warning";
import {SporsmalFelt} from "../SporsmalFelt";
import React from "react";
import {useBackendTranslation} from "./useBackendTranslationResult";

export const OppsummeringSporsmal = ({sporsmal}: {sporsmal: Sporsmal}) => {
    const {tBackend} = useBackendTranslation();
    return (
        <div>
            {sporsmal.tittel && <Label spacing>{tBackend(sporsmal.tittel)}</Label>}
            {!sporsmal.erUtfylt && <Warning />}
            <SporsmalFelt felt={sporsmal.felt} />
        </div>
    );
};
