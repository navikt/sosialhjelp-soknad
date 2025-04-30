import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm} from "react-hook-form";
import {BodyShort, Button, Checkbox} from "@navikt/ds-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {KontonummerInputField} from "./KontonummerInputField.tsx";
import {KontonummerSchema} from "./KontonummerSchema.tsx";

export const KontonrEdit = ({
    defaultValues,
    onSave,
    onCancel,
}: {
    defaultValues: z.infer<typeof KontonummerSchema>;
    onSave: SubmitHandler<z.infer<typeof KontonummerSchema>>;
    onCancel: () => void;
}) => {
    const {t} = useTranslation("skjema");

    const {handleSubmit, register, watch, control} = useForm({defaultValues, resolver: zodResolver(KontonummerSchema)});

    return (
        <form onSubmit={handleSubmit(onSave)} className={"space-y-4"}>
            <BodyShort weight={"semibold"}>{t("kontakt.kontonummer.label")}</BodyShort>
            <BodyShort className={"mt-2!"} size={"small"}>
                {t("kontakt.kontonummer.description")}
            </BodyShort>
            <KontonummerInputField
                control={control}
                name={"kontonummerBruker"}
                disabled={watch("harIkkeKonto") === true}
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
