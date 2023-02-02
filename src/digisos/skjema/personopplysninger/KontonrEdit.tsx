import {useBehandlingsId} from "../../../nav-soknad/hooks/useBehandlingsId";
import {updateKontonummer, useHentKontonummer} from "../../../generated/kontonummer-ressurs/kontonummer-ressurs";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {formatKontonummer, registerWithMasks} from "@fremtind/jkl-formatters-util";
import {Button, TextField} from "@navikt/ds-react";
import {isValidKontonummer} from "../../../nav-soknad/validering/isValidKontonummer";
import {HorizontalCheckbox} from "../../../nav-soknad/components/form/HorizontalCheckbox";
import * as React from "react";
import {KontonummerFrontend} from "../../../generated/model";

type KontonrFormType = Pick<KontonummerFrontend, "brukerutfyltVerdi" | "harIkkeKonto">;

export const KontonrEdit = ({onClose}: {onClose: () => void}) => {
    const behandlingsId = useBehandlingsId();
    const {refetch, data} = useHentKontonummer(behandlingsId);
    const {t} = useTranslation("skjema");

    const form = useForm<KontonrFormType>({
        defaultValues: {
            brukerutfyltVerdi: data?.brukerutfyltVerdi ? formatKontonummer(data.brukerutfyltVerdi) : "",
            harIkkeKonto: data?.harIkkeKonto,
        },
    });

    const {registerWithKontonummerMask} = registerWithMasks<Pick<KontonrFormType, "brukerutfyltVerdi">>(form);
    const {handleSubmit, register, watch} = form;

    const update = async ({brukerutfyltVerdi, harIkkeKonto}: KontonrFormType) => {
        await updateKontonummer(behandlingsId, {
            harIkkeKonto: !!harIkkeKonto,
            brukerutfyltVerdi: brukerutfyltVerdi?.length ? brukerutfyltVerdi : null,
            brukerdefinert: !!brukerutfyltVerdi?.length,
        });
        await refetch();
        onClose();
    };

    if (!data) return null;

    return (
        <form onSubmit={handleSubmit(update)}>
            <TextField
                {...registerWithKontonummerMask("brukerutfyltVerdi", {
                    validate: {
                        isValidKontonummer: (brukerutfyltVerdi) =>
                            !brukerutfyltVerdi?.length ||
                            isValidKontonummer(brukerutfyltVerdi!) ||
                            t("kontakt.kontonummer.feilmelding"),
                    },
                })}
                label={t("kontakt.kontonummer.sporsmal")}
                description={t("kontakt.kontonummer.infotekst.tekst")}
                inputMode="numeric"
                htmlSize={13}
                disabled={watch("harIkkeKonto") === true}
                required={false}
                maxLength={13}
                error={form.formState.errors.brukerutfyltVerdi?.message}
            />
            <HorizontalCheckbox {...register("harIkkeKonto")}>{t("kontakt.kontonummer.harikke")}</HorizontalCheckbox>
            <div className={"space-x-2"}>
                <Button variant="secondary" onClick={onClose}>
                    {t("avbryt")}
                </Button>
                <Button type={"submit"}>{t("lagreEndring")}</Button>
            </div>
        </form>
    );
};
