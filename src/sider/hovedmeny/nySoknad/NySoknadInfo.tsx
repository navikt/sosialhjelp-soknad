"use client";
import {Alert, Button, Loader} from "@navikt/ds-react";
import * as React from "react";
import {useState} from "react";
import {NySoknadVelkomst} from "./NySoknadVelkomst.tsx";
import {useTranslations} from "next-intl";
import {SoknadstypeValg} from "./SoknadstypeValg.tsx";
import {useCreateSoknad} from "./useCreateSoknad.tsx";
import {useAmplitudeSkjemaStartet} from "./useAmplitudeSkjemaStartet.tsx";
import {BASE_PATH} from "../../../lib/constants.ts";

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
        try {
            const {soknadId} = await createSoknad(soknadstype);
            window.location.assign(`${BASE_PATH}/skjema/${soknadId}/1`);
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
