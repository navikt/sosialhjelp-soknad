"use client";
import {Alert, Button, Loader} from "@navikt/ds-react";
import * as React from "react";
import {useState} from "react";
import {NySoknadVelkomst} from "./NySoknadVelkomst.tsx";
import {useTranslations} from "next-intl";
import {hentXsrfCookie} from "../../../generated/soknad-ressurs/soknad-ressurs.ts";
import {SoknadstypeValg} from "./SoknadstypeValg.tsx";
import {useCreateSoknad} from "./useCreateSoknad.tsx";
import {useAmplitudeSkjemaStartet} from "./useAmplitudeSkjemaStartet.tsx";

export const NySoknadInfo = () => {
    const [startSoknadPending, setStartSoknadPending] = useState<boolean>(false);
    const [startSoknadError, setStartSoknadError] = useState<Error | null>(null);
    const [soknadstype, setSoknadstype] = useState<"kort" | "standard" | undefined>(undefined);
    const {createSoknad} = useCreateSoknad();
    const {logAmplitudeStartSoknad} = useAmplitudeSkjemaStartet();
    const t = useTranslations("NySoknadInfo");

    const onSokSosialhjelpButtonClick = async (event: React.SyntheticEvent) => {
        setStartSoknadPending(true);
        event.preventDefault();

        await logAmplitudeStartSoknad();
        console.log("Hi");
        try {
            const {soknadId} = await createSoknad(soknadstype);
            await hentXsrfCookie(soknadId);
            window.location.assign(`../skjema/${soknadId}/1`);
        } catch (e: any) {
            setStartSoknadError(e);
            setStartSoknadPending(false);
        }
    };

    return (
        <>
            <NySoknadVelkomst />
            {startSoknadError && <Alert variant="error">{t("feilet")}</Alert>}
            <div className={"text-center"}>
                <SoknadstypeValg valg={soknadstype} setValg={setSoknadstype} />
                <Button
                    variant="primary"
                    id="start_soknad_button"
                    disabled={startSoknadPending}
                    onClick={onSokSosialhjelpButtonClick}
                    icon={startSoknadPending && <Loader />}
                    iconPosition={"right"}
                >
                    {t("start")}
                </Button>
            </div>
        </>
    );
};
