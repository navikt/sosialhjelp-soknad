import * as React from "react";
import {ReactNode, useEffect} from "react";
import {Box, Link} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import SnakkebobleIllustrasjon from "../../svg/illustrasjoner/SnakkebobleIllustrasjon.tsx";
import StresskoffertIllustrasjon from "../../svg/illustrasjoner/StresskoffertIllustrasjon.tsx";
import DokumentIllustrasjon from "../../svg/illustrasjoner/DokumentIllustrasjon.tsx";
import {AppHeader} from "../../appHeader/AppHeader.tsx";
import {scrollToTop} from "../../../utils";
import {HusIllustrasjon} from "../../svg/illustrasjoner/HusIllustrasjon.tsx";
import {MynterIllustrasjon} from "../../svg/illustrasjoner/MynterIllustrasjon.tsx";
import {RequireXsrfCookie} from "../../RequireXsrfCookie.tsx";
import {DigisosLanguageKey} from "../../../i18n.ts";
import {SparegrisIllustrasjon} from "../../svg/illustrasjoner/SparegrisIllustrasjon.tsx";
import FamilieIllustrasjon from "../../svg/illustrasjoner/FamilieIllustrasjon.tsx";
import BoligIllustrasjon from "../../svg/illustrasjoner/BoligIllustrasjon.tsx";
import LommebokIllustrasjon from "../../svg/illustrasjoner/LommebokIllustrasjon.tsx";

export type SkjemaPage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type KortSkjemaPage = 1 | 2 | 3 | 4 | 5;

export const SkjemaHeadings: Record<SkjemaPage, {tittel: DigisosLanguageKey; ikon: ReactNode}> = {
    1: {tittel: "kontakt.tittel", ikon: <HusIllustrasjon />},
    2: {tittel: "begrunnelsebolk.tittel", ikon: <MynterIllustrasjon />},
    3: {tittel: "arbeidbolk.tittel", ikon: <StresskoffertIllustrasjon />},
    4: {tittel: "familiebolk.tittel", ikon: <FamilieIllustrasjon />},
    5: {tittel: "bosituasjonbolk.tittel", ikon: <BoligIllustrasjon />},
    6: {tittel: "inntektbolk.tittel", ikon: <SparegrisIllustrasjon />},
    7: {tittel: "utgifterbolk.tittel", ikon: <LommebokIllustrasjon />},
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

export const SkjemaSteg = ({children}: {children?: ReactNode | ReactNode[]}) => {
    useEffect(() => {
        scrollToTop();
    }, []);

    const {t} = useTranslation("skjema");

    return (
        <RequireXsrfCookie>
            <div className="pb-4 lg:pb-40 flex gap-10 items-center flex-col">
                <Link href="#main-content" className="sr-only sr-only-focusable">
                    {t("hoppTilHovedinnhold")}
                </Link>
                <AppHeader />
                <Box as={"main"} id={"main-content"} className={"max-w-3xl w-full"}>
                    {children}
                </Box>
            </div>
        </RequireXsrfCookie>
    );
};
