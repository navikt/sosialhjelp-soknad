import {BodyLong, Box, Heading} from "@navikt/ds-react";
import {Process, ProcessEvent} from "@navikt/ds-react/Process";
import {useTranslations} from "next-intl";

export default function KvitteringProsess({tidspunktSendt}: {tidspunktSendt?: {dato: string; klokkeslett: string}}) {
    const t = useTranslations("Kvittering");

    return (
        <div>
            <Heading size={"medium"} level="3" spacing>
                {t("undertittel")}
            </Heading>
            <Box
                background={"info-soft"}
                borderWidth="1"
                borderRadius="12"
                borderColor={"info-subtle"}
                padding="space-24"
            >
                <Process>
                    <ProcessEvent
                        title={t("steg.sendt.tittel")}
                        timestamp={tidspunktSendt ? t("tidspunkt", tidspunktSendt) : undefined}
                        bullet={1}
                    >
                        <BodyLong spacing> {t("steg.sendt.tekst")} </BodyLong>
                    </ProcessEvent>
                    <ProcessEvent title={t("steg.behandles.tittel")} bullet={2}>
                        <BodyLong spacing>{t("steg.behandles.tekst")}</BodyLong>
                    </ProcessEvent>
                    <ProcessEvent>
                        <BodyLong spacing>{t("steg.behandles.tekst2")}</BodyLong>
                    </ProcessEvent>
                    <ProcessEvent title={t("steg.svar.tittel")} bullet={3}>
                        {t("steg.svar.tekst")}
                    </ProcessEvent>
                </Process>
            </Box>
        </div>
    );
}
