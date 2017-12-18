import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, DispatchProps, SoknadAppState } from "../../../../nav-soknad/redux/reduxTypes";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Vedlegg } from "../../../../nav-soknad/redux/vedlegg/vedleggTypes";
import Lenkeknapp from "../../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import { downloadAttachedFile } from "../../../../nav-soknad/utils/rest-utils";

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
		const { vedlegg, dispatch, intl } = this.props;
		// const belopFakta = finnFakta(faktumstruktur.id, fakta);
		const lastNedUrl = `sosialhjelpvedlegg/${vedlegg.vedleggId}/fil`;

		return (
			<div>
				<Lenkeknapp onClick={() => downloadAttachedFile(lastNedUrl)}>
					{vedlegg.filnavn}
				</Lenkeknapp>
			</div>
		);
	}
}

export default (injectIntl(VedleggsFil));
