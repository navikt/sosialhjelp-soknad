import {Alert, Button, ExpansionCard, Heading, Loader} from "@navikt/ds-react";
import * as React from "react";
import {FillForms} from "@navikt/ds-icons";
import {NySoknadVelkomst} from "./NySoknadVelkomst";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useGetSessionInfo} from "../../../generated/informasjon-ressurs/informasjon-ressurs";
import {hentXsrfCookie, opprettSoknad} from "../../../generated/soknad-ressurs/soknad-ressurs";
import {NedetidPanel} from "../../../lib/components/NedetidPanel";
import {useAmplitude} from "../../../lib/amplitude/useAmplitude";

export const NySoknadInfo = () => {
    const {logEvent} = useAmplitude();
    const [startSoknadPending, setStartSoknadPending] = useState<boolean>(false);
    const [startSoknadError, setStartSoknadError] = useState<Error | null>(null);

    const {data: sessionInfo} = useGetSessionInfo();

    const antallNyligInnsendteSoknader = sessionInfo?.numRecentlySent ?? 0;
    const antallPabegynteSoknader = sessionInfo?.open?.length ?? 0;

    const navigate = useNavigate();
    const {t} = useTranslation("skjema");

    const onSokSosialhjelpButtonClick = async (event: React.SyntheticEvent) => {
        setStartSoknadPending(true);
        event.preventDefault();
        logEvent("skjema startet", {
            antallNyligInnsendteSoknader,
            antallPabegynteSoknader,
            enableModalV2: true,
            erProdsatt: true,
            language: localStorage.getItem("digisos-language"),
        });
        try {
            const {brukerBehandlingId, useKortSoknad} = await opprettSoknad();
            await hentXsrfCookie(brukerBehandlingId);
            // TODO: Få info om kort eller lang søknad i responsen og evaluer her
            if (useKortSoknad) {
                navigate(`../skjema/kort/${brukerBehandlingId}/1`);
            } else {
                navigate(`../skjema/${brukerBehandlingId}/1`);
            }
        } catch (e) {
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
