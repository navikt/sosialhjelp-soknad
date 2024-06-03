import React, {useState} from "react";
import {LinkButton} from "../../lib/components/LinkButton";
import {downloadAttachedFile} from "../../lib/utils/rest-utils";
import {FilFrontend} from "../../generated/model";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {TrashIcon} from "@navikt/aksel-icons";
import {Button} from "@navikt/ds-react";
import {BekreftSlettDokumentModal} from "../../lib/modals/BekreftSlettDokumentModal";

export const OpplastetVedlegg = ({onDelete, fil}: {fil: FilFrontend; onDelete: (uuid: string) => void}) => {
    const behandlingsId = useBehandlingsId();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const lastNedUrl = `opplastetVedlegg/${behandlingsId}/${fil.uuid}/fil`;

    // FIXME: fil.uuid ?? "" is a nasty hack.
    return (
        <li className="mt-4 flex gap-2 justify-between bg-surface-action-subtle-hover rounded-md p-2">
            <BekreftSlettDokumentModal
                open={showConfirmDelete}
                onSelect={(shouldDelete) => {
                    if (shouldDelete) onDelete(fil.uuid ?? "");
                    setShowConfirmDelete(false);
                }}
            />
            <LinkButton onClick={() => downloadAttachedFile(lastNedUrl)}>{fil.filNavn}</LinkButton>
            <Button
                size={"small"}
                variant={"tertiary"}
                onClick={() => setShowConfirmDelete(true)}
                aria-label={`Slett ${fil.filNavn}`}
            >
                <div className={"flex items-center gap-2"}>
                    <TrashIcon />
                </div>
            </Button>
        </li>
    );
};
