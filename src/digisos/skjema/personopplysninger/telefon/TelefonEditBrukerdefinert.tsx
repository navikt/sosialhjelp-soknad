import {TelefonnummerFrontend} from "../../../../generated/model";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {formatTelefonnummer, registerWithMasks} from "@fremtind/jkl-formatters-util";
import {Button, TextField} from "@navikt/ds-react";
import {isValidTelefonnummer} from "@fremtind/jkl-validators-util";
import * as React from "react";
import {strip47} from "./Telefon";
import {
    updateTelefonnummer,
    useHentTelefonnummer,
} from "../../../../generated/telefonnummer-ressurs/telefonnummer-ressurs";
import {useBehandlingsId} from "../../../../lib/hooks/useBehandlingsId";
type FormType = Pick<TelefonnummerFrontend, "brukerutfyltVerdi">;

export const TelefonEditBrukerdefinert = ({onClose}: {onClose: () => void}) => {
    const behandlingsId = useBehandlingsId();
    const {data, refetch} = useHentTelefonnummer(behandlingsId);

    const {t} = useTranslation("skjema");
    const form = useForm<FormType>({
        defaultValues: {
            brukerutfyltVerdi: data?.brukerutfyltVerdi ? formatTelefonnummer(strip47(data.brukerutfyltVerdi)) : "",
        },
    });
    const {registerWithTelefonnummerMask} = registerWithMasks(form);
    const {handleSubmit, setValue} = form;

    const update = async ({brukerutfyltVerdi}: FormType) => {
        await updateTelefonnummer(behandlingsId, {
            brukerdefinert: !!brukerutfyltVerdi?.length,
            brukerutfyltVerdi: brukerutfyltVerdi?.length ? `+47${brukerutfyltVerdi}` : null,
        });
        await refetch();
        onClose();
    };

    const clear = async () => {
        setValue("brukerutfyltVerdi", null);
        await handleSubmit(update);
    };

    return (
        <form onSubmit={handleSubmit(update)} className={"space-y-4"}>
            <TextField
                {...registerWithTelefonnummerMask("brukerutfyltVerdi", {
                    validate: {
                        isValidTelefonnummer: (nummer) =>
                            nummer === null ||
                            nummer === "" ||
                            isValidTelefonnummer(nummer ?? "") ||
                            t("kontakt.telefon.feilmelding"),
                    },
                })}
                maxLength={11}
                htmlSize={11}
                type={"tel"}
                className={"inline"}
                autoComplete={"tel-national"}
                label={t("kontakt.telefon.label")}
                error={form.formState.errors.brukerutfyltVerdi?.message}
            />
            <div className={"space-x-2"}>
                <Button variant="secondary" onClick={clear}>
                    {t("avbryt")}
                </Button>
                <Button type={"submit"}>{t("lagreEndring")}</Button>
            </div>
        </form>
    );
};
