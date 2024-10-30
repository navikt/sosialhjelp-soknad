"use client";
import {Alert, Button, ExpansionCard, Heading, Loader} from "@navikt/ds-react";
import * as React from "react";
import {useState} from "react";
import {FillForms} from "@navikt/ds-icons";
import {NySoknadVelkomst} from "./NySoknadVelkomst";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {useGetSessionInfo} from "../../../generated/informasjon-ressurs/informasjon-ressurs";
import {hentXsrfCookie, opprettSoknad} from "../../../generated/soknad-ressurs/soknad-ressurs";
import {createSoknad} from "../../../generated/new/soknad-lifecycle-controller/soknad-lifecycle-controller.ts";
import {NedetidPanel} from "../../../lib/components/NedetidPanel";
import {logAmplitudeEvent} from "../../../lib/amplitude/Amplitude";
import {SoknadstypeValg} from "./SoknadstypeValg.tsx";
import {useFeatureToggles} from "../../../generated/feature-toggle-ressurs/feature-toggle-ressurs.ts";

export const NySoknadInfo = () => {
    const [startSoknadPending, setStartSoknadPending] = useState<boolean>(false);
    const [startSoknadError, setStartSoknadError] = useState<Error | null>(null);
    const [soknadstype, setSoknadstype] = useState<"kort" | "standard" | null>(null);
    const {data: featureToggles} = useFeatureToggles();
    const isNyttApiEnabled = featureToggles?.["sosialhjelp.soknad.nytt-api"] ?? false;

    const {data: sessionInfo} = useGetSessionInfo();

    const antallNyligInnsendteSoknader = sessionInfo?.numRecentlySent ?? 0;
    const antallPabegynteSoknader = sessionInfo?.open?.length ?? 0;
    const qualifiesForKortSoknad = sessionInfo?.qualifiesForKortSoknad ?? false;

    const navigate = useNavigate();
    const {t} = useTranslation("skjema");

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
            <NedetidPanel varselType={"infoside"} />
            {startSoknadError && <Alert variant="error">{t("applikasjon.opprettsoknadfeilet")}</Alert>}
            <div className={"text-center"}>
                <SoknadstypeValg valg={soknadstype} setValg={setSoknadstype} />
                <Button
                    variant="primary"
                    id="start_soknad_button"
                    disabled={startSoknadPending}
                    onClick={onSokSosialhjelpButtonClick}
                >
                    {t("skjema.knapper.start")}
                    {startSoknadPending && <Loader />}
                </Button>
            </div>
        </>
    );
};

const NySoknadIkon = () => (
    <div className={"rounded-full bg-green-500/40 w-11 h-11 justify-center items-center tw-hidden lg:flex"}>
        <FillForms className={"w-6 h-6 block"} aria-hidden="true" />
    </div>
);

export const NySoknadPanel = ({defaultOpen}: {defaultOpen?: boolean}) => {
    const {t} = useTranslation("skjema");
    return (
        <ExpansionCard aria-label={t("applikasjon.start.ny.soknad")} defaultOpen={defaultOpen}>
            <ExpansionCard.Header className={"!border-0 [&>button]:my-auto"}>
                <div className={"flex items-center gap-6 h-full"}>
                    <NySoknadIkon />
                    <Heading level={"2"} size={"small"}>
                        {t("applikasjon.start.ny.soknad")}
                    </Heading>
                </div>
            </ExpansionCard.Header>
            <ExpansionCard.Content className={"!border-0"}>
                <NySoknadInfo />
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
