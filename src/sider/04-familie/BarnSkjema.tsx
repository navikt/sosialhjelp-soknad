import YesNoInput from "../../lib/components/form/YesNoInput";
import {DigisosReadMore} from "../../lib/components/DigisosReadMore";
import {Loader, TextField} from "@navikt/ds-react";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {useAnsvar} from "../../lib/hooks/data/useAnsvar";
import {z} from "zod";

import {ValideringsFeilKode} from "../../lib/validering";

const SamvaersgradSchema = z.coerce
    .number({invalid_type_error: ValideringsFeilKode.ER_TALL})
    .min(0, ValideringsFeilKode.ER_SAMVAERSGRAD)
    .max(100, ValideringsFeilKode.ER_SAMVAERSGRAD);

export const BarnSkjema = ({barnIndex}: {barnIndex: number}) => {
    const {t} = useTranslation("skjema");
    const {ansvar, setHarDeltBosted, setSamvaersgrad, isDelayedPending} = useAnsvar(barnIndex);
    const [samvaersgradError, setSamvaersgradError] = React.useState<string | undefined>(undefined);
    if (!ansvar) return null;

    return (
        <div className={"mt-16! mb-16!"}>
            {ansvar.folkeregistrertSammen ? (
                <YesNoInput
                    legend={
                        <div>
                            {t("system.familie.barn.true.barn.deltbosted.sporsmal")}
                            {isDelayedPending && <Loader />}
                        </div>
                    }
                    description={
                        <DigisosReadMore>
                            {t("system.familie.barn.true.barn.deltbosted.hjelpetekst.tekst")}
                        </DigisosReadMore>
                    }
                    defaultValue={ansvar.deltBosted}
                    name={`deltbosted_barn${barnIndex}`}
                    onChange={(checked) => setHarDeltBosted(checked)}
                />
            ) : (
                <TextField
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="off"
                    htmlSize={15}
                    name={`barn${barnIndex}_samvaersgrad`}
                    defaultValue={ansvar.samvarsgrad?.toString() ?? ""}
                    onBlur={({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
                        try {
                            const grad = SamvaersgradSchema.parse(value);
                            setSamvaersgrad(grad);
                            setSamvaersgradError(undefined);
                        } catch (e: any) {
                            setSamvaersgradError(t(e.issues[0].message));
                        }
                    }}
                    error={samvaersgradError}
                    label={
                        <div>
                            {t("system.familie.barn.true.barn.grad.sporsmal")}
                            {isDelayedPending && <Loader />}
                        </div>
                    }
                    description={t("system.familie.barn.true.barn.grad.pattern")}
                    maxLength={3}
                    required={false}
                />
            )}
        </div>
    );
};
