"use client";
import {redirect} from "next/navigation";
import NySoknadInnhold from "./NySoknadInnhold";
import StartSoknadKnapp from "./StartSoknadKnapp";
import {useConfigFeatureFlags} from "../../../../lib/config";
import {SoknadHeader} from "../../../../lib/components/SoknadHeader";

const Page = () => {
    const featureToggles = useConfigFeatureFlags();
    if (!featureToggles.nyIntroside) {
        redirect("/");
    }

    return (
        <main className="max-w-lg lg:max-w-xl w-full mx-auto gap-8 p-3 py-6 lg:gap-16 lg:py-16 flex flex-col grow">
            <SoknadHeader />
            <NySoknadInnhold />
            <StartSoknadKnapp />
        </main>
    );
};

export default Page;
