import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {Button, Checkbox, TextField} from "@navikt/ds-react";
import * as React from "react";
import {KontonummerInputDTO} from "../../generated/model";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useKontonummer} from "./useKontonummer";

const KontonummerRegex = new RegExp("^\\d{11}$");

const KontonummerSchema = z.object({
    brukerutfyltVerdi: z.string().regex(KontonummerRegex, "kontakt.kontonummer.feilmelding").optional(),
});

export const KontonrEdit = ({onClose}: {onClose: () => void}) => {
    const {t} = useTranslation("skjema");
    const {load, save} = useKontonummer();

    const {
        handleSubmit,
        register,
        watch,
        formState: {
            errors: {brukerutfyltVerdi: kontonummerError},
        },
    } = useForm<KontonummerInputDTO>({
        defaultValues: load,
        resolver: zodResolver(KontonummerSchema),
    });

    const update = async (konto: KontonummerInputDTO) => {
        save(konto);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(update)}>
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
                <Button variant="secondary" onClick={onClose}>
                    {t("avbryt")}
                </Button>
                <Button type={"submit"} data-testid="lagre-kontonummer">
                    {t("lagreEndring")}
                </Button>
            </div>
        </form>
    );
};
