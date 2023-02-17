import * as React from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {SkjemaStegContext} from "./SkjemaSteg";
import {minSideUrl} from "../../avbrytsoknad/AvbrytSoknadModal";
import {visAvbrytSoknadModal} from "../../../../digisos/redux/soknad/soknadActions";
import {useContext} from "react";
import {logError} from "../../../utils/loggerUtils";
import {MidlertidigDeaktivertPanel} from "../MidlertidigDeaktivertPanel";
import {IkkePakobletPanel} from "../IkkePakobletPanel";

interface SkjemaStegNavigasjonProps {
    loading?: boolean;
}

export const SkjemaStegButtons = ({loading}: SkjemaStegNavigasjonProps) => {
    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");
    const context = useContext(SkjemaStegContext);

    if (context === null) {
        logError("<SkjemaSteg.Buttons/> must be used inside <SkjemaSteg.Container />");
        return null;
    }

    const {page, requestNavigation} = context;

    return (
        <div className={"space-y-8 lg:space-y-16 pt-2 md:pt-5 lg:pt-10 pb-8 lg:pb-16"}>
            {page !== 9 && (
                <>
                    <MidlertidigDeaktivertPanel />
                    <IkkePakobletPanel />
                </>
            )}
            <div className="space-x-3">
                <Button
                    variant="secondary"
                    id="gaa_tilbake_button"
                    onClick={async () => await requestNavigation(page - 1)}
                    disabled={loading || page <= 1}
                >
                    {t("skjema.knapper.forrige")}
                    {loading && <Loader className={"ml-2"} />}
                </Button>
                <Button
                    variant="primary"
                    id="gaa_videre_button"
                    onClick={async () => await requestNavigation(page + 1)}
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
