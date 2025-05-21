import * as React from "react";
import {TextPlaceholder} from "../../../lib/components/animasjoner/TextPlaceholder";
import {Alert, BodyShort, Heading} from "@navikt/ds-react";
import {NavYtelserTable} from "./NavYtelserTable";
import {useSoknadId} from "../../../lib/hooks/common/useSoknadId.ts";
import {useGetNavYtelse} from "../../../generated/new/nav-ytelse-controller/nav-ytelse-controller.ts";
import {useTranslations} from "next-intl";

const useNavYtelser = () => {
    const soknadId = useSoknadId();
    const {data, isLoading, isError} = useGetNavYtelse(soknadId);

    return {systeminntekter: data?.utbetalinger, isError: data?.fetchUtbetalingerFeilet || isError, isLoading};
};

export const NavYtelser = () => {
    const t = useTranslations("NavYtelser");
    const {systeminntekter, isError, isLoading} = useNavYtelser();

    if (isLoading) return <TextPlaceholder lines={3} />;
    if (isError) return <Alert variant={"warning"}>{t("error")}</Alert>;

    return (
        <div className={"space-y-4"}>
            <Heading size="medium" level="2" spacing>
                {t("heading")}
            </Heading>
            {!systeminntekter?.length ? (
                <BodyShort>{t("empty")}</BodyShort>
            ) : (
                <div className={"bg-lightblue-50 border-l-[var(--a-surface-info)] p-4 space-y-4 rounded-md"}>
                    <NavYtelserTable navUtbetalinger={systeminntekter} />
                </div>
            )}
        </div>
    );
};
