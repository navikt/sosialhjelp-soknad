import * as React from "react";
import {ReactNode, useEffect} from "react";
import {scrollToTop} from "../../../utils";
import AppBanner from "../../appHeader/AppHeader";
import {useTitle} from "../../../hooks/useTitle";
import {Heading} from "@navikt/ds-react";
import {NedetidPanel} from "../../../../components/common/NedetidPanel";
import {useSoknad} from "../../../../digisos/redux/soknad/useSoknad";
import TimeoutBox from "../../timeoutbox/TimeoutBox";
import {AvbrytSoknadModal} from "../../avbrytsoknad/AvbrytSoknadModal";
import {useTranslation} from "react-i18next";
import {useReduxSynchronizer} from "../UseReduxSynchronizer";
import {MidlertidigDeaktivertPanel} from "../MidlertidigDeaktivertPanel";
import {IkkePakobletPanel} from "../IkkePakobletPanel";
import {useHentNedetidInformasjon} from "../../../../generated/nedetid-ressurs/nedetid-ressurs";
import ServerFeil from "../../../feilsider/ServerFeil";
import SideIkkeFunnet from "../../../feilsider/SideIkkeFunnet";
import {useSkjemaNavigation} from "../useSkjemaNavigation";
import SnakkebobleIllustrasjon from "../../svg/illustrasjoner/SnakkebobleIllustrasjon";
import {SkjemaButtons} from "./SkjemaButtons";
import {SkjemaStepper} from "./SkjemaStepper";

interface StegMedNavigasjonProps {
    steg: SkjemaTrinn;
    children?: ReactNode | ReactNode[];
    onBeforeNavigate?: () => Promise<void>;
}

export type SkjemaTrinn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const SkjemaHeadings: Record<SkjemaTrinn, {tittel: string; ikon: ReactNode}> = {
    1: {tittel: "kontakt.tittel", ikon: <SnakkebobleIllustrasjon />},
    2: {tittel: "begrunnelsebolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    3: {tittel: "arbeidbolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    4: {tittel: "familiebolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    5: {tittel: "bosituasjonbolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    6: {tittel: "inntektbolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    7: {tittel: "utgifterbolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    8: {tittel: "opplysningerbolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    9: {tittel: "oppsummering.tittel", ikon: <SnakkebobleIllustrasjon />},
};

const Title = ({steg}: {steg: SkjemaTrinn}) => {
    const {t} = useTranslation("skjema");
    return (
        <div tabIndex={-1} className={"text-center mb-12 lg:mb-24"}>
            <div className="text-center mb-2">{SkjemaHeadings[steg].ikon}</div>
            <Heading size={"large"}>{t(SkjemaHeadings[steg].tittel)}</Heading>
        </div>
    );
};

export const Container = ({steg, children, onBeforeNavigate}: StegMedNavigasjonProps) => {
    const {data: nedetid} = useHentNedetidInformasjon();

    useReduxSynchronizer();

    useEffect(() => {
        scrollToTop();
    }, []);

    const {t} = useTranslation("skjema");

    useTitle(`${t(SkjemaHeadings[steg].tittel)} - ${t("applikasjon.sidetittel")}`);

    const {goToStep} = useSkjemaNavigation(steg);

    const tryNavigate = async (step: number) => {
        if (onBeforeNavigate === undefined) {
            goToStep(step);
        } else {
            try {
                await onBeforeNavigate();
                goToStep(step);
            } catch (e: any) {}
        }
    };

    const {showSideIkkeFunnet, showServerFeil} = useSoknad();

    if (showServerFeil) return <ServerFeil />;

    if (showSideIkkeFunnet) return <SideIkkeFunnet />;

    return (
        <div className="pb-4 lg:pb-40 bg-green-500/20">
            <TimeoutBox sessionDurationInMinutes={30} showWarningerAfterMinutes={25} />
            <AvbrytSoknadModal />
            <AppBanner />
            <SkjemaStepper steg={steg} onStepChange={tryNavigate} />
            <div className={"max-w-3xl mx-auto "}>
                <NedetidPanel varselType={"infoside"} />
                <div className={"bg-white mx-auto rounded-2xl px-4 md:px-12 lg:px-24 space-y-8 pt-8"}>
                    <div className={"space-y-12 lg:space-y-24"}>{children}</div>
                    <SkjemaButtons steg={2} goToStep={tryNavigate} />

                    {steg !== 1 && !(steg === 9 && nedetid?.isNedetid) && (
                        <>
                            <MidlertidigDeaktivertPanel />
                            <IkkePakobletPanel />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const exports = {
    Container,
    Title,
};

export default exports;
