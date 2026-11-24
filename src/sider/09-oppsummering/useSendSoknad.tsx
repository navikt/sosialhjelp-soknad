import {useRef, useTransition} from "react";
import {useSendSoknad as useSendSoknadMutation} from "../../generated";
import {useRouter} from "../../i18n/routing.ts";
import {useCurrentSoknadIsKort} from "../../lib/components/SkjemaSteg/useCurrentSoknadIsKort.tsx";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {umamiTrack} from "../../app/umami.ts";
import {digisosConfig} from "../../lib/config.ts";
import {useFlag} from "../../featuretoggles/context.tsx";
import {useLocale} from "next-intl";

export const useSendSoknad = () => {
    const router = useRouter();
    const isKortSoknad = useCurrentSoknadIsKort();
    const [isTransitioning, startTransition] = useTransition();

    const deletionDateRef = useRef("");
    const soknadId = useSoknadId();

    const visKvittering = useFlag("sosialhjelp.soknad.kvittering").enabled;
    const locale = useLocale();

    const {mutate, isPending, error} = useSendSoknadMutation({
        mutation: {
            onSuccess: async ({digisosId}) => {
                umamiTrack("Skjema fullført", {
                    steg: isKortSoknad ? "5" : "9",
                    isKortSoknad: isKortSoknad,
                    soknadId: soknadId,
                });
                const href = visKvittering
                    ? `/kvittering/${encodeURIComponent(digisosId)}`
                    : `${digisosConfig.innsynURL}/${locale}/soknad/${encodeURIComponent(digisosId)}`;
                startTransition(() => router.push(href));
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
