import * as React from "react";
import SVG from "react-inlinesvg";
import {Fil } from "./okonomiskeOpplysningerTypes";
import Lenkeknapp from "../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import {downloadAttachedFile} from "../../../nav-soknad/utils/rest-utils";
import AriaText from "../../../nav-soknad/components/aria/AriaText";

interface Props {
	fil: Fil;
	onSlett: (fil: Fil) => void;
}

type AllProps = Props;

export default class OpplastetVedlegg extends React.Component<AllProps, {}> {

	handleSlett(fil: Fil){
		this.props.onSlett(fil);
	}

	render() {
		const {fil} = this.props;
		const lastNedUrl = `opplastetVedlegg/${fil.uuid}`;

		return (
			<div className="vedleggsliste__vedlegg">
				<span className="vedleggsliste__filnavn">
					<Lenkeknapp onClick={() => downloadAttachedFile(lastNedUrl)}>
						{fil.filNavn}
					</Lenkeknapp>
				</span>
				<span className="vedleggsliste__slett_ikon">
					<button
						type="button"
						className="vedleggsliste__kunSkjermleser_knapp"
						onClick={() => this.handleSlett(fil)}
					>
						<AriaText>Slett {fil.filNavn}</AriaText>
						<SVG
							className="vedleggsliste__slett_ikon"
							src="/soknadsosialhjelp/statisk/bilder/ikon_trashcan.svg"
						/>
					</button>
				</span>
			</div>
		);
	}
}
