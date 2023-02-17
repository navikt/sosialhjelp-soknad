import * as React from "react";
import {ReactNode, useEffect, useState} from "react";
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
import {SkjemaStegNavStepperLegacy} from "./SkjemaStegNavStepperLegacy";
import {useSkjemaNavigation} from "./useSkjemaNavigation";
import SkjemaStegNavKnapperLegacy from "./SkjemaStegNavKnapperLegacy";
import TimeoutBox from "../timeoutbox/TimeoutBox";
import {AvbrytSoknadModal} from "../avbrytsoknad/AvbrytSoknadModal";
import {useTranslation} from "react-i18next";
import {useHentNedetidInformasjon} from "../../../generated/nedetid-ressurs/nedetid-ressurs";
import ServerFeil from "../../feilsider/ServerFeil";
import SideIkkeFunnet from "../../feilsider/SideIkkeFunnet";
import {NavEnhetInaktiv} from "../../../digisos/skjema/personopplysninger/adresse/NavEnhet";

interface StegMedNavigasjonProps {
    steg: DigisosSkjemaStegKey;
    skjemaConfig: SkjemaConfig;
    pending?: boolean;
    ikon?: React.ReactNode;
    children?: any;
    onSend?: () => Promise<void>;
}

export const useSkjemaConfig = (skjemaConfig: SkjemaConfig, steg: DigisosSkjemaStegKey) => {
    const {t} = useTranslation("skjema");

    return {
        stegTittel: getIntlTextOrKey(t, `${steg}.tittel`),
        documentTitle: t(skjemaConfig.tittelId),
        aktivtSteg: skjemaConfig.steg[steg],
    };
};

function SkjemaStegHeading(props: {ikon: ReactNode; stegTittel: string}) {
    return (
        <div className={"text-center mb-12 lg:mb-24"}>
            <div className="text-center mb-2">{props.ikon}</div>
            <div className="skjema-steg__tittel" tabIndex={-1}>
                <Heading size={"large"}>{props.stegTittel}</Heading>
            </div>
        </div>
    );
}

export const SkjemaStegLegacy = ({skjemaConfig, steg, ikon, children, onSend}: StegMedNavigasjonProps) => {
    const [avbrytModalOpen, setAvbrytModalOpen] = useState<boolean>(false);
    const {data: nedetid} = useHentNedetidInformasjon();
    const {
        validering: {feil, visValideringsfeil},
        okonomiskeOpplysninger: {enFilLastesOpp},
    } = useSelector((state: State) => state);

    const {stegTittel, documentTitle, aktivtSteg} = useSkjemaConfig(skjemaConfig, steg);
    const {gotoPage} = useSkjemaNavigation(aktivtSteg.id);

    useEffect(() => {
        scrollToTop();
    }, []);

    useTitle(`${stegTittel} - ${documentTitle}`);

    const {showSideIkkeFunnet, showServerFeil} = useSoknad();

    if (showServerFeil) return <ServerFeil />;

    if (showSideIkkeFunnet) return <SideIkkeFunnet />;

    return (
        <div className="pb-4 lg:pb-40 bg-digisosGronnBakgrunn">
            <AppBanner />
            <SkjemaStegNavStepperLegacy skjemaConfig={skjemaConfig} aktivtSteg={steg} onStepChange={gotoPage} />
            <div className={"max-w-3xl mx-auto skjema-steg skjema-content"}>
                <NedetidPanel varselType={"infoside"} />
                <Feiloppsummering valideringsfeil={feil} visFeilliste={visValideringsfeil} />
                <div className={"bg-white mx-auto rounded-2xl px-4 md:px-12 lg:px-24 space-y-8 pt-8"}>
                    <SkjemaStegHeading ikon={ikon} stegTittel={stegTittel} />
                    <div className={"space-y-12 lg:space-y-24"}>{children}</div>
                    <TimeoutBox sessionDurationInMinutes={30} showWarningerAfterMinutes={25} />
                    <AvbrytSoknadModal open={avbrytModalOpen} onClose={() => setAvbrytModalOpen(false)} />
                    {aktivtSteg.id !== 1 && !(aktivtSteg.id === 9 && nedetid?.isNedetid) && <NavEnhetInaktiv />}
                    <SkjemaStegNavKnapperLegacy
                        skjemaConfig={skjemaConfig}
                        steg={skjemaConfig.steg[steg]}
                        goToStep={gotoPage}
                        loading={enFilLastesOpp}
                        onSend={onSend}
                    />
                </div>
            </div>
        </div>
    );
};

export default SkjemaStegLegacy;
