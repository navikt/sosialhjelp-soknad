import * as React from "react";
import { Dispatch } from "../../../../nav-soknad/redux/reduxTypes";
import { Vedlegg } from "../../../../nav-soknad/redux/vedlegg/vedleggTypes";
import Lenkeknapp from "../../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import { downloadAttachedFile } from "../../../../nav-soknad/utils/rest-utils";
import AriaText from "../../../../nav-soknad/components/aria/AriaText";
import SVG from "react-inlinesvg";
import { startSlettVedlegg } from "../../../../nav-soknad/redux/vedlegg/vedleggActions";

interface Props {
	vedlegg: Vedlegg;
	dispatch: Dispatch;
	belopFaktumId: number;
}

type AllProps = Props;

export default class VedleggsFil extends React.Component<AllProps, {}> {
	constructor(props: AllProps) {
		super(props);
	}

	render() {
		const {vedlegg, dispatch, belopFaktumId} = this.props;
		const lastNedUrl = `sosialhjelpvedlegg/${vedlegg.vedleggId}/fil`;

		return (
			<div className="vedleggsliste__vedlegg">
				<span className="vedleggsliste__filnavn">
					<Lenkeknapp onClick={() => downloadAttachedFile(lastNedUrl)}>
						{vedlegg.filnavn}
					</Lenkeknapp>
				</span>
				<span className="vedleggsliste__slett_ikon">
					<button
						type="button"
						className="vedleggsliste__kunSkjermleser_knapp"
						onClick={() => dispatch(startSlettVedlegg(vedlegg.vedleggId, vedlegg.faktumId, belopFaktumId))}
					>
						<AriaText>Slett {vedlegg.filnavn}</AriaText>
						<SVG
							className="vedleggsliste__slett_ikon"
							src="/soknadsosialhjelp/statisk/bilder/remove-circle.svg"
						/>
					</button>
				</span>
			</div>
		);
	}
}
