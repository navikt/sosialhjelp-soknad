import {Accordion, Alert, Button, Heading, Loader} from "@navikt/ds-react";
import {FormattedMessage, useIntl} from "react-intl";
import * as React from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {createSkjemaEventData, logAmplitudeEvent} from "../../../nav-soknad/utils/amplitude";
import {opprettSoknad} from "../../redux/soknad/soknadActions";
import Personopplysninger from "./Personopplysninger";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import {Notes} from "@navikt/ds-icons";
import {NedetidPanel} from "../../../components/common/NedetidPanel";
import {NySoknadVelkomst} from "./NySoknadVelkomst";
import {useSoknad} from "../../redux/soknad/useSoknad";

export const NySoknadInfo = (props: {antallPabegynteSoknader: number}) => {
    const {startSoknadPending, startSoknadFeilet, visNedetidPanel, harNyligInnsendteSoknader} = useSoknad();
    const antallNyligInnsendteSoknader = harNyligInnsendteSoknader?.antallNyligInnsendte ?? 0;

    const dispatch = useDispatch();

    const history = useHistory();

    const intl = useIntl();

    const onSokSosialhjelpButtonClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        startSoknad();
    };

    const startSoknad = () => {
        logAmplitudeEvent("skjema startet", {
            antallNyligInnsendteSoknader,
            antallPabegynteSoknader: props.antallPabegynteSoknader,
            enableModalV2: true,
            erProdsatt: true,
            ...createSkjemaEventData(),
        });
        dispatch(opprettSoknad(intl, history));
    };

    return (
        <>
            <NySoknadVelkomst />
            <Personopplysninger />
            <NedetidPanel varselType={"infoside"} />
            {startSoknadFeilet && (
                <Alert variant="error">
                    <FormattedMessage id="applikasjon.opprettsoknadfeilet" />
                </Alert>
            )}
            <div className={"pt-16 text-center"}>
                <Button
                    variant="primary"
                    id="start_soknad_button"
                    disabled={startSoknadPending || visNedetidPanel}
                    onClick={onSokSosialhjelpButtonClick}
                >
                    {getIntlTextOrKey(intl, "skjema.knapper.start")}
                    {startSoknadPending && <Loader />}
                </Button>
            </div>
        </>
    );
};

export const NySoknadPanel = ({antallPabegynteSoknader}: {antallPabegynteSoknader: number}) => (
    <Accordion>
        <Accordion.Item className={"bg-white rounded-md border-[1px]"}>
            <Accordion.Header className={"!items-center !border-0"}>
                <div className={"flex items-center px-4 py-2"}>
                    <div className={"rounded-full bg-green-500/40 p-3 mr-5 tw-hidden lg:block"}>
                        <Notes className={"w-9 h-9"} />
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
