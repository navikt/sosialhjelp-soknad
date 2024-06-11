import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm} from "react-hook-form";
import {BodyShort, Button, Checkbox, TextField} from "@navikt/ds-react";
import * as React from "react";
import {KontonummerFrontend, KontonummerInputDTO} from "../../generated/model";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {formatKontonummer, registerWithMasks} from "@fremtind/jkl-formatters-util";

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

    if (typeof defaultValues.brukerutfyltVerdi !== "string") {
        defaultValues.brukerutfyltVerdi = "";
    } else {
        defaultValues.brukerutfyltVerdi = formatKontonummer(defaultValues.brukerutfyltVerdi);
    }

    const form = useForm<KontonummerInputDTO>({
        defaultValues: defaultValues,
        resolver: zodResolver(KontonummerSchema),
    });

    const {
        handleSubmit,
        register,
        watch,
        formState: {
            errors: {brukerutfyltVerdi: kontonummerError},
        },
    } = form;

    const {registerWithKontonummerMask} = registerWithMasks(form);

    return (
        <form onSubmit={handleSubmit(onSave)} className={"space-y-4 pl-3 pt-2"}>
            <BodyShort weight={"semibold"}>{t("kontakt.kontonummer.label")}</BodyShort>
            <BodyShort size={"small"}>{t("kontakt.kontonummer.description")}</BodyShort>
            <TextField
                {...registerWithKontonummerMask("brukerutfyltVerdi")}
                label={t("kontakt.kontonummer.label")}
                inputMode="numeric"
                hideLabel={true}
                htmlSize={13}
                autoComplete="off"
                disabled={watch("harIkkeKonto") === true}
                required={false}
                maxLength={13}
                error={kontonummerError?.message && t(kontonummerError.message)}
            />
            <Checkbox {...register("harIkkeKonto")}>{t("kontakt.kontonummer.harikke")}</Checkbox>
            <div className={"space-x-2"}>
                <Button type={"submit"} data-testid="lagre-kontonummer">
                    {t("lagreEndring")}
                </Button>
                <Button variant="secondary" onClick={onCancel}>
                    {t("avbryt")}
                </Button>
            </div>
        </form>
    );
};
