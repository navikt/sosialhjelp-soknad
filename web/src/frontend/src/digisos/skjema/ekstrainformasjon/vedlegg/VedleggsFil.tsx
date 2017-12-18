import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, DispatchProps, SoknadAppState } from "../../../../nav-soknad/redux/reduxTypes";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Vedlegg } from "../../../../nav-soknad/redux/vedlegg/vedleggTypes";
import Lenkeknapp from "../../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import { downloadAttachedFile } from "../../../../nav-soknad/utils/rest-utils";
import AriaText from "../../../../nav-soknad/components/aria/AriaText";
import SVG from "react-inlinesvg";
import { startSlettVedlegg } from "../../../../nav-soknad/redux/vedlegg/vedleggActions";

interface Props {
	vedlegg: Vedlegg;
	dispatch: Dispatch;
}

type AllProps = Props &
	InjectedIntlProps;

class VedleggsFil extends React.Component<AllProps, {}> {
	constructor(props: AllProps) {
		super(props);
	}

	render() {
		const {vedlegg, dispatch, intl} = this.props;
		// const belopFakta = finnFakta(faktumstruktur.id, fakta);
		const lastNedUrl = `sosialhjelpvedlegg/${vedlegg.vedleggId}/fil`;

		return (
			<div>
				<span className="vedleggsliste__filnavn">
					<Lenkeknapp onClick={() => downloadAttachedFile(lastNedUrl)}>
						{vedlegg.filnavn}
					</Lenkeknapp>
				</span>
				<span className="vedleggsliste__slett_ikon">
					<button
						type="button"
						className="vedleggsliste__kunSkjermleser_knapp"
						onClick={() => dispatch(startSlettVedlegg(vedlegg.vedleggId, vedlegg.faktumId))}
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

export default (injectIntl(VedleggsFil));
