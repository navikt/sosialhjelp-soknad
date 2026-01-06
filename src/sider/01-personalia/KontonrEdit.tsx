import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm} from "react-hook-form";
import {BodyShort, Button, Checkbox} from "@navikt/ds-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {KontonummerInputField} from "./KontonummerInputField.tsx";
import {KontonummerFormSchema, KontonummerFormValues} from "./KontonummerFormSchema.ts";

export const KontonrEdit = ({
    defaultValues,
    onSave,
    onCancel,
}: {
    defaultValues: KontonummerFormValues;
    onSave: SubmitHandler<KontonummerFormValues>;
    onCancel: () => void;
}) => {
    const {t} = useTranslation("skjema");

    const {handleSubmit, register, watch, control} = useForm({
        defaultValues,
        resolver: zodResolver(KontonummerFormSchema),
    });

    /* eslint-disable-next-line react-hooks/incompatible-library */
    const kontonummerInputDisabled = watch("harIkkeKonto") === true;
    return (
        <form onSubmit={handleSubmit(onSave)} className={"space-y-4"}>
            <BodyShort weight={"semibold"}>{t("kontakt.kontonummer.label")}</BodyShort>
            <BodyShort className={"mt-2!"} size={"small"}>
                {t("kontakt.kontonummer.description")}
            </BodyShort>
            <KontonummerInputField
                control={control}
                name={"kontonummerBruker"}
                disabled={kontonummerInputDisabled}
                rules={{required: false}}
            />
            <Checkbox {...register("harIkkeKonto")}>{t("kontakt.kontonummer.harikke.stringValue")}</Checkbox>
            <div className={"space-x-2"}>
                <Button type={"submit"} data-testid="lagre-kontonummer">
                    {t("lagreEndring")}
                </Button>
                <Button variant="secondary" onClick={onCancel}>
                    {t("avbryt.avbryt")}
                </Button>
            </div>
        </form>
    );
};
