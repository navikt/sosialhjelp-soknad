import React, {useState} from "react";
import {LinkButton} from "../../lib/components/LinkButton";
import {DokumentUpload} from "../../generated/model";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {TrashIcon} from "@navikt/aksel-icons";
import {Button} from "@navikt/ds-react";
import {BekreftSlettDokumentModal} from "../../lib/modals/BekreftSlettDokumentModal";
import {baseURL} from "../../lib/config";

export const OpplastetVedlegg = ({
    onDelete,
    dokument: {filename, dokumentId},
}: {
    dokument: DokumentUpload;
    onDelete: (dokumentId: string) => void;
}) => {
    const behandlingsId = useBehandlingsId();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const lastNedUrl = `opplastetVedlegg/${behandlingsId}/${dokumentId}/fil`;

    return (
        <li className="mt-4 flex gap-2 justify-between bg-surface-action-subtle-hover rounded-md p-2">
            <BekreftSlettDokumentModal
                open={showConfirmDelete}
                onSelect={(shouldDelete) => {
                    if (shouldDelete) onDelete(dokumentId);
                    setShowConfirmDelete(false);
                }}
            />
            <LinkButton onClick={() => window.open(baseURL + lastNedUrl)}>{filename}</LinkButton>
            <Button
                size={"small"}
                variant={"tertiary"}
                onClick={() => setShowConfirmDelete(true)}
                aria-label={`Slett ${filename}`}
            >
                <div className={"flex items-center gap-2"}>
                    <TrashIcon height={25} width={25} />
                </div>
            </Button>
        </li>
    );
};
