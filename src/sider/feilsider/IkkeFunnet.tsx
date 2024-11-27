import * as React from "react";
import {Button, Heading} from "@navikt/ds-react";
import {SystemError} from "@navikt/ds-icons";
import {AppHeader} from "../../lib/components/appHeader/AppHeader";
import {TrengerDuRaskHjelp} from "./TrengerDuRaskHjelp.tsx";
import {ErrorPageColumnarLayout} from "./ErrorPageColumnarLayout.tsx";
import {useTranslations} from "next-intl";

const IkkeFunnet = () => {
    const tN = useTranslations("IkkeFunnet");
    return (
        <section className={"bg-white grow flex flex-col"}>
            <AppHeader />
            <ErrorPageColumnarLayout
                leftMargin={<SystemError className={"text-[var(--a-surface-danger)] w-20 h-20"} />}
                className={"lg:py-8"}
            >
                <Heading level="1" size="xlarge" spacing>
                    {tN("title")}
                </Heading>
                <Heading level="2" size={"small"} spacing>
                    {tN("feilmelding")}
                </Heading>
                <div className={"my-4"}>
                    <Button variant="secondary" onClick={() => (window.location.href = "/sosialhjelp/soknad")}>
                        {tN("lenkeTilHovedmeny")}
                    </Button>
                </div>
            </ErrorPageColumnarLayout>
            <TrengerDuRaskHjelp />
        </section>
    );
};

export default IkkeFunnet;
