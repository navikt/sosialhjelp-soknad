import * as React from "react";
import {BodyShort, Heading, Link} from "@navikt/ds-react";
import {SystemError} from "@navikt/ds-icons";
import {Trans, useTranslation} from "react-i18next";
import {AppHeader} from "../../lib/components/appHeader/AppHeader";
import {TrengerDuRaskHjelp} from "./TrengerDuRaskHjelp.tsx";

const IkkeFunnet = () => {
    const {t} = useTranslation("skjema");

    return (
        <>
            <AppHeader />
            <div className={"text-center space-y-4 pb-10 bg-[var(--a-surface-danger-subtle)] grow"}>
                <div
                    className={
                        "flex justify-center gap-4 text-[var(--a-text-on-danger)] bg-[var(--a-surface-danger)] p-4"
                    }
                >
                    <SystemError fontSize={"var(--a-font-size-heading-2xlarge)"} />
                    <Heading level="1" size="xlarge">
                        {t("feilside.ikkefunnet.tittel")}
                    </Heading>
                </div>
                <BodyShort spacing>
                    <Trans
                        t={t}
                        i18nKey={"feilside.ikkefunnet.feilmelding"}
                        components={{
                            lenke: <Link href={"/informasjon"}>{null}</Link>,
                        }}
                    />
                </BodyShort>
                <TrengerDuRaskHjelp />
            </div>
        </>
    );
};

export default IkkeFunnet;
