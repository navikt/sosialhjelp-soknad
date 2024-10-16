import * as React from "react";
import {useEffect} from "react";
import Feiloppsummering from "../Feiloppsummering";
import {useTitle} from "../../hooks/common/useTitle";
import {Link} from "@navikt/ds-react";
import {DigisosSkjemaStegKey, SkjemaConfig} from "./digisosSkjema";
import {useSkjemaNavigation} from "./useSkjemaNavigation";
import {useTranslation} from "react-i18next";
import {t} from "i18next";
import {AppHeader} from "../appHeader/AppHeader";
import {scrollToTop} from "../../utils";
import {ValideringsContextProvider} from "../../valideringContextProvider";
import {RequireXsrfCookie} from "./ny/RequireXsrfCookie";
import {SkjemaStegTitle} from "./ny/SkjemaStegTitle.tsx";
import {SkjemaStegStepper} from "./ny/SkjemaStegStepper.tsx";
import {SkjemaStegButtons} from "./ny/SkjemaStegButtons.tsx";

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
        stegTittel: t(`${steg}.tittel`),
        documentTitle: t(skjemaConfig.tittelId),
        aktivtSteg: skjemaConfig.steg[steg],
    };
};

export const SkjemaStegLegacy = (props: StegMedNavigasjonProps) => (
    <ValideringsContextProvider>
        <SkjemaStegLegacyInner {...props} />
    </ValideringsContextProvider>
);

const SkjemaStegLegacyInner = ({skjemaConfig, steg, ikon, children}: StegMedNavigasjonProps) => {
    const {stegTittel, documentTitle, aktivtSteg} = useSkjemaConfig(skjemaConfig, steg);
    const {gotoPage} = useSkjemaNavigation(aktivtSteg.id);

    useEffect(() => {
        scrollToTop();
    }, []);

    useTitle(`${stegTittel} - ${documentTitle}`);

    return (
        <RequireXsrfCookie>
            <div className="pb-4 lg:pb-40 gap-10 flex flex-col bg-digisosGronnBakgrunn">
                <Link href="#main-content" className="sr-only sr-only-focusable">
                    {t("hoppTilHovedinnhold")}
                </Link>
                <AppHeader />
                <SkjemaStegStepper page={aktivtSteg.id} onStepChange={async (page) => gotoPage(page)} />
                <div className={"w-full max-w-3xl mx-auto"}>
                    <Feiloppsummering />
                    <div className={"bg-white mx-auto rounded-2xl px-4 md:px-12 lg:px-24 space-y-8 pt-8"}>
                        <SkjemaStegTitle icon={ikon} title={stegTittel} />
                        <main id="main-content" className={"space-y-12 lg:space-y-24"}>
                            {children}
                        </main>
                        {/**
                            Note that this only works because the remaining users of SkjemaStegLegacy
                             are all in the middle of the application, so we don't need to handle
                             disabling the back button, nor next/send differentiation.
                         */}
                        <SkjemaStegButtons
                            onNext={async () => gotoPage(aktivtSteg.id + 1)}
                            onPrevious={async () => gotoPage(aktivtSteg.id - 1)}
                        />
                    </div>
                </div>
            </div>
        </RequireXsrfCookie>
    );
};
