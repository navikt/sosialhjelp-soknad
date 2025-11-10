import {useRef, useTransition} from "react";
import {useSendSoknad as useSendSoknadMutation} from "../../generated/new/soknad-lifecycle-controller/soknad-lifecycle-controller.ts";
import digisosConfig from "../../lib/config";
import {useContextFeatureToggles} from "../../lib/providers/useContextFeatureToggles.ts";
import {useRouter} from "next/navigation";
import {useCurrentSoknadIsKort} from "../../lib/components/SkjemaSteg/useCurrentSoknadIsKort.tsx";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {umamiTrack} from "../../app/umami.ts";

export const useSendSoknad = () => {
    const router = useRouter();
    const isKortSoknad = useCurrentSoknadIsKort();
    const [isTransitioning, startTransition] = useTransition();

    const deletionDateRef = useRef("");
    const soknadId = useSoknadId();

    const {mutate, isPending, error} = useSendSoknadMutation({
        mutation: {
            onSuccess: async ({digisosId}) => {
                umamiTrack("Skjema fullført", {
                    steg: isKortSoknad ? "5" : "9",
                    isKortSoknad: isKortSoknad,
                    soknadId: soknadId,
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
