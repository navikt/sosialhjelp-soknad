"use client";
import {redirect} from "next/navigation";
import NySoknadInnhold from "./NySoknadInnhold";
import StartSoknadKnapp from "./StartSoknadKnapp";
import {useFlag} from "../../../../featuretoggles/context";
import {SoknadSide} from "../../../../components/SoknadSide";

const Page = () => {
    const nyIntroside = useFlag("sosialhjelp.soknad.nyIntroside").enabled;
    if (!nyIntroside) {
        redirect("/");
    }

    return (
        <SoknadSide showCode={true}>
            <NySoknadInnhold />
            <StartSoknadKnapp />
        </SoknadSide>
    );
};

export default Page;
