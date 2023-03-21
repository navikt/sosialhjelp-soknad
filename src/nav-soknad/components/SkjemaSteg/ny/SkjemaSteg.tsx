import * as React from "react";
import {createContext, ReactNode, useContext, useEffect} from "react";
import {scrollToTop} from "../../../utils";
import AppBanner from "../../appHeader/AppHeader";
import {useTitle} from "../../../../lib/hooks/useTitle";
import {Heading} from "@navikt/ds-react";
import {NedetidPanel} from "../../../../components/common/NedetidPanel";
import TimeoutBox from "../../timeoutbox/TimeoutBox";
import {useTranslation} from "react-i18next";
import {useSkjemaNavigation} from "../useSkjemaNavigation";
import SnakkebobleIllustrasjon from "../../svg/illustrasjoner/SnakkebobleIllustrasjon";
import {SkjemaStegButtons} from "./SkjemaStegButtons";
import {SkjemaStegStepper} from "./SkjemaStegStepper";
import {logError, logWarning} from "../../../utils/loggerUtils";
import William from "../../svg/illustrasjoner/William";
import {SkjemaStegErrorSummary} from "./SkjemaStegErrorSummary";
import Koffert from "../../svg/illustrasjoner/Koffert";
import SkjemaIllustrasjon from "../../svg/illustrasjoner/SkjemaIllustrasjon";
import cx from "classnames";

type TSkjemaStegContext = {
    page: SkjemaPage;
    requestNavigation: (toPage: number) => Promise<void>;
};

export const SkjemaStegContext = createContext<TSkjemaStegContext | null>(null);

interface SkjemaStegProps {
    page: SkjemaPage;
    children?: ReactNode | ReactNode[];
    /**
     * Callback before navigation.
     * To prevent navigation, throw an exception (it will be passed along as a warning to backend in the testing phase)
     */
    onRequestNavigation?: () => Promise<void>;
}

export type SkjemaPage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const SkjemaHeadings: Record<SkjemaPage, {tittel: string; ikon: ReactNode}> = {
    1: {tittel: "kontakt.tittel", ikon: <William />},
    2: {tittel: "begrunnelsebolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    3: {tittel: "arbeidbolk.tittel", ikon: <Koffert />},
    4: {tittel: "familiebolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    5: {tittel: "bosituasjonbolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    6: {tittel: "inntektbolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    7: {tittel: "utgifterbolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    8: {tittel: "opplysningerbolk.tittel", ikon: <SkjemaIllustrasjon />},
    9: {tittel: "oppsummering.tittel", ikon: <SnakkebobleIllustrasjon />},
};

const SkjemaTitle = ({className}: {className?: string}) => {
    const {t} = useTranslation("skjema");
    const context = useContext(SkjemaStegContext);

    if (context === null) {
        logError("<SkjemaSteg.Buttons/> must be used inside <SkjemaSteg.Container />");
        return null;
    }

    const {page} = context;

    return (
        <div tabIndex={-1} className={cx("text-center mb-12 lg:mb-24", className)}>
            <div className="text-center mb-2">{SkjemaHeadings[page].ikon}</div>
            <Heading size={"xlarge"} data-testid={page === 2 ? "skjemasteg-2-heading" : null}>
                {t(SkjemaHeadings[page].tittel)}
            </Heading>
        </div>
    );
};

const SkjemaContent = ({children, className}: {children: ReactNode; className?: string}) => (
    <div
        className={cx(
            "bg-white mx-auto rounded-2xl px-4 md:px-12 lg:px-24 pt-8 pb-8 mb-16 space-y-12 lg:space-y-24",
            className
        )}
    >
        {children}
    </div>
);

const SkjemaSteg = ({page, children, onRequestNavigation}: SkjemaStegProps) => {
    useEffect(() => {
        scrollToTop();
    }, []);

    const {t} = useTranslation("skjema");

    useTitle(`${t(SkjemaHeadings[page].tittel)} - ${t("applikasjon.sidetittel")}`);

    const {gotoPage} = useSkjemaNavigation(page);

    const requestNavigation = async (page: number) => {
        try {
            if (onRequestNavigation !== undefined) await onRequestNavigation();
            gotoPage(page);
        } catch (e) {
            logWarning(`Nektet navigering: ${e}`);
            scrollToTop();
        }
    };

    return (
        <SkjemaStegContext.Provider value={{page, requestNavigation}}>
            <div className="pb-4 lg:pb-40 bg-digisosGronnBakgrunn">
                <TimeoutBox sessionDurationInMinutes={30} showWarningerAfterMinutes={25} />
                <AppBanner />
                <SkjemaStegStepper />
                <div className={"max-w-3xl mx-auto"}>
                    <NedetidPanel varselType={"infoside"} />
                    {children}
                </div>
            </div>
        </SkjemaStegContext.Provider>
    );
};

SkjemaSteg.Buttons = SkjemaStegButtons;
SkjemaSteg.Title = SkjemaTitle;
SkjemaSteg.Container = SkjemaSteg;
SkjemaSteg.Content = SkjemaContent;
SkjemaSteg.Stepper = SkjemaStegStepper;
SkjemaSteg.ErrorSummary = SkjemaStegErrorSummary;

export {SkjemaSteg};
