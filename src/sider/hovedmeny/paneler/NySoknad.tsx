"use client";
import {Alert, Box, Button, ExpansionCard, Heading, Loader, Radio, RadioGroup} from "@navikt/ds-react";
import * as React from "react";
import {FillForms} from "@navikt/ds-icons";
import {NySoknadVelkomst} from "./NySoknadVelkomst";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useGetSessionInfo} from "../../../generated/client/informasjon-ressurs/informasjon-ressurs";
import {hentXsrfCookie, opprettSoknad} from "../../../generated/client/soknad-ressurs/soknad-ressurs";
import {NedetidPanel} from "../../../lib/components/NedetidPanel";
import {useFeatureFlags} from "../../../lib/config";
import {logAmplitudeEvent} from "../../../lib/amplitude/Amplitude";

export const NySoknadInfo = () => {
    const [startSoknadPending, setStartSoknadPending] = useState<boolean>(false);
    const [startSoknadError, setStartSoknadError] = useState<Error | null>(null);
    const [soknadstype, setSoknadstype] = useState<"kort" | "standard" | undefined>();

    const {data: sessionInfo} = useGetSessionInfo();

    const antallNyligInnsendteSoknader = sessionInfo?.numRecentlySent ?? 0;
    const antallPabegynteSoknader = sessionInfo?.open?.length ?? 0;

    const navigate = useNavigate();
    const {t} = useTranslation("skjema");

    const onSokSosialhjelpButtonClick = async (event: React.SyntheticEvent) => {
        setStartSoknadPending(true);
        event.preventDefault();
        await logAmplitudeEvent("skjema startet", {
            antallNyligInnsendteSoknader,
            antallPabegynteSoknader,
            enableModalV2: true,
            erProdsatt: true,
            language: localStorage.getItem("digisos-language"),
        });
        try {
            const {brukerBehandlingId, useKortSoknad} = await opprettSoknad({soknadstype});
            await hentXsrfCookie(brukerBehandlingId);
            // TODO: Få info om kort eller lang søknad i responsen og evaluer her
            if (useKortSoknad) {
                navigate(`../skjema/kort/${brukerBehandlingId}/1`);
            } else {
                navigate(`../skjema/${brukerBehandlingId}/1`);
            }
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

interface SoknadstypeValgProps {
    valg: "kort" | "standard" | undefined;
    setValg: (valg: "kort" | "standard") => void;
}

const SoknadstypeValg = ({valg, setValg}: SoknadstypeValgProps) => {
    const {soknadstypeValg} = useFeatureFlags();
    if (!soknadstypeValg) {
        return null;
    }
    return (
        <Box className={"flex justify-center mb-8"}>
            <RadioGroup legend={"Velg søknadstype"} value={valg} onChange={(value) => setValg(value)}>
                <div className="bg-lightblue-50 p-2 rounded-md">
                    <Radio value={"standard"}>Standard</Radio>
                    <Radio value={"kort"}>Kort</Radio>
                </div>
            </RadioGroup>
        </Box>
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
