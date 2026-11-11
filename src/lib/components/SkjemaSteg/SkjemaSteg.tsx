import * as React from "react";
import {ReactNode, useEffect} from "react";
import {Link, VStack} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {scrollToTop} from "../../utils";
import {DigisosLanguageKey} from "../../i18n/common.ts";
import {SoknadHeader} from "../SoknadHeader.tsx";

export type SkjemaPage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type KortSkjemaPage = 1 | 2 | 3 | 4 | 5;

export const SkjemaHeadings: Record<SkjemaPage, {tittel: DigisosLanguageKey}> = {
    1: {tittel: "kontakt.tittel"},
    2: {tittel: "begrunnelsebolk.tittel"},
    3: {tittel: "arbeidbolk.tittel"},
    4: {tittel: "familiebolk.tittel"},
    5: {tittel: "bosituasjonbolk.tittel"},
    6: {tittel: "inntektbolk.tittel"},
    7: {tittel: "utgifterbolk.tittel"},
    8: {tittel: "opplysningerbolk.tittel"},
    9: {tittel: "oppsummering.tittel"},
};

export const KortSkjemaHeadings: Record<KortSkjemaPage, {tittel: DigisosLanguageKey}> = {
    1: {tittel: "kontakt.tittel"},
    2: {tittel: "begrunnelsebolk.tittel"},
    3: {tittel: "arbeidOgFamilie.tittel"},
    4: {tittel: "situasjon.kort.tittel"},
    5: {tittel: "oppsummering.tittel"},
};

export const SkjemaSteg = ({children}: {children?: ReactNode | ReactNode[]}) => {
    useEffect(() => {
        scrollToTop();
    }, []);

    const {t} = useTranslation("skjema");

    return (
        <>
            <Link href="#main-content" className="sr-only sr-only-focusable">
                {t("hoppTilHovedinnhold")}
            </Link>
            <VStack
                as={"main"}
                id={"main-content"}
                className={"max-w-3xl w-full mx-auto p-3 py-6 lg:py-16"}
                aria-labelledby={"skjemasteg-title"}
            >
                <SoknadHeader showCode={false} />
                <VStack gap={{xs: "space-32", lg: "space-64"}}>{children}</VStack>
            </VStack>
        </>
    );
};
