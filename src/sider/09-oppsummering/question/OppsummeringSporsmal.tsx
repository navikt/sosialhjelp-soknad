import {Sporsmal} from "../../../generated/model";
import {Label} from "@navikt/ds-react";
import {Warning} from "./Warning";
import {SporsmalFelt} from "../SporsmalFelt";
import React from "react";
import {useBackendTranslation} from "./useBackendTranslationResult";

export const OppsummeringSporsmal = ({sporsmal}: {sporsmal: Sporsmal}) => {
    const {tBackend} = useBackendTranslation();
    return (
        <div>
            {sporsmal.tittel &&
            sporsmal.tittel === "utbetalinger.inntekt.skattbar.oppsummering_kort_konto_saldo_ingen" &&
            !sporsmal.erUtfylt ? (
                <div>{tBackend(sporsmal.tittel)}</div>
            ) : (
                sporsmal.tittel && <Label spacing>{tBackend(sporsmal.tittel)}</Label>
            )}
            {!(
                sporsmal.tittel === "utbetalinger.inntekt.skattbar.oppsummering_kort_konto_saldo_ingen" &&
                !sporsmal.erUtfylt
            ) &&
                !sporsmal.erUtfylt && <Warning />}
            <SporsmalFelt felt={sporsmal.felt} />
        </div>
    );
};
