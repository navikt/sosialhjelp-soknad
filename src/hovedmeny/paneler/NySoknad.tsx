import {Accordion, Alert, Button, Heading, Loader} from "@navikt/ds-react";
import * as React from "react";
import {logAmplitudeEvent} from "../../nav-soknad/utils/amplitude";
import Personopplysninger from "./Personopplysninger";
import {getIntlTextOrKey} from "../../nav-soknad/utils";
import {FillForms} from "@navikt/ds-icons";
import {NedetidPanel} from "../../components/common/NedetidPanel";
import {NySoknadVelkomst} from "./NySoknadVelkomst";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {useGetSessionInfo} from "../../generated/informasjon-ressurs/informasjon-ressurs";
import {useState} from "react";
import {opprettSoknad} from "../../generated/soknad-ressurs/soknad-ressurs";

export const NySoknadInfo = () => {
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
        logAmplitudeEvent("skjema startet", {
            antallNyligInnsendteSoknader,
            antallPabegynteSoknader,
            enableModalV2: true,
            erProdsatt: true,
            language: localStorage.getItem("digisos-language"),
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
    const {t} = useTranslation("skjema");
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
                            {t("applikasjon.start.ny.soknad")}
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
