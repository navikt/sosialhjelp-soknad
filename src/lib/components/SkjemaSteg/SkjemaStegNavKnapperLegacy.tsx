import * as React from "react";
import {Button, Loader} from "@navikt/ds-react";
import {AvbrytSoknadModal} from "../../modals/AvbrytSoknadModal";
import {useTranslation} from "react-i18next";
import {SkjemaConfig, SkjemaSteg} from "./digisosSkjema";
import {useState} from "react";
import {minSideURL} from "../../config";

interface SkjemaStegNavigasjonProps {
    skjemaConfig: SkjemaConfig;
    steg: SkjemaSteg;
    loading?: boolean;
    gaVidereLabel?: string;
    goToStep: (newStep: number) => void;
    onSend?: () => Promise<void>;
}

export const SkjemaStegNavKnapperLegacy = ({steg, loading, goToStep, onSend}: SkjemaStegNavigasjonProps) => {
    const [avbrytModalOpen, setAvbrytModalOpen] = useState<boolean>(false);
    const [sendSoknadPending, setSendSoknadPending] = useState<boolean>(false);

    const {t} = useTranslation("skjema");

    const forwardInhibited = loading;
    const backwardInhibited = loading || steg.id <= 1;

    return (
        <>
            <AvbrytSoknadModal open={avbrytModalOpen} onClose={() => setAvbrytModalOpen(false)} />
            <div className={"space-y-8 lg:space-y-16 pt-2 md:pt-5 lg:pt-10 pb-8 lg:pb-16"}>
                <div className="space-x-3">
                    <Button
                        variant="secondary"
                        id="gaa_tilbake_button"
                        onClick={() => goToStep(steg.id - 1)}
                        disabled={backwardInhibited}
                    >
                        {t("skjema.knapper.forrige")}
                        {loading && <Loader />}
                    </Button>
                    {steg.type === "skjema" ? (
                        <Button
                            variant="primary"
                            id="gaa_videre_button"
                            onClick={() => goToStep(steg.id + 1)}
                            disabled={forwardInhibited}
                        >
                            {t("skjema.knapper.neste")}
                            {loading && <Loader />}
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            id="send_button"
                            onClick={async () => {
                                if (!onSend) return;
                                setSendSoknadPending(true);
                                await onSend();
                                setSendSoknadPending(false);
                            }}
                            disabled={sendSoknadPending || forwardInhibited}
                        >
                            {t("skjema.knapper.send")}
                            {sendSoknadPending && <Loader className={"ml-2 h-[1em]"} />}
                        </Button>
                    )}
                </div>
                <div>
                    <Button variant="tertiary" onClick={() => (window.location.href = minSideURL)}>
                        {t("avbryt.fortsettsenere")}
                    </Button>
                    <Button variant="tertiary" onClick={() => setAvbrytModalOpen(true)}>
                        {t("avbryt.slett")}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SkjemaStegNavKnapperLegacy;
