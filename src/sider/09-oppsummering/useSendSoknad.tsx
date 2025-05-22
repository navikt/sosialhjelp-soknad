import {useTransition} from "react";
import {useSendSoknad as useSendSoknadMutation} from "../../generated/new/soknad-lifecycle-controller/soknad-lifecycle-controller.ts";
import digisosConfig from "../../lib/config";
import {logAmplitudeEvent} from "../../lib/amplitude/Amplitude.tsx";
import {useAdresser} from "../01-personalia/adresse/useAdresser.tsx";
import {useContextFeatureToggles} from "../../lib/providers/useContextFeatureToggles.ts";
import {useRouter} from "next/navigation";
import {getAttributesForSkjemaFullfortEvent} from "./getAttributesForSkjemaFullfortEvent.tsx";
import {Oppsummering} from "../../generated/model/index.ts";
import {useAnalyticsContext} from "../../lib/providers/useAnalyticsContext.ts";
import {useCurrentSoknadIsKort} from "../../lib/components/SkjemaSteg/useCurrentSoknadIsKort.tsx";
import {useValgtKategoriContext} from "../../lib/providers/KortKategorierContextProvider.tsx";

export const useSendSoknad = (oppsummering?: Oppsummering) => {
    const {brukerAdresse} = useAdresser();
    const router = useRouter();
    const isKortSoknad = useCurrentSoknadIsKort();
    const [isTransitioning, startTransition] = useTransition();
    const {
        analyticsData: {selectedKategorier, situasjonEndret},
    } = useAnalyticsContext();

    const {valgtKategoriData} = useValgtKategoriContext();

    const {mutate, isPending, isError} = useSendSoknadMutation({
        mutation: {
            onSuccess: async ({digisosId}) => {
                await logAmplitudeEvent("skjema fullført", getAttributesForSkjemaFullfortEvent(oppsummering));
                await logAmplitudeEvent("Søknad sendt", {
                    KortSoknad: isKortSoknad ? "Ja" : "Nei",
                    EndrerSokerAdresse: brukerAdresse ? "Ja" : "Nei",
                    kategorier: selectedKategorier?.length ? "Ja" : "Ikke utfylt",
                    valgteKategorier: selectedKategorier?.length ? selectedKategorier : "Ikke utfylt",
                    situasjonEndret: situasjonEndret !== "Ikke utfylt" ? "Ja" : "Ikke utfylt",
                    dokumentKategori: valgtKategoriData ? "Ja" : "Nei",
                });
                const shouldAddParam = featureFlagData?.["sosialhjelp.innsyn.uxsignals_kort_soknad"] && isKortSoknad;
                startTransition(() =>
                    router.push(
                        `${digisosConfig.innsynURL}/${digisosId}/status${shouldAddParam ? "?kortSoknad=true" : ""}`
                    )
                );
            },
        },
    });

    const featureFlagData = useContextFeatureToggles();

    return {
        sendSoknad: mutate,
        isError,
        isPending: isPending || isTransitioning,
        featureFlagData,
        isKortSoknad,
    };
};
