import {BodyLong, Heading} from "@navikt/ds-react";
import {Process, ProcessEvent} from "@navikt/ds-react/Process";
import {useTranslations} from "next-intl";

export default function KvitteringProsess({tidspunktSendt}: {tidspunktSendt?: {dato: string; klokkeslett: string}}) {
    const t = useTranslations("Kvittering");

    return (
        <>
            <Heading size={"medium"} level="3" className="mt-(--ax-space-24) lg:mt-(--ax-space-64)" spacing>
                {t("undertittel")}
            </Heading>
            <Process className={"bg-ax-bg-info-soft p-(--ax-space-16) rounded-md"}>
                <ProcessEvent
                    title={t("steg.sendt.tittel")}
                    timestamp={tidspunktSendt ? t("tidspunkt", tidspunktSendt) : undefined}
                    bullet={1}
                >
                    {t("steg.sendt.tekst")}
                </ProcessEvent>
                <ProcessEvent title={t("steg.behandles.tittel")} bullet={2}>
                    <BodyLong spacing>{t("steg.behandles.tekst")}</BodyLong>
                </ProcessEvent>
                <ProcessEvent>
                    <BodyLong>{t("steg.behandles.tekst2")}</BodyLong>
                </ProcessEvent>
                <ProcessEvent title={t("steg.svar.tittel")} bullet={3}>
                    {t("steg.svar.tekst")}
                </ProcessEvent>
            </Process>
        </>
    );
}
