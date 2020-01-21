import * as React from "react";
import Lenkeknapp from "../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import {downloadAttachedFile} from "../../../nav-soknad/utils/rest-utils";
import AriaText from "../../../nav-soknad/components/aria/AriaText";
import {Fil} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {getContextPathForStaticContent} from "../../../configuration";

interface Props {
    fil: Fil;
    onSlett: (fil: Fil) => void;
}

type AllProps = Props;

export default class OpplastetVedlegg extends React.Component<AllProps, {}> {

    handleSlett(fil: Fil) {
        this.props.onSlett(fil);
    }

    render() {
        const {fil} = this.props;
        const lastNedUrl = `opplastetVedlegg/${fil.uuid}/fil`;
        const filnavn = decodeURI(fil.filNavn);
        return (
            <div className="vedleggsliste__vedlegg">
                <span className="vedleggsliste__filnavn">
                    <Lenkeknapp onClick={() => downloadAttachedFile(lastNedUrl)}>
                        {filnavn}
                    </Lenkeknapp>
                </span>
                <span className="vedleggsliste__slett_ikon">
                    <button
                        type="button"
                        className=" linkbutton linkbutton--normal"
                        onClick={() => this.handleSlett(fil)}
                    >
                        <AriaText>Slett {fil.filNavn}</AriaText>
                        <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_trashcan.svg`} alt={""} />
                    </button>
                </span>
            </div>
        );
    }
}
