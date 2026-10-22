import * as React from "react";
import {TextPlaceholder} from "../../../lib/components/animasjoner/TextPlaceholder";
import {Alert, Heading, InlineMessage} from "@navikt/ds-react";
import {NavYtelserTable} from "./NavYtelserTable";
import {useSoknadId} from "../../../lib/hooks/common/useSoknadId.ts";
import {useGetNavYtelse} from "../../../generated";
import {useTranslations} from "next-intl";

const useNavYtelser = () => {
    const soknadId = useSoknadId();
    const {data, isLoading, isError} = useGetNavYtelse(soknadId);

    return {systeminntekter: data?.utbetalinger, isError: data?.fetchUtbetalingerFeilet || isError, isLoading};
};
interface Props {
    isKortSoknad?: boolean;
}

export const NavYtelser = ({isKortSoknad = false}: Props) => {
    const t = useTranslations("NavYtelser");
    const {systeminntekter, isError, isLoading} = useNavYtelser();

    // if (isLoading) return <TextPlaceholder lines={3} />;
    // if (isError) return <Alert variant={"warning"}>{t("error")}</Alert>;

    let innhold: React.ReactNode;

    if (isLoading) {
        innhold = <TextPlaceholder lines={3} />;
    } else if (isError) {
        innhold = <Alert variant="warning">{t("error")}</Alert>;
    } else {
        innhold = (
            <div className="bg-ax-bg-info-moderate border-l-ax-bg-info-strong p-4 space-y-4 rounded-md">
                {systeminntekter?.length ? (
                    <NavYtelserTable navUtbetalinger={systeminntekter} />
                ) : (
                    <InlineMessage status="info" size="medium">
                        {t("empty")}
                    </InlineMessage>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <Heading size={isKortSoknad ? "small" : "medium"} level={isKortSoknad ? "3" : "2"} spacing>
                {t("heading")}
            </Heading>
            {innhold}
        </div>
    );
};
