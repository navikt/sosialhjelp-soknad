import {FormattedText} from "./FormattedText";
import {Felt} from "../../../generated/model";
import {useTranslation} from "react-i18next";
import {SYSTEM_LIST_STYLE} from "./SystemData";
import {DigisosLanguageKey} from "../../../lib/i18n";

export const SystemDataMap = ({felter}: {felter?: Felt[]}) => {
    const {t} = useTranslation("skjema");

    return (
        <>
            {felter?.map((felt, index) => (
                <ul className={SYSTEM_LIST_STYLE} key={index}>
                    {Object.entries(felt.labelSvarMap ?? {}).map(([label, {value, type}]) => (
                        <li key={label}>
                            <FormattedText
                                value={value ?? ""}
                                type={type ?? "TEKST"}
                                label={t(label as DigisosLanguageKey)}
                            />
                        </li>
                    ))}
                </ul>
            ))}
        </>
    );
};
