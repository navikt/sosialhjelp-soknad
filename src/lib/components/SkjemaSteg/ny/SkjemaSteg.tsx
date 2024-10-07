import * as React from "react";
import {ReactNode, useEffect} from "react";
import {Link} from "@navikt/ds-react";
import {NedetidPanel} from "../../NedetidPanel";
import {useTranslation} from "react-i18next";
import {useSkjemaNavigation} from "../useSkjemaNavigation";
import SnakkebobleIllustrasjon from "../../svg/illustrasjoner/SnakkebobleIllustrasjon";
import {SkjemaStegStepper} from "./SkjemaStegStepper";
import StresskoffertIllustrasjon from "../../svg/illustrasjoner/StresskoffertIllustrasjon";
import DokumentIllustrasjon from "../../svg/illustrasjoner/DokumentIllustrasjon";
import {AppHeader} from "../../appHeader/AppHeader";
import {logWarning} from "../../../log/loggerUtils";
import {scrollToTop} from "../../../utils";
import {useTitle} from "../../../hooks/common/useTitle";
import {HusIllustrasjon} from "../../svg/illustrasjoner/HusIllustrasjon";
import {MynterIllustrasjon} from "../../svg/illustrasjoner/MynterIllustrasjon";
import {RequireXsrfCookie} from "./RequireXsrfCookie";
import {useLocation} from "react-router-dom";
import {DigisosLanguageKey} from "../../../i18n";
import {SparegrisIllustrasjon} from "../../svg/illustrasjoner/SparegrisIllustrasjon.tsx";

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
    skipStepper?: boolean;
}

export type SkjemaPage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type KortSkjemaPage = 1 | 2 | 3 | 4 | 5;

export const SkjemaHeadings: Record<SkjemaPage, {tittel: DigisosLanguageKey; ikon: ReactNode}> = {
    1: {tittel: "kontakt.tittel", ikon: <HusIllustrasjon />},
    2: {tittel: "begrunnelsebolk.tittel", ikon: <MynterIllustrasjon />},
    3: {tittel: "arbeidbolk.tittel", ikon: <StresskoffertIllustrasjon />},
    4: {tittel: "familiebolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    5: {tittel: "bosituasjonbolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    6: {tittel: "inntektbolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    7: {tittel: "utgifterbolk.tittel", ikon: <SnakkebobleIllustrasjon />},
    8: {tittel: "opplysningerbolk.tittel", ikon: <DokumentIllustrasjon />},
    9: {tittel: "oppsummering.tittel", ikon: <SnakkebobleIllustrasjon />},
};

export const KortSkjemaHeadings: Record<KortSkjemaPage, {tittel: DigisosLanguageKey; ikon: ReactNode}> = {
    1: {tittel: "kontakt.tittel", ikon: <HusIllustrasjon />},
    2: {tittel: "begrunnelsebolk.tittel", ikon: <MynterIllustrasjon />},
    3: {tittel: "arbeidOgFamilie.tittel", ikon: <StresskoffertIllustrasjon />},
    4: {tittel: "situasjon.kort.tittel", ikon: <SparegrisIllustrasjon />},
    5: {tittel: "oppsummering.tittel", ikon: <SnakkebobleIllustrasjon />},
};

export const SkjemaSteg = ({page, children, onRequestNavigation, skipStepper}: SkjemaStegProps) => {
    useEffect(() => {
        scrollToTop();
    }, []);

    const {t} = useTranslation("skjema");

    const location = useLocation();

    const isKortSoknad = location.pathname.includes("/kort");

    useTitle(`${t(SkjemaHeadings[page].tittel)} - ${t("applikasjon.sidetittel.stringValue")}`);

    const {gotoPage} = useSkjemaNavigation(page);

    const requestNavigation = async (page: number) => {
        try {
            if (onRequestNavigation !== undefined) await onRequestNavigation();
            gotoPage(page);
        } catch (e: any) {
            scrollToTop();
            if (!(e instanceof DigisosValidationError)) await logWarning(`Nektet navigering: ${e}`);
        }
    };

    return (
        <RequireXsrfCookie>
            <div className="pb-4 lg:pb-40 bg-digisosGronnBakgrunn flex gap-10 items-center flex-col">
                <Link href="#main-content" className="sr-only sr-only-focusable">
                    {t("hoppTilHovedinnhold")}
                </Link>
                <AppHeader />
                {!skipStepper && (
                    <SkjemaStegStepper requestNavigation={requestNavigation} kort={isKortSoknad} page={page} />
                )}
                <main id={"main-content"} className={"max-w-3xl mx-auto w-full"}>
                    <NedetidPanel varselType={"infoside"} />
                    {children}
                </main>
            </div>
        </RequireXsrfCookie>
    );
};
