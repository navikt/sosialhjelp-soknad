import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder";
import {Alert, BodyShort, Button, Link} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useSkattData} from "../../lib/hooks/data/useSkattData";
import {MinusIcon} from "@navikt/aksel-icons";
import * as React from "react";
import {Opplysning} from "../../lib/opplysninger";
import {Dokumenter} from "./upload/Dokumenter";
import {DokumentasjonRader} from "./DokumentasjonRader";
import {HentetFraSkatteetaten} from "./HentetFraSkatteetaten";

export const ArbeidsVedlegg = ({opplysning}: {opplysning: Opplysning}) => {
    const {t} = useTranslation();

    const {data, samtykke, samtykkeTidspunkt, isLoading, setSamtykke} = useSkattData();

    const inntektFraSkatteetaten = data?.inntektFraSkatteetaten;
    const inntektFraSkatteetatenFeilet = data?.inntektFraSkatteetatenFeilet;

    if (isLoading) return <TextPlaceholder lines={3} />;
    if (inntektFraSkatteetatenFeilet)
        return <Alert variant="error">{t("utbetalinger.skattbar.kontaktproblemer")}</Alert>;
    if (samtykke && samtykkeTidspunkt === "")
        return <Alert variant="error">{t("utbetalinger.skattbar.kontaktproblemer")}</Alert>;

    return (
        <div>
            <BodyShort className={"pb-6"}>{t("opplysninger.arbeid.jobb.undertekst")}</BodyShort>

            {samtykke ? (
                <>
                    <HentetFraSkatteetaten inntektOgForskuddstrekk={inntektFraSkatteetaten} />
                    <Link onClick={() => setSamtykke(false)}>
                        <div className={"flex gap-1 items-center !mt-6"}>
                            <MinusIcon aria-label={""} /> {t("utbetalinger.inntekt.skattbar.ta_bort_samtykke")}
                        </div>
                    </Link>
                    {!inntektFraSkatteetaten?.length && (
                        <>
                            <Dokumenter opplysning={opplysning} />
                            <DokumentasjonRader opplysning={opplysning} />
                        </>
                    )}
                </>
            ) : (
                <>
                    <BodyShort className={"pb-2"}>
                        {t("utbetalinger.inntekt.skattbar.hent.info.skatteetaten")}
                    </BodyShort>
                    <Button
                        variant="secondary"
                        className="last-opp-vedlegg-knapp"
                        onClick={() => setSamtykke(true)}
                        style={{backgroundColor: "var(--a-surface-default)"}}
                    >
                        {t("utbetalinger.inntekt.skattbar.gi_samtykke")}
                    </Button>
                    <Dokumenter opplysning={opplysning} />
                    <DokumentasjonRader opplysning={opplysning} />
                </>
            )}
        </div>
    );
};
