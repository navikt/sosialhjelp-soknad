"use client";
import {Alert, Button, Loader} from "@navikt/ds-react";
import {useState, useTransition} from "react";
import {NySoknadVelkomst} from "./NySoknadVelkomst.tsx";
import {useTranslations} from "next-intl";
import {SoknadstypeValg} from "./SoknadstypeValg.tsx";
import {useCreateSoknad} from "../../../generated/new/soknad-lifecycle-controller/soknad-lifecycle-controller.ts";
import {useRouter} from "next/navigation";
import {umamiTrack} from "../../../app/umami.ts";
import {useHentAntallInnsendteSoknader} from "../../../generated/mine-saker-metadata-ressurs/mine-saker-metadata-ressurs.ts";
import {InnsendteSoknaderVarsel} from "../../../lib/components/InnsendteSoknaderVarsel.tsx";

export const NySoknadInfo = () => {
    const [soknadstype, setSoknadstype] = useState<"kort" | "standard" | undefined>(undefined);
    const router = useRouter();
    const [isTransitioning, startTransition] = useTransition();
    const {data: innsendteSoknaderSisteDogn} = useHentAntallInnsendteSoknader({query: {retry: 0}});

    const {mutate, isPending, error} = useCreateSoknad({
        mutation: {
            onSuccess: async (data) => {
                startTransition(() => router.push(`/skjema/${data.soknadId}/1`));
                umamiTrack("Skjema startet");
            },
        },
    });

    const t = useTranslations("NySoknadInfo");

    return (
        <>
            <NySoknadVelkomst />
            {error && <Alert variant="error">{t("feilet")}</Alert>}
            <div className={"text-center"}>
                <SoknadstypeValg valg={soknadstype} setValg={setSoknadstype} />
                <div className={"max-w-xl mx-auto text-left"}>
                    <InnsendteSoknaderVarsel
                        antall={innsendteSoknaderSisteDogn?.antall}
                        innsendingTillatt={innsendteSoknaderSisteDogn?.innsendingTillattFra}
                    />
                </div>
                <Button
                    variant="primary"
                    id="start_soknad_button"
                    disabled={isTransitioning || isPending}
                    onClick={(event) => {
                        event.preventDefault();
                        mutate({params: {soknadstype}});
                    }}
                    icon={(isTransitioning || isPending) && <Loader />}
                    iconPosition={"right"}
                >
                    {t("start")}
                </Button>
            </div>
        </>
    );
};
