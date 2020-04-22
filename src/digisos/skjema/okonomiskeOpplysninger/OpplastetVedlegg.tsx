import * as React from "react";
import Lenkeknapp from "../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
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
                <Lenkeknapp onClick={() => downloadAttachedFile(lastNedUrl)}>{props.fil.filNavn}</Lenkeknapp>
            </span>
            <span className="vedleggsliste__slett_ikon">
                <button type="button" className=" linkbutton linkbutton--normal" onClick={() => handleSlett(props.fil)}>
                    <AriaText>Slett {props.fil.filNavn}</AriaText>
                    <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_trashcan.svg`} alt={""} />
                </button>
            </span>
        </div>
    );
};

export default OpplastetVedlegg;
