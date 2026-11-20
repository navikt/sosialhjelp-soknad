"use client";

import {QueryClientProvider} from "@tanstack/react-query";
import {IToggle} from "@unleash/nextjs";
import {Locale, NextIntlClientProvider} from "next-intl";
import {getQueryClient} from "../api/queryClient";
import {FlagProvider} from "../featuretoggles/context.tsx";

interface Props {
    children: React.ReactNode;
    locale?: Locale;
    toggles: IToggle[];
}

export default function Providers({children, locale, toggles}: Props) {
    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <FlagProvider toggles={toggles}>
                <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
            </FlagProvider>
        </QueryClientProvider>
    );
}
