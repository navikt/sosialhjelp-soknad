import {useTranslation} from "react-i18next";
import {BodyShort, Button, /* Select,*/ TextField} from "@navikt/ds-react";
import * as React from "react";
import {useTelefonnummer} from "../../lib/hooks/data/useTelefonnummer";
//import * as libphonenumber from "libphonenumber-js";
import {isValidNumber, parsePhoneNumber} from "libphonenumber-js";
//import {emojiFlag} from "./EmojiFlag";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const TelefonnummerFormSchema = z
    .object({
        phoneNumber: z.string().min(1, "kontakt.telefon.feil.tom").max(11, "kontakt.telefon.feil.maxLength"),
        countryCode: z.string(),
    })
    .refine(({phoneNumber, countryCode}) => isValidNumber(`+${countryCode}${phoneNumber}`), {
        message: "kontakt.telefon.feil.ugyldig",
        path: ["phoneNumber"],
    });

type TelefonnummerFormType = z.infer<typeof TelefonnummerFormSchema>;

export const TelefonEditBrukerdefinert = ({onClose}: {onClose: () => void}) => {
    const {data, setTelefonnummer} = useTelefonnummer();

    const number = data?.brukerutfyltVerdi ? parsePhoneNumber(data?.brukerutfyltVerdi) : null;

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
    //TODO: LEGG TILBAKE ETTER AVKLARING FRA TIETO-EVRY
    /**
     *                <div className={"flex gap-2 pb-2"}>
     *                     <div>
     *                         <Select
     *                             hideLabel={true}
     *                             label={t("kontakt.telefon.landskode")}
     *                             {...register("countryCode")}
     *                             error={formState.errors.countryCode && t(formState.errors.phoneNumber!.message!)}
     *                         >
     *                             {libphonenumber
     *                                 .getCountries()
     *                                 .map((country) => [
     *                                     emojiFlag(country.toString()),
     *                                     libphonenumber.getCountryCallingCode(country),
     *                                 ])
     *                                 .map(([flagEmoji, callingCode]) => (
     *                                     <option
     *                                         key={callingCode}
     *                                         value={callingCode}
     *                                     >{`${flagEmoji} +${callingCode}`}</option>
     *                                 ))}
     *                         </Select>
     *                     </div>
     *                   </div>
     *
     *
     *
     *
     */

    return (
        <form onSubmit={onSubmit} className={"space-y-4 pt-8"}>
            <BodyShort weight={"semibold"}>{t("kontakt.telefon.tittel")}</BodyShort>
            <BodyShort className={"!mt-2"} size={"small"}>
                {t("kontakt.telefon.description")}
            </BodyShort>
            <div className={"flex gap-2 pb-2"}>
                <TextField
                    {...register("phoneNumber")}
                    maxLength={11}
                    htmlSize={11}
                    type={"tel"}
                    className={"inline"}
                    autoComplete={"tel-national"}
                    label={t("kontakt.telefon.telefonnummerFelt")}
                    hideLabel={true}
                    error={formState.errors.phoneNumber && t(formState.errors.phoneNumber!.message!)}
                />
            </div>
            <div className={"space-x-2"}>
                <Button type={"submit"} data-testid="lagre-telefonnummer">
                    {t("lagreEndring")}
                </Button>
                <Button variant="secondary" onClick={() => onClose()}>
                    {t("avbryt")}
                </Button>
            </div>
        </form>
    );
};
