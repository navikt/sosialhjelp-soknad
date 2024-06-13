import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder";
import {Alert, BodyShort, Button, Link} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useSkatteetatenData} from "../../lib/hooks/data/useSkatteetatenData";
import {MinusIcon} from "@navikt/aksel-icons";
import * as React from "react";
import {Opplysning} from "../../lib/opplysninger";
import {Dokumenter} from "./upload/Dokumenter";
import {DokumentasjonRader} from "./DokumentasjonRader";
import {HentetFraSkatteetaten} from "./HentetFraSkatteetaten";

export const ArbeidsVedlegg = ({opplysning}: {opplysning: Opplysning}) => {
    const {t} = useTranslation();

    const {inntekt, isError, samtykke, isPending, setSamtykke} = useSkatteetatenData();

    if (isPending) return <TextPlaceholder lines={3} />;
    if (isError) return <Alert variant="error">{t("utbetalinger.skattbar.kontaktproblemer")}</Alert>;

    return (
        <div>
            {!samtykke ? (
                <>
                    <BodyShort className={"pb-2"}>
                        {t("utbetalinger.inntekt.skattbar.hent.info.skatteetaten")}
                    </BodyShort>
                    <Button variant="secondary" onClick={() => setSamtykke(true)} className={"!bg-surface-default"}>
                        {t("utbetalinger.inntekt.skattbar.gi_samtykke")}
                    </Button>
                    <Dokumenter opplysning={opplysning} />
                    <DokumentasjonRader opplysning={opplysning} />
                </>
            ) : (
                <>
                    <HentetFraSkatteetaten inntekt={inntekt} />
                    <Link onClick={() => setSamtykke(false)}>
                        <div className={"flex gap-1 items-center !mt-6"}>
                            <MinusIcon aria-label={""} /> {t("utbetalinger.inntekt.skattbar.ta_bort_samtykke")}
                        </div>
                    </Link>
                    {!inntekt?.length && (
                        <>
                            <Dokumenter opplysning={opplysning} />
                            <DokumentasjonRader opplysning={opplysning} />
                        </>
                    )}
                </>
            )}
        </div>
    );
};
