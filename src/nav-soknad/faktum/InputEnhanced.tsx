import * as React from "react";
import {getInputFaktumTekst, replaceDotWithUnderscore} from "../utils";
import {State} from "../../digisos/redux/reducers";
import {useSelector} from "react-redux";
import {getFeil} from "../utils/enhancedComponentUtils";
import {ChangeEvent} from "react";
import {useTranslation} from "react-i18next";
import cx from "classnames";
import {TextField} from "@navikt/ds-react";

export type InputTypes = "text" | "number" | "email" | "tel";

type Bredde = "fullbredde" | "XXL" | "XL" | "L" | "M" | "S" | "XS" | "XXS";

// Mapper fra nav-frontend-skjema "bredde" til CSS som kan fores til TextField.
export const navFrontendWidthMap: Record<Bredde, React.CSSProperties> = {
    fullbredde: {
        width: "100%",
    },
    XXL: {
        width: "100%",
        maxWidth: "420px",
    },
    XL: {
        width: "100%",
        maxWidth: "350px",
    },
    L: {
        width: "100%",
        maxWidth: "280px",
    },
    M: {
        width: "100%",
        maxWidth: "210px",
    },
    S: {
        width: "140px",
    },
    XS: {
        width: "70px",
    },
    XXS: {
        width: "35px",
    },
};
const DEFAULT_MAX_LENGTH = 50;

export interface InputEnhancedProps {
    autoFocus?: boolean;
    bredde?: Bredde;
    className?: string;
    disabled?: boolean;
    faktumIndex?: number;
    faktumKey: string;
    getFeil?: () => string;
    id?: string;
    inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
    inputRef?: (c: any) => HTMLInputElement;
    maxLength?: number;
    minLength?: number;
    onBlur: () => void;
    onChange: (verdi: string) => void;
    onFocus?: () => void;
    pattern?: string;
    required: boolean;
    step?: string;
    textKey?: string;
    type?: InputTypes;
    verdi: string;
}

const InputEnhanced = ({
    id,
    verdi,
    faktumKey,
    textKey,
    faktumIndex,
    type,
    disabled,
    pattern,
    required,
    step,
    maxLength = DEFAULT_MAX_LENGTH,
    bredde = "XXL",
    autoFocus,
    className,
    onBlur,
    onFocus,
    onChange,
    inputMode,
}: InputEnhancedProps) => {
    const {t} = useTranslation("skjema");
    const feil = useSelector((state: State) => state.validering.feil);
    const tekster = getInputFaktumTekst(t, textKey || faktumKey);
    const feil_ = getFeil(feil, t, faktumKey, faktumIndex);

    return (
        <TextField
            id={id ? replaceDotWithUnderscore(id) : faktumKey}
            className={cx("faktumInput", className)}
            type={type || "text"}
            autoComplete="off"
            name={replaceDotWithUnderscore(faktumKey)}
            disabled={disabled}
            value={verdi}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            onBlur={onBlur}
            onFocus={onFocus}
            label={tekster.label}
            placeholder={tekster.pattern}
            error={feil_}
            maxLength={maxLength}
            style={navFrontendWidthMap[bredde]}
            pattern={pattern}
            required={required}
            step={step}
            autoFocus={autoFocus}
            inputMode={inputMode}
        />
    );
};

export default InputEnhanced;
