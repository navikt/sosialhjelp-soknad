import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder";
import {Alert, BodyShort, Button} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useSkatteetatenData} from "../../lib/hooks/data/useSkatteetatenData";
import * as React from "react";
import {Opplysning} from "../../lib/opplysninger";
import {Dokumenter} from "./upload/Dokumenter";
import {DokumentasjonRader} from "./DokumentasjonRader";

export const ArbeidsDokumentasjon = ({opplysning}: {opplysning: Opplysning}) => {
    const {t} = useTranslation();
    // FIXME: Midlertidig workaround fordi denne bruker tekststrenger både fra skjema og dokumentasjon.
    const {t: tDok} = useTranslation("dokumentasjon");

    const {isError, isPending, setSamtykke} = useSkatteetatenData();

    if (isPending) return <TextPlaceholder lines={3} />;
    if (isError) return <Alert variant="error">{t("utbetalinger.skattbar.kontaktproblemer")}</Alert>;

    return (
        <div>
            <BodyShort className={"pb-6"}>{tDok("lonnslipp|arbeid.undertekst")}</BodyShort>
            <BodyShort className={"pb-2"}>{t("utbetalinger.inntekt.skattbar.hent.info.skatteetaten")}</BodyShort>
            <Button variant="secondary" onClick={() => setSamtykke(true)} className={"!bg-surface-default"}>
                {t("utbetalinger.inntekt.skattbar.gi_samtykke")}
            </Button>
            <Dokumenter opplysning={opplysning} />
            <DokumentasjonRader opplysning={opplysning} />
        </div>
    );
};
