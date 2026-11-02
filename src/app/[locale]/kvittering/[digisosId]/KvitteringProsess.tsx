import {BodyLong, Heading} from "@navikt/ds-react";
import {Process, ProcessEvent} from "@navikt/ds-react/Process";
import {getTranslations} from "next-intl/server";
import {delTidspunkt} from "../../../../lib/api/ssr/hentKvittering.ts";
import type {SupportedLanguage} from "../../../../lib/i18n/common.ts";

export default async function KvitteringProsess({
    language,
    tidspunktSendt,
}: {
    language: SupportedLanguage;
    tidspunktSendt?: string;
}) {
    const t = await getTranslations({locale: language, namespace: "Kvittering"});
    const deler = tidspunktSendt ? delTidspunkt(tidspunktSendt) : undefined;

    return (
        <>
            <Heading size={"medium"} level="2" className="mt-6" spacing>
                {t("undertittel")}
            </Heading>
            <Process className={"bg-ax-bg-info-soft p-4 rounded-md"}>
                <ProcessEvent
                    status="completed"
                    title={t("steg.sendt.tittel")}
                    timestamp={deler ? t("tidspunkt", deler) : undefined}
                    bullet={1}
                >
                    {t("steg.sendt.tekst")}
                </ProcessEvent>
                <ProcessEvent title={t("steg.behandles.tittel")} bullet={2}>
                    <BodyLong spacing>{t("steg.behandles.tekst")}</BodyLong>
                    <BodyLong>{t("steg.behandles.tekst2")}</BodyLong>
                </ProcessEvent>
                <ProcessEvent title={t("steg.svar.tittel")} bullet={3}>
                    {t("steg.svar.tekst")}
                </ProcessEvent>
            </Process>
        </>
    );
}
