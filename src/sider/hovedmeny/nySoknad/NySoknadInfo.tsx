"use client";
import {Alert, Button, Loader} from "@navikt/ds-react";
import {useState, useTransition} from "react";
import {NySoknadVelkomst} from "./NySoknadVelkomst.tsx";
import {useTranslations} from "next-intl";
import {SoknadstypeValg} from "./SoknadstypeValg.tsx";
import {useCreateSoknad} from "../../../generated/new/soknad-lifecycle-controller/soknad-lifecycle-controller.ts";
import {useRouter} from "next/navigation";

export const NySoknadInfo = () => {
    const [soknadstype, setSoknadstype] = useState<"kort" | "standard" | undefined>(undefined);
    const router = useRouter();
    const [isTransitioning, startTransition] = useTransition();
    const {mutate, isPending, error} = useCreateSoknad({
        mutation: {
            onSuccess: async (data) => {
                startTransition(() => router.push(`/skjema/${data.soknadId}/1`));
                window.umami.track("Skjema startet");
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
