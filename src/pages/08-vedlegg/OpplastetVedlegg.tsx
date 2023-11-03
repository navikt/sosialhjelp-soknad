import React from "react";
import {LinkButton} from "../../lib/components/linkButton/LinkButton";
import {downloadAttachedFile} from "../../lib/utils/rest-utils";
import {FilFrontend} from "../../generated/model";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {basePath} from "../../lib/config";

export const OpplastetVedlegg = ({onDelete, fil}: {fil: FilFrontend; onDelete: (uuid: string) => void}) => {
    const behandlingsId = useBehandlingsId();
    const lastNedUrl = `opplastetVedlegg/${behandlingsId}/${fil.uuid}/fil`;

    // FIXME: fil.uuid ?? "" is a nasty hack.
    return (
        <div className="vedleggsliste__vedlegg">
            <span className="vedleggsliste__filnavn">
                <LinkButton onClick={() => downloadAttachedFile(lastNedUrl)}>{fil.filNavn}</LinkButton>
            </span>
            <span className="vedleggsliste__slett_ikon">
                <LinkButton onClick={() => onDelete(fil.uuid ?? "")} aria-label={`Slett ${fil.filNavn}`}>
                    <img src={`${basePath}/statisk/bilder/ikon_trashcan.svg`} alt={""} />
                </LinkButton>
            </span>
        </div>
    );
};
