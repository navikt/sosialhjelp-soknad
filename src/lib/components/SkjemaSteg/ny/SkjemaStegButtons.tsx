import * as React from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {SkjemaStegContext} from "./SkjemaSteg";
import {useContext, useState} from "react";
import {minSideURL} from "../../../config";
import {logError} from "../../../log/loggerUtils";
import {AvbrytSoknadModal} from "../../modals/AvbrytSoknadModal";
import {NavEnhetInaktiv} from "../../../../pages/01-personalia/adresse/NavEnhetInaktiv";

interface SkjemaStegNavigasjonProps {
    loading?: boolean;
}

export const SkjemaStegButtons = ({loading}: SkjemaStegNavigasjonProps) => {
    const [avbrytModalOpen, setAvbrytModalOpen] = useState<boolean>(false);

    const {t} = useTranslation("skjema");
    const context = useContext(SkjemaStegContext);

    if (context === null) {
        logError("<SkjemaSteg.Buttons/> must be used inside <SkjemaSteg.Container />");
        return null;
    }

    const {page, requestNavigation} = context;

    return (
        <div>
            {page !== 9 && <NavEnhetInaktiv />}
            <AvbrytSoknadModal open={avbrytModalOpen} onClose={() => setAvbrytModalOpen(false)} />
            <div className={"!mt-12 md:!mt-16 lg:!mt-24 !mb-8 lg:!mb-16 space-x-3"}>
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
            <div className={"pb-8 lg:pb-16"}>
                <Button variant="tertiary" onClick={() => (window.location.href = minSideURL)}>
                    {t("avbryt.fortsettsenere")}
                </Button>
                <Button variant="tertiary" onClick={() => setAvbrytModalOpen(true)}>
                    {t("avbryt.slett")}
                </Button>
            </div>
        </div>
    );
};
