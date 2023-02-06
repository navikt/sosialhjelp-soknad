import {Accordion, Alert, Button, Heading, Loader} from "@navikt/ds-react";
import * as React from "react";
import {useDispatch} from "react-redux";
import {createSkjemaEventData, logAmplitudeEvent} from "../../../nav-soknad/utils/amplitude";
import Personopplysninger from "./Personopplysninger";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import {FillForms} from "@navikt/ds-icons";
import {NedetidPanel} from "../../../components/common/NedetidPanel";
import {NySoknadVelkomst} from "./NySoknadVelkomst";
import {useSoknad} from "../../redux/soknad/useSoknad";
import {startSoknad} from "../../../lib/StartSoknad";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

export const NySoknadInfo = (props: {antallPabegynteSoknader: number}) => {
    const {startSoknadPending, startSoknadFeilet, visNedetidPanel, harNyligInnsendteSoknader} = useSoknad();
    const antallNyligInnsendteSoknader = harNyligInnsendteSoknader?.antallNyligInnsendte ?? 0;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation("skjema");

    const onSokSosialhjelpButtonClick = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        logAmplitudeEvent("skjema startet", {
            antallNyligInnsendteSoknader,
            antallPabegynteSoknader: props.antallPabegynteSoknader,
            enableModalV2: true,
            erProdsatt: true,
            ...createSkjemaEventData(),
        });
        const behandlingsId = await startSoknad(dispatch);
        behandlingsId && navigate(`../skjema/${behandlingsId}/1`);
    };

    return (
        <>
            <NySoknadVelkomst />
            <Personopplysninger />
            <NedetidPanel varselType={"infoside"} />
            {startSoknadFeilet && <Alert variant="error">{t("applikasjon.opprettsoknadfeilet")}</Alert>}
            <div className={"pt-16 text-center"}>
                <Button
                    variant="primary"
                    id="start_soknad_button"
                    disabled={startSoknadPending || visNedetidPanel}
                    onClick={onSokSosialhjelpButtonClick}
                >
                    {getIntlTextOrKey(t, "skjema.knapper.start")}
                    {startSoknadPending && <Loader />}
                </Button>
            </div>
        </>
    );
};

export const NySoknadPanel = ({antallPabegynteSoknader}: {antallPabegynteSoknader: number}) => (
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
                <NySoknadInfo antallPabegynteSoknader={antallPabegynteSoknader} />
            </Accordion.Content>
        </Accordion.Item>
    </Accordion>
);
