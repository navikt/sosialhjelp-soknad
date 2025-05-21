import * as React from "react";
import {SystemError} from "@navikt/ds-icons";
import {BodyShort, Button, Heading} from "@navikt/ds-react";
import {useTranslations} from "next-intl";
import {ErrorPageColumnarLayout} from "./ErrorPageColumnarLayout.tsx";
import {ErrorDump} from "./ErrorDump.tsx";

export const TekniskFeil = ({error, reset}: {error: Error; reset?: () => void}) => {
    const t = useTranslations("TekniskFeil");

    return (
        <ErrorPageColumnarLayout leftMargin={<SystemError className={"text-[var(--a-surface-danger)] w-20 h-20"} />}>
            <Heading level="1" size="xlarge" spacing>
                {t("title")}
            </Heading>

            <Heading level={"2"} size={"large"} spacing>
                {t("feilmelding")}
            </Heading>

            <Heading level={"2"} size={"medium"} spacing>
                {t("anbefaling")}
            </Heading>

            {reset && (
                <div className={"my-4"}>
                    <Button variant="secondary" onClick={reset}>
                        Reset
                    </Button>
                </div>
            )}

            <div className={"my-4"}>
                <Button variant="secondary" onClick={() => (window.location.href = "/sosialhjelp/soknad")}>
                    {t("lenkeTilHovedmeny")}
                </Button>
            </div>
            <BodyShort spacing>{t("problemetErLogget")}</BodyShort>
            {["localhost", "dev-fss", "dev-gcp"].includes(process.env.NEXT_PUBLIC_DIGISOS_ENV!) && error && (
                <ErrorDump error={error} />
            )}
        </ErrorPageColumnarLayout>
    );
};
export default TekniskFeil;
