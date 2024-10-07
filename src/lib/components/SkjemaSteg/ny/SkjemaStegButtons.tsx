import * as React from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {DigisosValidationError, KortSkjemaPage, SkjemaPage} from "./SkjemaSteg";
import {useState} from "react";
import digisosConfig from "../../../config";
import {AvbrytSoknadModal} from "../../modals/AvbrytSoknadModal";
import {NavEnhetInaktiv} from "../../../../sider/01-personalia/adresse/NavEnhetInaktiv";
import {logAmplitudeEvent} from "../../../amplitude/Amplitude";
import {DigisosLanguageKey} from "../../../i18n";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {scrollToTop} from "../../../utils";
import {logWarning} from "../../../log/loggerUtils.ts";
import {useSkjemaNavigation} from "../useSkjemaNavigation.ts";

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
    const [avbrytModalOpen, setAvbrytModalOpen] = useState<boolean>(false);

    const {t} = useTranslation("skjema");
    const [sendSoknadPending, setSendSoknadPending] = useState<boolean>(false);
    const {gotoPage} = useSkjemaNavigation(page);

    const requestNavigation = async (page: number) => {
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
            {page !== 9 && <NavEnhetInaktiv />}
            <AvbrytSoknadModal open={avbrytModalOpen} onClose={() => setAvbrytModalOpen(false)} />
            <div className={"!mt-12 md:!mt-16 lg:!mt-24 !mb-8 lg:!mb-16 space-x-3"}>
                <Button
                    variant="secondary"
                    id="gaa_tilbake_button"
                    onClick={async () => {
                        await requestNavigation(page - 1);
                    }}
                    disabled={loading || page <= 1}
                >
                    {t("skjema.knapper.forrige")}
                    {loading && <Loader className={"ml-2"} />}
                </Button>
                <Button
                    variant="primary"
                    id="gaa_videre_button"
                    onClick={async () => {
                        if (onConfirm) {
                            setSendSoknadPending(true);
                            await onConfirm();
                            setSendSoknadPending(false);
                        }
                        return requestNavigation(page + 1);
                    }}
                    disabled={sendSoknadPending || loading}
                    icon={includeNextArrow && <ArrowRightIcon />}
                    iconPosition={"right"}
                >
                    {t(confirmTextKey)}
                    {(sendSoknadPending || loading) && <Loader className={"ml-2"} />}
                </Button>
            </div>
            <div className={"pb-8 lg:pb-16"}>
                <Button
                    variant="tertiary"
                    onClick={async () => {
                        await logAmplitudeEvent("Klikk på fortsett senere", {SoknadVersjon: "Standard"});
                        window.location.href = digisosConfig.minSideURL;
                    }}
                >
                    {t("avbryt.fortsettsenere")}
                </Button>
                <Button variant="tertiary" onClick={() => setAvbrytModalOpen(true)}>
                    {t("avbryt.slett")}
                </Button>
            </div>
        </div>
    );
};
