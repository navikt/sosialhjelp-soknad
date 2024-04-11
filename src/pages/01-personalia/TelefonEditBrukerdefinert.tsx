import {useTranslation} from "react-i18next";
import {BodyShort, Button, Select, TextField} from "@navikt/ds-react";
import * as React from "react";
import {useTelefonnummer} from "../../lib/hooks/data/useTelefonnummer";
import * as libphonenumber from "libphonenumber-js";
import {isValidNumber, parsePhoneNumber} from "libphonenumber-js";
import {emojiFlag} from "./EmojiFlag";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const TelefonnummerFormSchema = z
    .object({
        phoneNumber: z.string().min(1, "kontakt.telefon.feil.tom"),
        countryCode: z.string(),
    })
    .refine(({phoneNumber, countryCode}) => isValidNumber(`+${countryCode}${phoneNumber}`), {
        message: "kontakt.telefon.feil.ugyldig",
        path: ["phoneNumber"],
    });

type FormType = {
    phoneNumber: string;
    countryCode: string;
};

export const TelefonEditBrukerdefinert = ({onClose}: {onClose: () => void}) => {
    const {data, setTelefonnummer} = useTelefonnummer();

    const number = data?.brukerutfyltVerdi ? parsePhoneNumber(data?.brukerutfyltVerdi) : null;

    const {handleSubmit, reset, register, formState} = useForm<FormType>({
        defaultValues: {
            phoneNumber: number?.nationalNumber,
            countryCode: number?.countryCallingCode ?? "47",
        },
        resolver: zodResolver(TelefonnummerFormSchema),
    });

    const {t} = useTranslation("skjema");

    const onSubmit: React.FormEventHandler<HTMLFormElement> = handleSubmit(async ({phoneNumber, countryCode}) => {
        if (phoneNumber && countryCode) {
            setTelefonnummer(`+${countryCode}${phoneNumber}`).then(() => onClose());
        }
    });

    return (
        <form onSubmit={onSubmit} className={"space-y-4 pl-3 pt-2"}>
            <div>
                <BodyShort weight={"semibold"}>{t("kontakt.telefon.tittel")}</BodyShort>
                <div className={"flex gap-2 pb-2"}>
                    <div>
                        <Select
                            hideLabel={true}
                            label={t("kontakt.telefon.landskode")}
                            {...register("countryCode")}
                            error={formState.errors.countryCode && t(formState.errors.phoneNumber!.message!)}
                        >
                            {libphonenumber
                                .getCountries()
                                .map((country) => [
                                    emojiFlag(country.toString()),
                                    libphonenumber.getCountryCallingCode(country),
                                ])
                                .map(([flagEmoji, callingCode]) => (
                                    <option value={callingCode}>{`${flagEmoji} +${callingCode}`}</option>
                                ))}
                        </Select>
                    </div>
                    <TextField
                        {...register("phoneNumber")}
                        maxLength={17}
                        htmlSize={17}
                        type={"tel"}
                        className={"inline"}
                        autoComplete={"tel-national"}
                        label={t("kontakt.telefon.label")}
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
            </div>
        </form>
    );
};
