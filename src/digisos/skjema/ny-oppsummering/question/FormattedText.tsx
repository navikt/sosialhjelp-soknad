import {BodyShort} from "@navikt/ds-react";
import {useIntl} from "react-intl";
import {formatDato} from "../../../../nav-soknad/utils/intlUtils";

export const FormattedText = (props: {value: string; type: string; label?: string; spacing?: boolean}) => {
    const intl = useIntl();
    return (
        <BodyShort spacing={!!props.spacing}>
            {props.label && <>{intl.formatMessage({id: props.label})}: </>}
            {props.type === "TEKST" && props.value}
            {props.type === "LOCALE_TEKST" && intl.formatMessage({id: props.value})}
            {props.type === "DATO" && formatDato(props.value)}
        </BodyShort>
    );
};
