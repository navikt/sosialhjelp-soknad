import {createSoknad as createSoknadNewApi} from "../../../generated/new/soknad-lifecycle-controller/soknad-lifecycle-controller.ts";
import {opprettSoknad} from "../../../generated/soknad-ressurs/soknad-ressurs.ts";
import {useContextFeatureToggles} from "../../../lib/providers/useContextFeatureToggles.ts";

export const useCreateSoknad = () => {
    const featureToggles = useContextFeatureToggles();
    const isNyttApiEnabled = featureToggles["sosialhjelp.soknad.nytt-api"] ?? false;

    const createSoknad = async (soknadstype: "kort" | "standard" | undefined): Promise<{soknadId: string}> =>
        isNyttApiEnabled
            ? await createSoknadNewApi({soknadstype})
            : {soknadId: (await opprettSoknad({soknadstype})).brukerBehandlingId};

    return {createSoknad};
};
