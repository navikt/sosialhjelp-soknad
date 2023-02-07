import * as React from "react";
import {ReactNode, useEffect} from "react";
import {useSelector} from "react-redux";
import Feiloppsummering from "../validering/Feiloppsummering";
import {getIntlTextOrKey, scrollToTop} from "../../utils";
import AppBanner from "../appHeader/AppHeader";
import {State} from "../../../digisos/redux/reducers";
import {useTitle} from "../../hooks/useTitle";
import {Heading} from "@navikt/ds-react";
import {NedetidPanel} from "../../../components/common/NedetidPanel";
import {useSoknad} from "../../../digisos/redux/soknad/useSoknad";
import {DigisosSkjemaStegKey, SkjemaConfig} from "./digisosSkjema";
import {SkjemaStegNavStepper} from "./SkjemaStegNavStepper";
import {useSkjemaNavigation} from "./useSkjemaNavigation";
import SkjemaStegNavKnapper from "./SkjemaStegNavKnapper";
import ServerFeil from "../../feilsider/ServerFeil";
import SideIkkeFunnet from "../../feilsider/SideIkkeFunnet";
import TimeoutBox from "../timeoutbox/TimeoutBox";
import {AvbrytSoknad} from "../avbrytsoknad/AvbrytSoknad";
import {useTranslation} from "react-i18next";
import {useReduxSynchronizer} from "./UseReduxSynchronizer";
import {MidlertidigDeaktivertPanel} from "./MidlertidigDeaktivertPanel";
import {IkkePakobletPanel} from "./IkkePakobletPanel";

interface StegMedNavigasjonProps {
    steg: DigisosSkjemaStegKey;
    skjemaConfig: SkjemaConfig;
    pending?: boolean;
    ikon?: React.ReactNode;
    children?: any;
}

const useSkjemaConfig = (skjemaConfig: SkjemaConfig, steg: DigisosSkjemaStegKey) => {
    const {t} = useTranslation("skjema");

    return {
        stegTittel: getIntlTextOrKey(t, `${steg}.tittel`),
        documentTitle: t(skjemaConfig.tittelId),
        aktivtSteg: skjemaConfig.steg[steg],
    };
};

function SkjemaStegHeading(props: {ikon: ReactNode; stegTittel: string}) {
    return (
        <div className={"text-center"}>
            <div className="text-center mb-2">{props.ikon}</div>
            <div className="skjema-steg__tittel" tabIndex={-1}>
                <Heading size={"large"}>{props.stegTittel}</Heading>
            </div>
        </div>
    );
}

export const SkjemaSteg = ({skjemaConfig, steg, ikon, children}: StegMedNavigasjonProps) => {
    const {sendSoknadPending, nedetid, showSideIkkeFunnet, showServerFeil} = useSoknad();
    const {
        validering: {feil, visValideringsfeil},
        okonomiskeOpplysninger: {enFilLastesOpp},
    } = useSelector((state: State) => state);
    useReduxSynchronizer();

    const {stegTittel, documentTitle, aktivtSteg} = useSkjemaConfig(skjemaConfig, steg);
    const {goToStep} = useSkjemaNavigation(aktivtSteg.id);

    useEffect(() => {
        scrollToTop();
    }, []);

    useTitle(`${stegTittel} - ${documentTitle}`);

    if (showServerFeil) return <ServerFeil />;

    if (showSideIkkeFunnet) return <SideIkkeFunnet />;

    return (
        <div className="pb-4 lg:pb-40 bg-green-500/20">
            <AppBanner />
            <SkjemaStegNavStepper skjemaConfig={skjemaConfig} aktivtSteg={steg} onStepChange={goToStep} />
            <div className={"max-w-3xl mx-auto skjema-steg skjema-content"}>
                <NedetidPanel varselType={"infoside"} />
                <Feiloppsummering
                    skjemanavn={skjemaConfig.skjemanavn}
                    valideringsfeil={feil}
                    visFeilliste={visValideringsfeil}
                />
                <div className={"bg-white mx-auto rounded-2xl px-10 md:px-12 lg:px-24 space-y-8 pt-8"}>
                    <SkjemaStegHeading ikon={ikon} stegTittel={stegTittel} />
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
                        skjemaConfig={skjemaConfig}
                        aktivtSteg={skjemaConfig.steg[steg]}
                        goToStep={goToStep}
                        loading={sendSoknadPending || enFilLastesOpp}
                    />
                </div>
            </div>
        </div>
    );
};

export default SkjemaSteg;
