import * as React from "react";
import {useIntl} from "react-intl";
import {Input} from "nav-frontend-skjema";
import {getInputFaktumTekst, replaceDotWithUnderscore} from "../utils";
import {State} from "../../digisos/redux/reducers";
import {useSelector} from "react-redux";
import {getFeil} from "../utils/enhancedComponentUtils";
import {ChangeEvent} from "react";

export type InputTypes = "text" | "number" | "email" | "tel";

const DEFAULT_MAX_LENGTH = 50;

export interface InputEnhancedProps {
    verdi: string;
    onChange: (verdi: string) => void;
    onBlur: () => void;
    onFocus?: () => void;
    faktumKey: string;
    textKey?: string;
    required: boolean;

    disabled?: boolean;
    pattern?: string;
    maxLength?: number;
    minLength?: number;
    bredde?: "fullbredde" | "XXL" | "XL" | "L" | "M" | "S" | "XS" | "XXS";
    step?: string;
    type?: InputTypes;
    inputRef?: (c: any) => HTMLInputElement;
    id?: string;
    className?: string;
    getName?: () => string;
    faktumIndex?: number;
    getFeil?: () => string;
    autoFocus?: boolean;
    inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
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
    bredde,
    autoFocus,
    className,
    onBlur,
    onFocus,
    onChange,
    inputMode,
}: InputEnhancedProps) => {
    const intl = useIntl();
    const feil = useSelector((state: State) => state.validering.feil);
    const tekster = getInputFaktumTekst(intl, textKey || faktumKey);
    const feil_ = getFeil(feil, intl, faktumKey, faktumIndex);

    return (
        <Input
            id={id ? replaceDotWithUnderscore(id) : faktumKey}
            className={"input--xxl faktumInput  " + (className || "")}
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
            feil={feil_}
            maxLength={maxLength}
            bredde={bredde}
            pattern={pattern}
            required={required}
            step={step}
            autoFocus={autoFocus}
            inputMode={inputMode}
        />
    );
};

export default InputEnhanced;
