import * as React from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {SkjemaTrinn} from "./SkjemaSteg";
import {minSideUrl} from "../../avbrytsoknad/AvbrytSoknadModal";
import {visAvbrytSoknadModal} from "../../../../digisos/redux/soknad/soknadActions";

interface SkjemaStegNavigasjonProps {
    steg: SkjemaTrinn;
    loading?: boolean;
    goToStep: (newStep: number) => Promise<void>;
}

export const SkjemaButtons = ({steg, loading, goToStep}: SkjemaStegNavigasjonProps) => {
    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");

    return (
        <div className={"space-y-8 lg:space-y-16 pt-2 md:pt-5 lg:pt-10 pb-8 lg:pb-16"}>
            <div className="space-x-3">
                <Button
                    variant="secondary"
                    id="gaa_tilbake_button"
                    onClick={async () => await goToStep(steg - 1)}
                    disabled={loading || steg <= 1}
                >
                    {t("skjema.knapper.forrige")}
                    {loading && <Loader className={"ml-2"} />}
                </Button>
                <Button
                    variant="primary"
                    id="gaa_videre_button"
                    onClick={async () => await goToStep(steg + 1)}
                    disabled={loading}
                >
                    {t("skjema.knapper.neste")}
                    {loading && <Loader className={"ml-2"} />}
                </Button>
            </div>
            <div>
                <Button variant="tertiary" onClick={() => (window.location.href = minSideUrl)}>
                    {t("avbryt.fortsettsenere")}
                </Button>
                <Button variant="tertiary" onClick={() => dispatch(visAvbrytSoknadModal())}>
                    {t("avbryt.slett")}
                </Button>
            </div>
        </div>
    );
};
