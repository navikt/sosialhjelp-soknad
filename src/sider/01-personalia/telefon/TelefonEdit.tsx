import {useTranslation} from "react-i18next";
import {BodyShort, Button} from "@navikt/ds-react";
import * as React from "react";
import {PhoneNumber} from "libphonenumber-js";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {parsePhoneNumber} from "libphonenumber-js/min";
import {TelefonnummerInput} from "../../../generated/new/model/telefonnummerInput.ts";
import {TelefonnummerField} from "./TelefonnummerField.tsx";
import {TelefonnummerFormSchema} from "./TelefonnummerFormSchema.ts";
import {formatPhoneNumber} from "./formatPhoneNumber.tsx";

export const TelefonEdit = ({
    onClose,
    telefonnummerBruker,
    setTelefonnummer,
}: {
    onClose: () => void;
    telefonnummerBruker: PhoneNumber | undefined;
    setTelefonnummer: (telefonnummer: TelefonnummerInput) => Promise<unknown>;
}) => {
    const {handleSubmit, control} = useForm({
        defaultValues: {phoneNumber: telefonnummerBruker ? formatPhoneNumber(telefonnummerBruker) : null},
        resolver: zodResolver(TelefonnummerFormSchema),
    });

    const {t} = useTranslation("skjema");

    const onSubmit: React.FormEventHandler<HTMLFormElement> = handleSubmit(async ({phoneNumber}) => {
        if (!phoneNumber) await setTelefonnummer({telefonnummerBruker: undefined});
        else await setTelefonnummer({telefonnummerBruker: parsePhoneNumber(phoneNumber, "NO").number});
        onClose();
    });

    return (
        <form onSubmit={onSubmit} className={"space-y-4"}>
            <BodyShort weight={"semibold"}>{t("kontakt.telefon.tittel")}</BodyShort>
            <BodyShort className={"mt-2!"} size={"small"}>
                {t("kontakt.telefon.description")}
            </BodyShort>
            <TelefonnummerField control={control} name="phoneNumber" />
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
