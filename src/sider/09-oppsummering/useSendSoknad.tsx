import {useRef, useTransition} from "react";
import {useSendSoknad as useSendSoknadMutation} from "../../generated/new/soknad-lifecycle-controller/soknad-lifecycle-controller.ts";
import digisosConfig from "../../lib/config";
import {logAmplitudeEvent} from "../../lib/amplitude/Amplitude.tsx";
import {useAdresser} from "../01-personalia/adresse/useAdresser.tsx";
import {useContextFeatureToggles} from "../../lib/providers/useContextFeatureToggles.ts";
import {useRouter} from "next/navigation";
import {getAttributesForSkjemaFullfortEvent} from "./getAttributesForSkjemaFullfortEvent.tsx";
import {Oppsummering} from "../../generated/model";
import {useAnalyticsContext} from "../../lib/providers/useAnalyticsContext.ts";
import {useCurrentSoknadIsKort} from "../../lib/components/SkjemaSteg/useCurrentSoknadIsKort.tsx";

export const useSendSoknad = (oppsummering?: Oppsummering) => {
    const {brukerAdresse} = useAdresser();
    const router = useRouter();
    const isKortSoknad = useCurrentSoknadIsKort();
    const [isTransitioning, startTransition] = useTransition();
    const {
        analyticsData: {selectedKategorier, situasjonEndret},
    } = useAnalyticsContext();
    const deletionDateRef = useRef("");

    const {mutate, isPending, error} = useSendSoknadMutation({
        mutation: {
            onSuccess: async ({digisosId}) => {
                await logAmplitudeEvent("skjema fullført", getAttributesForSkjemaFullfortEvent(oppsummering));
                window.umami.track("Skjema fullført", {
                    steg: isKortSoknad ? "5" : "9",
                    isKortSoknad: isKortSoknad,
                });
                await logAmplitudeEvent("Søknad sendt", {
                    KortSoknad: isKortSoknad ? "Ja" : "Nei",
                    EndrerSokerAdresse: brukerAdresse ? "Ja" : "Nei",
                    kategorier: selectedKategorier?.length ? "Ja" : "Ikke utfylt",
                    valgteKategorier: selectedKategorier?.length ? selectedKategorier : "Ikke utfylt",
                    situasjonEndret: situasjonEndret !== "Ikke utfylt" ? "Ja" : "Ikke utfylt",
                });
                const shouldAddParam = featureFlagData?.["sosialhjelp.innsyn.uxsignals_kort_soknad"] && isKortSoknad;
                startTransition(() =>
                    router.push(
                        `${digisosConfig.innsynURL}/${digisosId}/status${shouldAddParam ? "?kortSoknad=true" : ""}`
                    )
                );
                deletionDateRef.current = "";
            },
        },
    });

    const featureFlagData = useContextFeatureToggles();

    return {
        sendSoknad: mutate,
        isPending: isPending || isTransitioning,
        featureFlagData,
        isKortSoknad,
        error,
    };
};
