import * as React from "react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {AvbrytSoknadModal} from "../modals/AvbrytSoknadModal.tsx";
import {Button} from "@navikt/ds-react";
import digisosConfig from "../../config.ts";
import {FloppydiskIcon, TrashIcon} from "@navikt/aksel-icons";

export const SkjemaStegCancelButtons = () => {
    const [avbrytModalOpen, setAvbrytModalOpen] = useState<boolean>(false);
    const {t} = useTranslation("skjema");

    return (
        <div className={"pb-8 lg:pb-16"}>
            <AvbrytSoknadModal open={avbrytModalOpen} onClose={() => setAvbrytModalOpen(false)} />
            <Button
                variant="tertiary"
                icon={<FloppydiskIcon aria-hidden={true} />}
                onClick={async () => {
                    window.location.assign(digisosConfig.minSideURL);
                }}
            >
                {t("avbryt.fortsettsenere")}
            </Button>
            <Button variant="tertiary" icon={<TrashIcon aria-hidden={true} />} onClick={() => setAvbrytModalOpen(true)}>
                {t("avbryt.slett")}
            </Button>
        </div>
    );
};
