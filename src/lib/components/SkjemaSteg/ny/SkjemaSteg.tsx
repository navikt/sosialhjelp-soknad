import * as React from "react";
import {createContext, ReactNode, useContext, useEffect} from "react";
import {Heading, Link} from "@navikt/ds-react";
import {NedetidPanel} from "../../NedetidPanel";
import {useTranslation} from "react-i18next";
import {useSkjemaNavigation} from "../useSkjemaNavigation";
import SnakkebobleIllustrasjon from "../../svg/illustrasjoner/SnakkebobleIllustrasjon";
import {SkjemaStegButtons} from "./SkjemaStegButtons";
import {SkjemaStegStepper} from "./SkjemaStegStepper";
import {SkjemaStegErrorSummary} from "./SkjemaStegErrorSummary";
import StresskoffertIllustrasjon from "../../svg/illustrasjoner/StresskoffertIllustrasjon";
import DokumentIllustrasjon from "../../svg/illustrasjoner/DokumentIllustrasjon";
import cx from "classnames";
import {AppHeader} from "../../appHeader/AppHeader";
import {logError, logWarning} from "../../../log/loggerUtils";
import {scrollToTop} from "../../../utils";
import {useTitle} from "../../../hooks/common/useTitle";
import {HusIllustrasjon} from "../../svg/illustrasjoner/HusIllustrasjon";
import {MynterIllustrasjon} from "../../svg/illustrasjoner/MynterIllustrasjon";
import {RequireXsrfCookie} from "./RequireXsrfCookie";
import {DigisosLanguageKey} from "../../../i18n";

type TSkjemaStegContext = {
    page: SkjemaPage;
    requestNavigation: (toPage: number) => Promise<void>;
};

export const SkjemaStegContext = createContext<TSkjemaStegContext | null>(null);

// This error can be thrown in requestNavigation to prevent navigation.
// All other errors prevent navigation too; this just prevents it from
// being logged.
export class DigisosValidationError extends Error {}

// Kast en DigisosValidationError, som forhindrer klienten fra å navigere
export const inhibitNavigation = async () => {
    throw new DigisosValidationError();
};

interface SkjemaStegProps {
    page: SkjemaPage;
    children?: ReactNode | ReactNode[];
    /**
     * Callback before navigation.
     * To prevent navigation, throw an exception.
     * If the exception is of type DigisosValidationError, nothing is logged.
     * If another exception is thrown, the error is logged.
     */
    onRequestNavigation?: () => Promise<unknown>;
}

export type SkjemaPage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const SkjemaHeadings: Record<SkjemaPage, {tittel: string; ikon: ReactNode}> = {
    1: {tittel: "kontakt.tittel", ikon: <HusIllustrasjon />},
    2: {tittel: "begrunnelsebolk.tittel", ikon: <MynterIllustrasjon />},
    3: {tittel: "arbeidbolk.tittel", ikon: <StresskoffertIllustrasjon />},
    4: {tittel: "familiebolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    5: {tittel: "bosituasjonbolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    6: {tittel: "inntektbolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    7: {tittel: "utgifterbolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    8: {tittel: "opplysningerbolk.tittel", ikon: <DokumentIllustrasjon />},
    9: {tittel: "oppsummering.tittel", ikon: <SnakkebobleIllustrasjon />},
} as const;

export const SkjemaTittel: Record<SkjemaPage, DigisosLanguageKey> = {
    1: "kontakt.tittel",
    2: "begrunnelsebolk.tittel",
    3: "arbeidbolk.tittel",
    4: "familiebolk.tittel",
    5: "bosituasjonbolk.tittel",
    6: "inntektbolk.tittel",
    7: "utgifterbolk.tittel",
    8: "opplysningerbolk.tittel",
    9: "oppsummering.tittel",
} as const;

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
            <div className="mx-auto w-fit mb-2">{SkjemaHeadings[page].ikon}</div>
            <Heading level={"2"} size={"large"} data-testid={page === 2 ? "skjemasteg-heading" : null}>
                {t(SkjemaTittel[page])}
            </Heading>
        </div>
    );
};

const SkjemaContent = React.forwardRef<HTMLDivElement, {children: ReactNode; className?: string}>(
    ({children, className}, ref) => (
        <section
            ref={ref}
            className={cx(
                "bg-white mx-auto rounded-2xl px-4 md:px-12 lg:px-24 pt-8 pb-8 mb-16 space-y-12 lg:space-y-24",
                className
            )}
        >
            {children}
        </section>
    )
);

const SkjemaSteg = ({page, children, onRequestNavigation}: SkjemaStegProps) => {
    useEffect(() => {
        scrollToTop();
    }, []);

    const {t} = useTranslation("skjema");

    useTitle(`${t(SkjemaTittel[page])} - ${t("applikasjon.sidetittel")}`);

    const {gotoPage} = useSkjemaNavigation(page);

    const requestNavigation = async (page: number) => {
        try {
            if (onRequestNavigation !== undefined) await onRequestNavigation();
            gotoPage(page);
        } catch (e) {
            scrollToTop();
            if (!(e instanceof DigisosValidationError)) await logWarning(`Nektet navigering: ${e}`);
        }
    };

    return (
        <RequireXsrfCookie>
            <SkjemaStegContext.Provider value={{page, requestNavigation}}>
                <div className="pb-4 lg:pb-40 bg-digisosGronnBakgrunn flex gap-10 items-center flex-col">
                    <Link href="#main-content" className="sr-only sr-only-focusable">
                        {t("hoppTilHovedinnhold")}
                    </Link>
                    <AppHeader className={"w-full"} />
                    <SkjemaStegStepper />
                    <main id={"main-content"} className={"max-w-3xl mx-auto w-full"}>
                        <NedetidPanel varselType={"infoside"} />
                        {children}
                    </main>
                </div>
            </SkjemaStegContext.Provider>
        </RequireXsrfCookie>
    );
};

SkjemaSteg.Buttons = SkjemaStegButtons;
SkjemaSteg.Title = SkjemaTitle;
SkjemaSteg.Container = SkjemaSteg;
SkjemaSteg.Content = SkjemaContent;
SkjemaSteg.Stepper = SkjemaStegStepper;
SkjemaSteg.ErrorSummary = SkjemaStegErrorSummary;

export {SkjemaSteg};
