import React, {useState} from "react";
import {LinkButton} from "../../lib/components/LinkButton";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {TrashIcon} from "@navikt/aksel-icons";
import {Button} from "@navikt/ds-react";
import digisosConfig from "../../lib/config";
import {BekreftSlettDokumentModal} from "../../lib/components/modals/BekreftSlettDokumentModal";
import {DokumentDto} from "../../generated/new/model";

export const OpplastetVedlegg = ({
    onDelete,
    dokument: {filnavn, dokumentId},
}: {
    dokument: DokumentDto;
    onDelete: (dokumentId: string) => void;
}) => {
    const soknadId = useSoknadId();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const lastNedUrl = `/dokument/${soknadId}/${dokumentId}`;

    return (
        <li className="mt-4 flex gap-2 justify-between bg-surface-action-subtle-hover rounded-md p-2">
            <BekreftSlettDokumentModal
                open={showConfirmDelete}
                onSelect={(shouldDelete) => {
                    if (shouldDelete) onDelete(dokumentId);
                    setShowConfirmDelete(false);
                }}
            />
            <LinkButton onClick={() => window.open(digisosConfig.baseURL + lastNedUrl)}>{filnavn}</LinkButton>
            <Button
                size={"small"}
                variant={"tertiary"}
                onClick={() => setShowConfirmDelete(true)}
                aria-label={`Slett ${filnavn}`}
            >
                <div className={"flex items-center gap-2"}>
                    <TrashIcon height={25} width={25} />
                </div>
            </Button>
        </li>
    );
};
