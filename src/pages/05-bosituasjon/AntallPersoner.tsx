import * as React from "react";
import {useContext} from "react";
import {getFeil} from "../../lib/utils/enhancedComponentUtils";
import {useBosituasjon} from "../../lib/hooks/data/useBosituasjon";
import {useTranslation} from "react-i18next";
import {TextField} from "@navikt/ds-react";
import {ValideringsFeilKode} from "../../lib/validering";
import {ValideringsContext} from "../../lib/valideringContextProvider";
import {validerAntallPersoner} from "./lib/validerAntallPersoner";

const FAKTUM_KEY_ANTALL = "bosituasjon.antallpersoner";

export const AntallPersoner = () => {
    const {bosituasjon, setBosituasjon} = useBosituasjon();
    const {t} = useTranslation("skjema");

    const {
        state: {feil},
        dispatch,
    } = useContext(ValideringsContext);

    const errorMessage = getFeil(feil, t, FAKTUM_KEY_ANTALL, undefined);

    return (
        <TextField
            className={"mb-12 lg:mb-24"}
            description={t("bosituasjon.antallpersoner.label")}
            label={t("bosituasjon.antallpersoner.sporsmal")}
            id={FAKTUM_KEY_ANTALL}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            htmlSize={5}
            defaultValue={bosituasjon?.antallPersoner}
            onBlur={async (event) => {
                try {
                    await setBosituasjon({antallPersoner: validerAntallPersoner(event.target.value)});
                    dispatch({type: "clearValideringsfeil", faktumKey: FAKTUM_KEY_ANTALL});
                } catch (_e) {
                    dispatch({
                        type: "setValideringsfeil",
                        valideringsfeil: {faktumKey: FAKTUM_KEY_ANTALL, feilkode: ValideringsFeilKode.ER_TALL},
                    });
                }
            }}
            onChange={() => dispatch({type: "clearValideringsfeil", faktumKey: FAKTUM_KEY_ANTALL})}
            error={errorMessage && t(errorMessage)}
        />
    );
};
