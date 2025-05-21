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
import {AxiosError, isAxiosError} from "axios";
import {InnsendingFeiletError} from "../../generated/new/model";

export const useSendSoknad = (oppsummering?: Oppsummering) => {
    const {brukerAdresse} = useAdresser();
    const router = useRouter();
    const isKortSoknad = useCurrentSoknadIsKort();
    const [isTransitioning, startTransition] = useTransition();
    const {
        analyticsData: {selectedKategorier, situasjonEndret},
    } = useAnalyticsContext();
    const deletionDateRef = useRef("");

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
                });
                const shouldAddParam = featureFlagData?.["sosialhjelp.innsyn.uxsignals_kort_soknad"] && isKortSoknad;
                startTransition(() =>
                    router.push(
                        `${digisosConfig.innsynURL}/${digisosId}/status${shouldAddParam ? "?kortSoknad=true" : ""}`
                    )
                );
                deletionDateRef.current = "";
            },
            // TODO compileren mener 'error' skal være en 4 typer, men det er i realiteten en AxiosError
            onError: async (error) => {
                if (isAxiosError(error)) {
                    const axiosError = error as AxiosError;
                    const responseBody = axiosError.response!.data! as InnsendingFeiletError;
                    deletionDateRef.current = responseBody.deletionDate;
                }
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
        deletionDateRef,
    };
};
