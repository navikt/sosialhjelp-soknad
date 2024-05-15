import React from "react";
import {LinkButton} from "../../lib/components/LinkButton";
import {downloadAttachedFile} from "../../lib/utils/rest-utils";
import {FilFrontend} from "../../generated/model";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {TrashIcon} from "@navikt/aksel-icons";
import {Button} from "@navikt/ds-react";

export const OpplastetVedlegg = ({onDelete, fil}: {fil: FilFrontend; onDelete: (uuid: string) => void}) => {
    const behandlingsId = useBehandlingsId();
    const lastNedUrl = `opplastetVedlegg/${behandlingsId}/${fil.uuid}/fil`;

    // FIXME: fil.uuid ?? "" is a nasty hack.
    return (
        <li className="mt-4 flex gap-2 justify-between bg-[rgba(255,255,255,0.5)] rounded-md p-2">
            <LinkButton onClick={() => downloadAttachedFile(lastNedUrl)}>{fil.filNavn}</LinkButton>
            <Button
                size={"small"}
                variant={"danger"}
                onClick={() => onDelete(fil.uuid ?? "")}
                aria-label={`Slett ${fil.filNavn}`}
            >
                <div className={"flex items-center gap-2"}>
                    <TrashIcon />
                    Slett
                </div>
            </Button>
        </li>
    );
};
