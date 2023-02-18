import {Accordion, Alert, Button, Heading, Loader} from "@navikt/ds-react";
import * as React from "react";
import {createSkjemaEventData, logAmplitudeEvent} from "../../../nav-soknad/utils/amplitude";
import Personopplysninger from "./Personopplysninger";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import {FillForms} from "@navikt/ds-icons";
import {NedetidPanel} from "../../../components/common/NedetidPanel";
import {NySoknadVelkomst} from "./NySoknadVelkomst";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {usePabegynteSoknader} from "../usePabegynteSoknader";
import {useHarNyligInnsendteSoknader} from "../../../generated/informasjon-ressurs/informasjon-ressurs";
import {useState} from "react";
import {opprettSoknad} from "../../../generated/soknad-ressurs/soknad-ressurs";

export const NySoknadInfo = () => {
    const [startSoknadPending, setStartSoknadPending] = useState<boolean>(false);
    const [startSoknadError, setStartSoknadError] = useState<Error | null>(null);

    const {data: nyligInnsendteSoknader} = useHarNyligInnsendteSoknader();
    const antallPabegynteSoknader = usePabegynteSoknader()?.length;

    const navigate = useNavigate();
    const {t} = useTranslation("skjema");

    const onSokSosialhjelpButtonClick = async (event: React.SyntheticEvent) => {
        setStartSoknadPending(true);
        event.preventDefault();
        logAmplitudeEvent("skjema startet", {
            antallNyligInnsendteSoknader: nyligInnsendteSoknader?.antallNyligInnsendte ?? 0,
            antallPabegynteSoknader: antallPabegynteSoknader,
            enableModalV2: true,
            erProdsatt: true,
            ...createSkjemaEventData(),
        });
        try {
            const {brukerBehandlingId} = await opprettSoknad();
            navigate(`../skjema/${brukerBehandlingId}/1`);
        } catch (e) {
            setStartSoknadError(e);
            setStartSoknadPending(false);
        }
    };

    return (
        <>
            <NySoknadVelkomst />
            <Personopplysninger />
            <NedetidPanel varselType={"infoside"} />
            {startSoknadError && <Alert variant="error">{t("applikasjon.opprettsoknadfeilet")}</Alert>}
            <div className={"pt-16 text-center"}>
                <Button
                    variant="primary"
                    id="start_soknad_button"
                    disabled={startSoknadPending}
                    onClick={onSokSosialhjelpButtonClick}
                >
                    {getIntlTextOrKey(t, "skjema.knapper.start")}
                    {startSoknadPending && <Loader />}
                </Button>
            </div>
        </>
    );
};

export const NySoknadPanel = () => {
    return (
        <Accordion>
            <Accordion.Item className={"bg-white rounded-md"}>
                <Accordion.Header className={"!items-center !border-0 !py-6 !px-8 rounded-t-md"}>
                    <div className={"flex items-center gap-8"}>
                        <div
                            className={
                                "rounded-full bg-green-500/40 w-11 h-11 justify-center items-center tw-hidden lg:flex"
                            }
                        >
                            <FillForms className={"w-6 h-6 block"} aria-hidden="true" />
                        </div>
                        <Heading level="2" size="small">
                            Start en ny søknad
                        </Heading>
                    </div>
                </Accordion.Header>
                <Accordion.Content className={"!px-0 !border-0"}>
                    <NySoknadInfo />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
