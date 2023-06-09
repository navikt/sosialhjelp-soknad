import React from "react";
import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";
import {downloadAttachedFile} from "../../nav-soknad/utils/rest-utils";
import {basePath} from "../../configuration";
import {FilFrontend} from "../../generated/model";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";

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

export default OpplastetVedlegg;
