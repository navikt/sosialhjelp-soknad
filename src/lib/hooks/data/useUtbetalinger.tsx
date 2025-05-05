import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
    useGetUtbetalinger,
    useUpdateUtbetalinger,
} from "../../../generated/new/utbetaling-controller/utbetaling-controller.ts";
import {HarUtbetalingerInput, UpdateUtbetalingerBody, UtbetalingerDto} from "../../../generated/new/model";
import {CHECKBOX_VALUES} from "../../../sider/06-inntektFormue/Utbetalinger.tsx";
import {useEffect, useState} from "react";

const merge = (data?: UtbetalingerDto, variables?: UpdateUtbetalingerBody): UtbetalingerDto | undefined => {
    if (!variables || !data) {
        return;
    }
    if (variables?.type === "HarIkkeUtbetalingerInput") {
        return {...data, hasBekreftelse: false};
    }
    return {
        beskrivelseUtbetaling: variables.beskrivelseUtbetaling,
        hasAnnenUtbetaling: variables.hasAnnet,
        hasBekreftelse: true,
        hasForsikring: variables.hasForsikring,
        hasSalg: variables.hasSalg,
        hasUtbytte: variables.hasUtbytte,
        utbetalingerFraNavFeilet: data?.utbetalingerFraNavFeilet,
    };
};

export const useUtbetalinger = () => {
    const soknadId = useSoknadId();
    const queryClient = useQueryClient();
    const {data: utbetalinger, queryKey} = useGetUtbetalinger(soknadId);
    const {mutate, variables, isPending} = useUpdateUtbetalinger({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });
    const [harBekreftelse, setHarBekreftelse] = useState<boolean | null>(null);
    useEffect(() => {
        setHarBekreftelse(utbetalinger?.hasBekreftelse ?? null);
    }, [utbetalinger?.hasBekreftelse]);

    const valgteKategorier = isPending ? merge(utbetalinger, variables?.data) : utbetalinger;

    const setUtbetalinger = async (valg: typeof CHECKBOX_VALUES) => {
        if (!valgteKategorier) return;

        const oppdatert: HarUtbetalingerInput = {
            type: "HarUtbetalingerInput",
            ...valgteKategorier,
            hasUtbytte: valg.includes("utbytte"),
            hasSalg: valg.includes("salg"),
            hasForsikring: valg.includes("forsikring"),
            hasAnnet: valg.includes("annet"),
            beskrivelseUtbetaling: valg.includes("annet") ? valgteKategorier.beskrivelseUtbetaling : "",
        };

        mutate({soknadId, data: oppdatert});
    };

    const setBeskrivelseAvAnnet = async (beskrivelseAvAnnet: string) => {
        if (!valgteKategorier) return;
        const oppdatert: HarUtbetalingerInput = {
            type: "HarUtbetalingerInput",
            ...valgteKategorier,
            beskrivelseUtbetaling: beskrivelseAvAnnet,
            hasAnnet: valgteKategorier.hasAnnenUtbetaling,
        };
        mutate({soknadId, data: oppdatert});
    };

    return {utbetalinger: valgteKategorier, setUtbetalinger, setBeskrivelseAvAnnet, harBekreftelse};
};
