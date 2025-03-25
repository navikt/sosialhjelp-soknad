import {DokumentUpload} from "../../../generated/model";
import {useBehandlingsId} from "../../hooks/common/useBehandlingsId.ts";
import React, {useState} from "react";
import {BekreftSlettDokumentModal} from "../modals/BekreftSlettDokumentModal.tsx";
import {LinkButton} from "../LinkButton.tsx";
import digisosConfig from "../../config.ts";
import {BodyShort, Button} from "@navikt/ds-react";
import {TrashIcon} from "@navikt/aksel-icons";

export const UploadedFileBox = ({
    onDelete,
    dokument: {filename, dokumentId},
    dokumentasjonsType,
}: {
    dokument: DokumentUpload;
    onDelete: (dokumentId: string) => void;
    dokumentasjonsType: string;
}) => {
    const behandlingsId = useBehandlingsId();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const lastNedUrl = `opplastetVedlegg/${behandlingsId}/${dokumentId}/fil`;

    return (
        <li className="mt-4 flex gap-2 justify-between border-2 border-[var(--a-border-subtle)] border-solid rounded-md p-2">
            <div>
                <BekreftSlettDokumentModal
                    open={showConfirmDelete}
                    onSelect={(shouldDelete) => {
                        if (shouldDelete) onDelete(dokumentId);
                        setShowConfirmDelete(false);
                    }}
                />
                <BodyShort>{dokumentasjonsType}</BodyShort>
                <LinkButton onClick={() => window.open(digisosConfig.baseURL + lastNedUrl)}>{filename}</LinkButton>
            </div>
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
