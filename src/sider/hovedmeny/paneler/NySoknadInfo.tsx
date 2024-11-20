"use client";
import {Alert, Button, Loader} from "@navikt/ds-react";
import * as React from "react";
import {useState} from "react";
import {NySoknadVelkomst} from "./NySoknadVelkomst";
import {useNavigate} from "react-router";
import {useTranslations} from "next-intl";
import {hentXsrfCookie, opprettSoknad} from "../../../generated/soknad-ressurs/soknad-ressurs";
import {createSoknad} from "../../../generated/new/soknad-lifecycle-controller/soknad-lifecycle-controller.ts";
import {logAmplitudeEvent} from "../../../lib/amplitude/Amplitude";
import {SoknadstypeValg} from "./SoknadstypeValg.tsx";
import {useContextFeatureToggles} from "../../../lib/providers/useContextFeatureToggles.ts";
import {useContextSessionInfo} from "../../../lib/providers/useContextSessionInfo.ts";

export const NySoknadInfo = () => {
    const [startSoknadPending, setStartSoknadPending] = useState<boolean>(false);
    const [startSoknadError, setStartSoknadError] = useState<Error | null>(null);
    const [soknadstype, setSoknadstype] = useState<"kort" | "standard" | null>(null);

    const featureToggles = useContextFeatureToggles();
    const isNyttApiEnabled = featureToggles?.["sosialhjelp.soknad.nytt-api"] ?? false;

    const {numRecentlySent: antallNyligInnsendteSoknader, open, qualifiesForKortSoknad} = useContextSessionInfo();

    const antallPabegynteSoknader = open?.length;

    const navigate = useNavigate();
    const t = useTranslations("NySoknadInfo");

    const onSokSosialhjelpButtonClick = async (event: React.SyntheticEvent) => {
        setStartSoknadPending(true);
        event.preventDefault();
        await logAmplitudeEvent("skjema startet", {
            antallNyligInnsendteSoknader,
            antallPabegynteSoknader,
            qualifiesForKortSoknad,
            enableModalV2: true,
            erProdsatt: true,
            language: localStorage.getItem("digisos-language"),
        });
        try {
            let brukerBehandlingId;
            if (isNyttApiEnabled) {
                brukerBehandlingId = (await createSoknad(soknadstype ? {soknadstype} : undefined)).soknadId;
            } else {
                brukerBehandlingId = (await opprettSoknad(soknadstype ? {soknadstype} : undefined)).brukerBehandlingId;
            }
            await hentXsrfCookie(brukerBehandlingId);
            navigate(`../skjema/${brukerBehandlingId}/1`);
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
