import {useEffect, useState} from "react";
import {z} from "zod";
import {useTranslation} from "react-i18next";
import {ValideringsFeilKode} from "../../redux/validering/valideringActionTypes";
const MAX_CHARS = 500;

const BeskrivelseAvAnnetSchema = z.string().max(MAX_CHARS, {
    message: ValideringsFeilKode.MAX_LENGDE,
});

export const useBeskrivelse = (value: string | undefined, onSave: (beskrivelse: string) => void) => {
    const {t} = useTranslation("skjema");
    const [beskrivelse, setBeskrivelse] = useState<string>("");
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        try {
            BeskrivelseAvAnnetSchema.parse(value);
            setError(undefined);
        } catch (e) {
            setError(t(e.issues[0].message));
        }
    }, [value, t]);

    useEffect(() => {
        if (value) setBeskrivelse(value);
    }, [value]);

    const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setBeskrivelse(event.target.value);
    };

    const onBlur: React.ChangeEventHandler<HTMLTextAreaElement> = () => !error && onSave(beskrivelse);

    const registerAnnet = {
        name: "beskrivelseAvAnnet",
        value: beskrivelse,
        onChange,
        onBlur,
        error,
        maxLength: MAX_CHARS,
    };

    return {registerAnnet};
};
