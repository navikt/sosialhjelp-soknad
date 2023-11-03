import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Checkbox, TextField} from "@navikt/ds-react";
import * as React from "react";
import {KontonummerFrontend, KontonummerInputDTO} from "../../generated/model";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

const KontonummerRegex = new RegExp("^\\d{11}$");

const transformEmptyStringToNull = z.literal("").transform(() => null);

const KontonummerSchema = z.object({
    brukerutfyltVerdi: z
        .string()
        .regex(KontonummerRegex, "kontakt.kontonummer.feilmelding")
        .optional()
        .or(transformEmptyStringToNull),
    harIkkeKonto: z.boolean().optional(),
});

export const KontonrEdit = ({
    defaultValues,
    onSave,
    onCancel,
}: {
    defaultValues: KontonummerFrontend;
    onSave: SubmitHandler<KontonummerInputDTO>;
    onCancel: () => void;
}) => {
    const {t} = useTranslation("skjema");

    const {
        handleSubmit,
        register,
        watch,
        formState: {
            errors: {brukerutfyltVerdi: kontonummerError},
        },
    } = useForm<KontonummerInputDTO>({
        defaultValues: defaultValues,
        resolver: zodResolver(KontonummerSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSave)}>
            <TextField
                {...register("brukerutfyltVerdi")}
                label={t("kontakt.kontonummer.sporsmal")}
                inputMode="numeric"
                htmlSize={13}
                autoComplete="off"
                disabled={watch("harIkkeKonto") === true}
                required={false}
                maxLength={13}
                error={kontonummerError?.message && t(kontonummerError.message)}
            />
            <Checkbox {...register("harIkkeKonto")}>{t("kontakt.kontonummer.harikke")}</Checkbox>
            <div className={"space-x-2"}>
                <Button variant="secondary" onClick={onCancel}>
                    {t("avbryt")}
                </Button>
                <Button type={"submit"} data-testid="lagre-kontonummer">
                    {t("lagreEndring")}
                </Button>
            </div>
        </form>
    );
};
