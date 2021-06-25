import * as React from "react";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";
import {downloadAttachedFile} from "../../../nav-soknad/utils/rest-utils";
import AriaText from "../../../nav-soknad/components/aria/AriaText";
import {Fil} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {getContextPathForStaticContent} from "../../../configuration";

export const OpplastetVedlegg = (props: {fil: Fil; onSlett: (fil: Fil) => void}) => {
    const handleSlett = (fil: Fil) => {
        props.onSlett(fil);
    };

    const lastNedUrl = `opplastetVedlegg/${props.fil.uuid}/fil`;

    return (
        <div className="vedleggsliste__vedlegg">
            <span className="vedleggsliste__filnavn">
                <LinkButton onClick={() => downloadAttachedFile(lastNedUrl)}>{props.fil.filNavn}</LinkButton>
            </span>
            <span className="vedleggsliste__slett_ikon">
                <LinkButton onClick={() => handleSlett(props.fil)}>
                    <AriaText>Slett {props.fil.filNavn}</AriaText>
                    <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_trashcan.svg`} alt={""} />
                </LinkButton>
            </span>
        </div>
    );
};

export default OpplastetVedlegg;
