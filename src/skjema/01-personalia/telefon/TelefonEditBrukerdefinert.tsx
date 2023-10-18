import {useTranslation} from "react-i18next";
import {Button, TextField} from "@navikt/ds-react";
import * as React from "react";
import {useTelefonnummer} from "./useTelefonnummer";
import {useTelefonnummerForm} from "./useTelefonnummerForm";

export const TelefonEditBrukerdefinert = ({onClose}: {onClose: () => void}) => {
    const {data, setTelefonnummer} = useTelefonnummer();
    const {registerInput, error, handleSubmit, reset} = useTelefonnummerForm(data);
    const {t} = useTranslation("skjema");

    const onSubmit: React.FormEventHandler<HTMLFormElement> = handleSubmit(async ({brukerutfyltVerdi}) =>
        setTelefonnummer(brukerutfyltVerdi ?? null).then(() => onClose())
    );

    return (
        <form onSubmit={onSubmit} className={"space-y-4"}>
            <TextField
                {...registerInput}
                maxLength={11}
                htmlSize={11}
                type={"tel"}
                className={"inline"}
                autoComplete={"tel-national"}
                label={t("kontakt.telefon.label")}
                error={error}
            />
            <div className={"space-x-2"}>
                <Button variant="secondary" onClick={() => setTelefonnummer(null).then(() => reset())}>
                    {t("avbryt")}
                </Button>
                <Button type={"submit"} data-testid="lagre-telefonnummer">
                    {t("lagreEndring")}
                </Button>
            </div>
        </form>
    );
};
