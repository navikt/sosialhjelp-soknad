"use client";
import {redirect} from "next/navigation";
import NySoknadInnhold from "./NySoknadInnhold";
import StartSoknadKnapp from "./StartSoknadKnapp";
import {useConfigFeatureFlags} from "../../../../lib/config";
import {SoknadSide} from "../../../../components/SoknadSide";

const Page = () => {
    const featureToggles = useConfigFeatureFlags();
    if (!featureToggles.nyIntroside) {
        redirect("/");
    }

    return (
        <SoknadSide>
            <NySoknadInnhold />
            <StartSoknadKnapp />
        </SoknadSide>
    );
};

export default Page;
