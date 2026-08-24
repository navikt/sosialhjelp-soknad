import {useRef, useTransition} from "react";
import {useSendSoknad as useSendSoknadMutation} from "../../generated/new/soknad-lifecycle-controller/soknad-lifecycle-controller.ts";
import digisosConfig from "../../lib/config";
import {useRouter} from "next/navigation";
import {useCurrentSoknadIsKort} from "../../lib/components/SkjemaSteg/useCurrentSoknadIsKort.tsx";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {umamiTrack} from "../../app/umami.ts";
import {useLocale} from "next-intl";

export const useSendSoknad = () => {
    const router = useRouter();
    const isKortSoknad = useCurrentSoknadIsKort();
    const [isTransitioning, startTransition] = useTransition();

    const deletionDateRef = useRef("");
    const soknadId = useSoknadId();

    const locale = useLocale();

    const {mutate, isPending, error} = useSendSoknadMutation({
        mutation: {
            onSuccess: async ({digisosId}) => {
                umamiTrack("Skjema fullført", {
                    steg: isKortSoknad ? "5" : "9",
                    isKortSoknad: isKortSoknad,
                    soknadId: soknadId,
                });
                startTransition(() => router.push(`${digisosConfig.innsynURL}/${locale}/soknad/${digisosId}`));
                deletionDateRef.current = "";
            },
        },
    });

    return {
        sendSoknad: mutate,
        isPending: isPending || isTransitioning,
        isKortSoknad,
        error,
    };
};
