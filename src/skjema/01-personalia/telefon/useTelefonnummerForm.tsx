import {TelefonnummerFrontend} from "../../../generated/model";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {formatTelefonnummer, registerWithMasks} from "@fremtind/jkl-formatters-util";
import {strip47} from "./Telefon";
import {isValidTelefonnummer} from "@fremtind/jkl-validators-util";

type FormType = Pick<TelefonnummerFrontend, "brukerutfyltVerdi">;
export const useTelefonnummerForm = (
    initialValue: TelefonnummerFrontend | undefined,
    setTelefonnummer: (tlfnr: string) => Promise<void>
) => {
    const {t} = useTranslation("skjema");

    const form = useForm<FormType>({
        defaultValues: {
            brukerutfyltVerdi: initialValue?.brukerutfyltVerdi
                ? formatTelefonnummer(strip47(initialValue.brukerutfyltVerdi))
                : "",
        },
    });
    const validate = (nummer: string | null | undefined): string | true =>
        !nummer?.length || isValidTelefonnummer(nummer) || t("kontakt.telefon.feilmelding");

    const {registerWithTelefonnummerMask} = registerWithMasks(form);
    const {handleSubmit} = form;
    const registerInput = registerWithTelefonnummerMask("brukerutfyltVerdi", {
        validate: {isValidTelefonnummer: validate},
    });
    const error = form.formState.errors.brukerutfyltVerdi?.message;

    return {
        form,
        registerInput,
        error,
        handleSubmit,
    };
};
