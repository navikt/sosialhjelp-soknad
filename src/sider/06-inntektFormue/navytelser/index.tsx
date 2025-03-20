import * as React from "react";
import {TextPlaceholder} from "../../../lib/components/animasjoner/TextPlaceholder";
import {Alert, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {NavYtelserTable} from "./NavYtelserTable";
import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId";
import {useGetNavYtelse} from "../../../generated/new/nav-ytelse-controller/nav-ytelse-controller.ts";

const useNavYtelser = () => {
    const behandlingsId = useBehandlingsId();
    const {data, isLoading, isError} = useGetNavYtelse(behandlingsId);

    return {systeminntekter: data?.utbetalinger, isError: data?.fetchUtbetalingerFeilet || isError, isLoading};
};

export const NavYtelser = () => {
    const {t} = useTranslation("skjema");
    const {systeminntekter, isError, isLoading} = useNavYtelser();

    if (isLoading) return <TextPlaceholder lines={3} />;
    if (isError) return <Alert variant={"warning"}>{t("utbetalinger.kontaktproblemer")}</Alert>;

    return (
        <div className={"space-y-4"}>
            <Heading size="medium" level="2" spacing>
                {t("navytelser.sporsmal")}
            </Heading>
            <NavYtelserTable systeminntekter={systeminntekter} />
        </div>
    );
};
