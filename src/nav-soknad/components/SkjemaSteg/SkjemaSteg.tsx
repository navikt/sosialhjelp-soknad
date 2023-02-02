import * as React from "react";
import {useEffect} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import Feiloppsummering from "../validering/Feiloppsummering";
import {getIntlTextOrKey, scrollToTop} from "../../utils";
import AppBanner from "../appHeader/AppHeader";
import {State} from "../../../digisos/redux/reducers";
import {useTitle} from "../../hooks/useTitle";
import {Alert, Heading, Link} from "@navikt/ds-react";
import {NedetidPanel} from "../../../components/common/NedetidPanel";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import {useSoknad} from "../../../digisos/redux/soknad/useSoknad";
import {DigisosSkjemaStegKey, SkjemaConfig} from "./digisosSkjema";
import {SkjemaStegNavStepper} from "./SkjemaStegNavStepper";
import {useSkjemaNavigation} from "./useSkjemaNavigation";
import SkjemaStegNavKnapper from "./SkjemaStegNavKnapper";
import {useParams} from "react-router";
import ServerFeil from "../../feilsider/ServerFeil";
import SideIkkeFunnet from "../../feilsider/SideIkkeFunnet";
import TimeoutBox from "../timeoutbox/TimeoutBox";
import {AvbrytSoknad} from "../avbrytsoknad/AvbrytSoknad";
import {getSoknad} from "../../../lib/getSoknad";

export type UrlParams = Record<"behandlingsId" | "skjemaSteg", string>;

interface StegMedNavigasjonProps {
    steg: DigisosSkjemaStegKey;
    skjemaConfig: SkjemaConfig;
    pending?: boolean;
    ikon?: React.ReactNode;
    children?: any;
}

const MidlertidigDeaktivertPanel = () => {
    const {
        personalia: {navEnhet},
    } = useSoknadsdata();
    const {visMidlertidigDeaktivertPanel} = useSoknad();

    if (!visMidlertidigDeaktivertPanel) return null;

    return (
        <Alert variant="error">
            <FormattedMessage
                id="adresse.alertstripe.feil.v2"
                values={{
                    kommuneNavn: navEnhet?.kommunenavn ?? "Din",
                    a: (msg) => (
                        <Link href="https://www.nav.no/sosialhjelp/sok-papir" target="_blank">
                            {msg}
                        </Link>
                    ),
                }}
            />
        </Alert>
    );
};

const IkkePakobletPanel = () => {
    const {
        personalia: {navEnhet},
    } = useSoknadsdata();
    const {visIkkePakobletPanel} = useSoknad();
    if (!visIkkePakobletPanel) return null;

    return (
        <Alert variant="warning">
            <FormattedMessage
                id="adresse.alertstripe.advarsel.v2"
                values={{
                    kommuneNavn: navEnhet?.kommunenavn ?? "Din",
                    a: (msg) => (
                        <Link href="https://husbanken.no/bostotte" target="_blank" rel="noreferrer noopener">
                            {msg}
                        </Link>
                    ),
                }}
            />
        </Alert>
    );
};

export const SkjemaSteg = ({skjemaConfig, steg, ikon, children}: StegMedNavigasjonProps) => {
    const {soknad, validering, okonomiskeOpplysninger} = useSelector((state: State) => state);
    const {enFilLastesOpp} = okonomiskeOpplysninger;
    const {nedetid} = soknad;

    const dispatch = useDispatch();

    const {handleGaVidere, handleGaTilbake, handleGaTilSkjemaSteg} = useSkjemaNavigation();

    const intl = useIntl();

    useEffect(() => {
        scrollToTop();
    }, []);

    const {feil, visValideringsfeil} = validering;

    const stegTittel = getIntlTextOrKey(intl, `${steg}.tittel`);
    const documentTitle = intl.formatMessage({id: skjemaConfig.tittelId});
    const aktivtSteg = skjemaConfig.steg[steg];
    const nextButtonPending = soknad.sendSoknadPending;

    useTitle(`${stegTittel} - ${documentTitle}`);

    const {behandlingsId, showSideIkkeFunnet, showServerFeil} = useSoknad();
    const params = useParams<UrlParams>();

    useEffect(() => {
        if (!behandlingsId && params.behandlingsId) getSoknad(params.behandlingsId, dispatch);
    }, [behandlingsId, dispatch, params]);

    if (showServerFeil) return <ServerFeil />;

    if (showSideIkkeFunnet) return <SideIkkeFunnet />;

    return (
        <div className="pb-4 lg:pb-40 bg-green-500/20">
            <AppBanner />
            <SkjemaStegNavStepper skjemaConfig={skjemaConfig} aktivtSteg={steg} onStepChange={handleGaTilSkjemaSteg} />
            <div className={"max-w-3xl mx-auto skjema-steg skjema-content"}>
                <NedetidPanel varselType={"infoside"} />
                <Feiloppsummering
                    skjemanavn={skjemaConfig.skjemanavn}
                    valideringsfeil={feil}
                    visFeilliste={visValideringsfeil}
                />
                <div className={"bg-white mx-auto rounded-2xl px-10 md:px-12 lg:px-24 space-y-8 pt-4"}>
                    <div className={"text-center"}>
                        <div className="text-center mb-2">{ikon}</div>
                        <div className="skjema-steg__tittel" tabIndex={-1}>
                            <Heading size={"large"}>{stegTittel}</Heading>
                        </div>
                    </div>
                    <div className={"space-y-12 lg:space-y-24"}>{children}</div>
                    <TimeoutBox sessionDurationInMinutes={30} showWarningerAfterMinutes={25} />
                    <AvbrytSoknad />
                    {aktivtSteg.id !== 1 && !(aktivtSteg.id === 9 && nedetid?.isNedetid) && (
                        <>
                            <MidlertidigDeaktivertPanel />
                            <IkkePakobletPanel />
                        </>
                    )}

                    <SkjemaStegNavKnapper
                        gaViderePending={nextButtonPending}
                        gaVidereLabel={
                            aktivtSteg.type === "oppsummering"
                                ? getIntlTextOrKey(intl, "skjema.knapper.send")
                                : undefined
                        }
                        gaVidere={() => handleGaVidere(aktivtSteg)}
                        gaTilbake={aktivtSteg.id > 1 ? () => handleGaTilbake(aktivtSteg.id) : undefined}
                        sendSoknadServiceUnavailable={soknad.sendSoknadServiceUnavailable}
                        lastOppVedleggPending={enFilLastesOpp}
                    />
                </div>
            </div>
        </div>
    );
};

export default SkjemaSteg;
