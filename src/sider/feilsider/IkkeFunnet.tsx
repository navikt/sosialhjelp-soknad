import * as React from "react";
import {Heading, Link} from "@navikt/ds-react";
import {SystemError} from "@navikt/ds-icons";
import {TrengerDuRaskHjelp} from "./TrengerDuRaskHjelp.tsx";
import {ErrorPageColumnarLayout} from "./ErrorPageColumnarLayout.tsx";
import {useTranslations} from "next-intl";

const IkkeFunnet = () => {
    const tN = useTranslations("IkkeFunnet");
    return (
        <section className={"bg-white grow flex flex-col"}>
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
                <Link href={"/sosialhjelp/soknad"}>{tN("lenkeTilHovedmeny")}</Link>
            </ErrorPageColumnarLayout>
            <TrengerDuRaskHjelp />
        </section>
    );
};

export default IkkeFunnet;
