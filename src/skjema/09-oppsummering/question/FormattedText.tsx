import {BodyShort} from "@navikt/ds-react";
import {formatTidspunkt} from "../../../nav-soknad/utils";
import {useTranslation} from "react-i18next";
import {SvarType} from "../../../generated/model";
import {logWarning} from "../../../nav-soknad/utils/loggerUtils";
import {LocalizedDate} from "../../../components/LocalizedDate";

const validSvarTypes = new Set(Object.values(SvarType));

const FormatAsType = ({type, children}: {type: SvarType; children: string}) => {
    const {t} = useTranslation("skjema");

    if (!children) return "";

    if (!validSvarTypes.has(type)) {
        logWarning("Ugyldig SvarType i FormattedTextValue");
        return children;
    }

    switch (type) {
        case "TEKST":
            return children;
        case "LOCALE_TEKST":
            return t(children);
        case "DATO":
            return <LocalizedDate date={children} />;
        case "TIDSPUNKT":
            return formatTidspunkt(children, t);
    }
};

interface FormattedTextProps {
    type: SvarType;
    value: string;
    label?: string;
}

export const FormattedText = ({type, value, label}: FormattedTextProps) => (
    <BodyShort>
        {label && <span className={"pr-1 after:content-[':']"}>{label}</span>}
        <FormatAsType type={type}>{value}</FormatAsType>
    </BodyShort>
);
