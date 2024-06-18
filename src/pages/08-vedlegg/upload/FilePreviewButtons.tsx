import {useTranslation} from "react-i18next";
import {Button} from "@navikt/ds-react";
//import {TrashIcon} from "@navikt/aksel-icons";
import {FullscreenEnter, FullscreenExit} from "@navikt/ds-icons";
import React from "react";
import {NavLogoBlack} from "../../../lib/components/NavLogoBlack";

export const FilePreviewButtons = ({
    //onDelete,
    isFullscreen,
    setFullscreen,
}: {
    //onDelete: () => void;
    isFullscreen: boolean;
    setFullscreen: (isFullscreen: boolean) => void;
}) => {
    const {t} = useTranslation();

    //TODO: Fjerner slett knappen foreløpig
    //TODO: Slett knappen og Avbryt knappen har den samme funksjonene med at prewiewen lukkes
    //TODO: Sjekk om Slett knappen kan istedenfor åpne vinduet der man først valgt filen
    /**
     *             <Button variant="tertiary" onClick={onDelete}>
     *                 <div className={"flex items-center gap-2"}>
     *                     <TrashIcon /> {t("vedlegg.forhandsvisning.slett")}
     *                 </div>
     *             </Button>
     * */

    if (isFullscreen)
        return (
            <div className={"bg-white flex justify-between items-center px-4 py-2 w-full h-fit"}>
                <div className={"pl-8"}>
                    <NavLogoBlack />
                </div>
                <Button variant="primary" onClick={() => setFullscreen(false)}>
                    <div className={"flex items-center gap-2"}>
                        <FullscreenExit />
                        {t("vedlegg.forhandsvisning.fullskjerm.lukk")}
                    </div>
                </Button>
            </div>
        );

    return (
        <div className={"w-fit ml-auto"}>
            <Button variant="tertiary" onClick={() => setFullscreen(true)}>
                <div className={"flex items-center gap-2"}>
                    <FullscreenEnter />
                    {t("vedlegg.forhandsvisning.fullskjerm")}
                </div>
            </Button>
        </div>
    );
};
