import {BodyLong, Box, Heading} from "@navikt/ds-react";
import {Process, ProcessEvent} from "@navikt/ds-react/Process";
import {useFormatter, useTranslations} from "next-intl";

export default function KvitteringProsess({tidspunktSendt}: {tidspunktSendt?: string}) {
    const t = useTranslations("Kvittering");
    const format = useFormatter();

    const sendt = tidspunktSendt ? new Date(tidspunktSendt) : undefined;
    const tidspunkt =
        sendt && !isNaN(sendt.getTime())
            ? t("tidspunkt", {
                  dato: format.dateTime(sendt, {dateStyle: "long"}),
                  klokkeslett: format.dateTime(sendt, {hour: "2-digit", minute: "2-digit", hourCycle: "h23"}),
              })
            : undefined;

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
                    <ProcessEvent title={t("steg.sendt.tittel")} timestamp={tidspunkt} bullet={1}>
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
