import {BodyShort} from "@navikt/ds-react";
import {formatTidspunkt} from "../../../lib/utils";
import {SvarType} from "../../../generated/model";
import {LocalizedDate} from "../../../lib/components/LocalizedDate";
import {logError} from "../../../lib/log/loggerUtils";
import {useBackendTranslation} from "./useBackendTranslationResult";

const FormatAsType = ({type, children}: {type: SvarType; children: string}) => {
    const {tBackend} = useBackendTranslation();

    if (!children) return null;

    if (!Object.values(SvarType).includes(type)) {
        logError("Ugyldig SvarType i FormattedTextValue");
        return children;
    }

    switch (type) {
        case "TEKST":
            return children;
        case "LOCALE_TEKST":
            return tBackend(children);
        case "DATO":
            return <LocalizedDate date={children} />;
        case "TIDSPUNKT":
            return formatTidspunkt(children);
    }
};

export const FormattedText = ({
    type,
    value,
    labelBackendKey,
}: {
    type: SvarType;
    value: string;
    labelBackendKey?: string;
}) => {
    const {tBackend} = useBackendTranslation();

    return (
        <BodyShort>
            {labelBackendKey && <span className={"pr-1 after:content-[':']"}>{tBackend(labelBackendKey)}</span>}
            <FormatAsType type={type}>{value}</FormatAsType>
        </BodyShort>
    );
};
