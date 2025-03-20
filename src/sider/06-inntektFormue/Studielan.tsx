import * as React from "react";
import {Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {YesNoInput} from "../../lib/components/form/YesNoInput";
import {SkalIkkeFinansiereStudier} from "./SkalIkkeFinansiereStudier";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useGetHasStudielan, useUpdateStudielan} from "../../generated/new/studielan-controller/studielan-controller.ts";
import {useQueryClient} from "@tanstack/react-query";
import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder.tsx";

export const Studielan = () => {
    const {t} = useTranslation("skjema");

    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: studielan, queryKey, isLoading} = useGetHasStudielan(behandlingsId);
    const {mutate, variables, isPending} = useUpdateStudielan({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });

    if (isLoading) {
        <div className="space-y-4">
            <Heading size="medium" level="2">
                {t("inntekt.studielan.tittel")}
            </Heading>
            <TextPlaceholder />
        </div>;
    }

    if (!studielan?.erStudent) return null;

    const mottarStudielan = isPending ? variables.data?.mottarStudielan : studielan.mottarStudielan;

    return (
        <div className="space-y-4">
            <Heading size="medium" level="2">
                {t("inntekt.studielan.tittel")}
            </Heading>
            <YesNoInput
                name={"studielan-bekreftelse"}
                legend={t("inntekt.studielan.sporsmal")}
                onChange={(checked) => mutate({soknadId: behandlingsId, data: {mottarStudielan: checked}})}
                value={mottarStudielan}
            />
            {mottarStudielan === true && <SkalIkkeFinansiereStudier />}
        </div>
    );
};
