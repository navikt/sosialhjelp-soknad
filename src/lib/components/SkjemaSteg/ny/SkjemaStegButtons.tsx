import * as React from "react";
import {useState} from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {DigisosValidationError, KortSkjemaPage, SkjemaPage} from "./SkjemaSteg";
import {DigisosLanguageKey} from "../../../i18n";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {scrollToTop} from "../../../utils";
import {logWarning} from "../../../log/loggerUtils.ts";
import {useSkjemaNavigation} from "../useSkjemaNavigation.ts";
import {SkjemaStegCancelButtons} from "./SkjemaStegCancelButtons.tsx";

interface SkjemaStegNavigasjonProps {
    loading?: boolean;
    onConfirm?: () => Promise<void>;
    confirmTextKey?: DigisosLanguageKey;
    includeNextArrow?: boolean;
    page: SkjemaPage | KortSkjemaPage;
    onRequestNavigation?: () => Promise<unknown>;
}

export const SkjemaStegButtons = ({
    loading,
    onConfirm,
    confirmTextKey = "skjema.knapper.neste",
    includeNextArrow,
    page,
    onRequestNavigation,
}: SkjemaStegNavigasjonProps) => {
    const {t} = useTranslation("skjema");
    const [sendSoknadPending, setSendSoknadPending] = useState<boolean>(false);
    const {gotoPage} = useSkjemaNavigation(page);

    const requestNavigation = async (page: number) => {
        if (onConfirm) {
            setSendSoknadPending(true);
            await onConfirm();
            setSendSoknadPending(false);
        }

        try {
            if (onRequestNavigation !== undefined) await onRequestNavigation();
            gotoPage(page);
        } catch (e: any) {
            scrollToTop();
            if (!(e instanceof DigisosValidationError)) await logWarning(`Nektet navigering: ${e}`);
        }
    };

    return (
        <div>
            <div className={"!mt-12 md:!mt-16 lg:!mt-24 !mb-8 lg:!mb-16 space-x-3"}>
                <Button
                    variant="secondary"
                    onClick={async () => await requestNavigation(page - 1)}
                    disabled={loading || page <= 1}
                >
                    {t("skjema.knapper.forrige")}
                    {loading && <Loader className={"ml-2"} />}
                </Button>
                <Button
                    variant="primary"
                    onClick={async () => await requestNavigation(page + 1)}
                    disabled={sendSoknadPending || loading}
                    icon={includeNextArrow && <ArrowRightIcon />}
                    iconPosition={"right"}
                >
                    {t(confirmTextKey)}
                    {(sendSoknadPending || loading) && <Loader className={"ml-2"} />}
                </Button>
            </div>
            <SkjemaStegCancelButtons />
        </div>
    );
};
