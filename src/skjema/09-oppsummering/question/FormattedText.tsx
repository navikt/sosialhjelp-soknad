import {BodyShort} from "@navikt/ds-react";
import {formatDato, formatTidspunkt} from "../../../nav-soknad/utils/intlUtils";
import {useTranslation} from "react-i18next";

export const FormattedText = (props: {value: string; type: string; label?: string; spacing?: boolean}) => {
    const {t} = useTranslation("skjema");

    return (
        <BodyShort spacing={!!props.spacing}>
            {props.label && <>{t(props.label)}: </>}
            {props.type === "TEKST" && props.value}
            {props.type === "LOCALE_TEKST" && props.value ? t(props.value) : ""}
            {props.type === "DATO" && props.value ? formatDato(props.value) : ""}
            {props.type === "TIDSPUNKT" && props.value ? formatTidspunkt(props.value) : ""}
        </BodyShort>
    );
};
