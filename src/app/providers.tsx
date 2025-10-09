"use client";

import {QueryClientProvider} from "@tanstack/react-query";
import {Locale, NextIntlClientProvider} from "next-intl";
import {getQueryClient} from "../api/queryClient";

interface Props {
    children: React.ReactNode;
    locale?: Locale;
}

export default function Providers({children, locale}: Props) {
    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
        </QueryClientProvider>
    );
}
