import * as React from "react";
import {useContext, useEffect} from "react";
import Feiloppsummering from "../Feiloppsummering";
import {useTitle} from "../../hooks/common/useTitle";
import {Link} from "@navikt/ds-react";
import {NedetidPanel} from "../NedetidPanel";
import {DigisosSkjemaStegKey, SkjemaConfig} from "./digisosSkjema";
import {useSkjemaNavigation} from "./useSkjemaNavigation";
import SkjemaStegNavKnapperLegacy from "./SkjemaStegNavKnapperLegacy";
import {useTranslation} from "react-i18next";
import {useHentNedetidInformasjon} from "../../../generated/nedetid-ressurs/nedetid-ressurs";
import {t} from "i18next";
import {AppHeader} from "../appHeader/AppHeader";
import {scrollToTop} from "../../utils";

import {ValideringsContext, ValideringsContextProvider} from "../../valideringContextProvider";
import {NavEnhetInaktiv} from "../../../sider/01-personalia/adresse/NavEnhetInaktiv";
import {RequireXsrfCookie} from "./ny/RequireXsrfCookie";
import {SkjemaStegTitle} from "./ny/SkjemaStegTitle.tsx";
import {SkjemaStegStepper} from "./ny/SkjemaStegStepper.tsx";

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
        stegTittel: t(`${steg}.tittel`),
        documentTitle: t(skjemaConfig.tittelId),
        aktivtSteg: skjemaConfig.steg[steg],
    };
};

/**
 * En liten hack for å flytte ValideringsContext ut av rot-noden til App
 * @see SkjemaStegLegacyInner
 */
export const SkjemaStegLegacy = (props: StegMedNavigasjonProps) => (
    <ValideringsContextProvider>
        <SkjemaStegLegacyInner {...props} />
    </ValideringsContextProvider>
);

const SkjemaStegLegacyInner = ({skjemaConfig, steg, ikon, children, onSend}: StegMedNavigasjonProps) => {
    const {data: nedetid} = useHentNedetidInformasjon();

    const {
        state: {feil, visValideringsfeil},
    } = useContext(ValideringsContext);

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
                    <NedetidPanel varselType={"infoside"} />
                    {visValideringsfeil && <Feiloppsummering valideringsfeil={feil} />}
                    <div className={"bg-white mx-auto rounded-2xl px-4 md:px-12 lg:px-24 space-y-8 pt-8"}>
                        <SkjemaStegTitle icon={ikon} title={stegTittel} />
                        <main id="main-content" className={"space-y-12 lg:space-y-24"}>
                            {children}
                        </main>
                        {aktivtSteg.id !== 1 && !(aktivtSteg.id === 9 && nedetid?.isNedetid) && <NavEnhetInaktiv />}
                        <SkjemaStegNavKnapperLegacy
                            skjemaConfig={skjemaConfig}
                            steg={skjemaConfig.steg[steg]}
                            goToStep={gotoPage}
                            onSend={onSend}
                        />
                    </div>
                </div>
            </div>
        </RequireXsrfCookie>
    );
};
