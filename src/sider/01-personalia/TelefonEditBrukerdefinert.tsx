import {useTranslation} from "react-i18next";
import {BodyShort, Button, /*Select,*/ TextField} from "@navikt/ds-react";
import * as React from "react";
import {isValidNumber, parsePhoneNumber} from "libphonenumber-js";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {DigisosLanguageKey} from "../../lib/i18n/common.ts";

const TelefonnummerFormSchema = z
    .object({
        phoneNumber: z
            .string()
            .min(1, "kontakt.telefon.feil.tom")
            .min(6, "kontakt.telefon.feil.ugyldig")
            .max(11, "kontakt.telefon.feil.maxLength"),
        countryCode: z.string(),
    })
    .refine(({phoneNumber, countryCode}) => isValidNumber(`+${countryCode}${phoneNumber}`), {
        message: "kontakt.telefon.feil.ugyldig",
        path: ["phoneNumber"],
    });

type TelefonnummerFormType = z.infer<typeof TelefonnummerFormSchema>;

interface Props {
    onClose: () => void;
    telefonnummerBruker?: string;
    setTelefonnummer: (telefonnummer: string) => Promise<void>;
}
export const TelefonEditBrukerdefinert = ({onClose, telefonnummerBruker, setTelefonnummer}: Props) => {
    const number = telefonnummerBruker ? parsePhoneNumber(telefonnummerBruker) : null;
    const {handleSubmit, register, formState} = useForm<TelefonnummerFormType>({
        defaultValues: {
            phoneNumber: number?.nationalNumber,
            countryCode: number?.countryCallingCode ?? "47",
        },
        resolver: zodResolver(TelefonnummerFormSchema),
    });

    const {t} = useTranslation("skjema");

    const onSubmit: React.FormEventHandler<HTMLFormElement> = handleSubmit(async ({phoneNumber, countryCode}) => {
        const digits = phoneNumber.replaceAll(/[^0-9]/g, "");
        await setTelefonnummer(`+${countryCode}${digits}`);
        onClose();
    });

    return (
        <form onSubmit={onSubmit} className={"space-y-4 pt-8"}>
            <BodyShort weight={"semibold"}>{t("kontakt.telefon.tittel")}</BodyShort>
            <BodyShort className={"mt-2!"} size={"small"}>
                {t("kontakt.telefon.description")}
            </BodyShort>
            <div className={"flex gap-2 pb-2"}>
                <TextField
                    {...register("phoneNumber")}
                    maxLength={12}
                    htmlSize={12}
                    type={"tel"}
                    className={"inline"}
                    autoComplete={"tel"}
                    label={t("kontakt.telefon.telefonnummerFelt")}
                    hideLabel={true}
                    error={
                        formState.errors.phoneNumber && t(formState.errors.phoneNumber!.message! as DigisosLanguageKey)
                    }
                />
            </div>
            <div className={"space-x-2"}>
                <Button type={"submit"} data-testid="lagre-telefonnummer">
                    {t("lagreEndring")}
                </Button>
                <Button variant="secondary" onClick={() => onClose()}>
                    {t("avbryt.avbryt")}
                </Button>
            </div>
        </form>
    );
};
