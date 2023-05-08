import React from "react";
import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";
import {downloadAttachedFile} from "../../nav-soknad/utils/rest-utils";
import {basePath} from "../../configuration";
import {FilFrontend} from "../../generated/model";

export const OpplastetVedlegg = (props: {
    behandlingsId: string | undefined;
    fil: FilFrontend;
    onSlett: (fil: FilFrontend) => void;
}) => {
    const handleSlett = (fil: FilFrontend) => {
        props.onSlett(fil);
    };

    const lastNedUrl = `opplastetVedlegg/${props.behandlingsId}/${props.fil.uuid}/fil`;

    return (
        <div className="vedleggsliste__vedlegg">
            <span className="vedleggsliste__filnavn">
                <LinkButton onClick={() => downloadAttachedFile(lastNedUrl)}>{props.fil.filNavn}</LinkButton>
            </span>
            <span className="vedleggsliste__slett_ikon">
                <LinkButton onClick={() => handleSlett(props.fil)} aria-label={`Slett ${props.fil.filNavn}`}>
                    <img src={`${basePath}/statisk/bilder/ikon_trashcan.svg`} alt={""} />
                </LinkButton>
            </span>
        </div>
    );
};

export default OpplastetVedlegg;
