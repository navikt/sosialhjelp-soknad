import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps, SoknadAppState } from "../../../../nav-soknad/redux/reduxTypes";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Vedlegg } from "../../../../nav-soknad/redux/vedlegg/vedleggTypes";
import VedlegssFil from "./VedleggsFil";
import LastOppVedlegg from "./LastOppVedlegg";

interface Props {
	vedlegg: Vedlegg[];
	belopFaktumId: number;
}

type AllProps = Props &
	DispatchProps &
	InjectedIntlProps;

class VedleggComponent extends React.Component<AllProps, {}> {
	constructor(props: AllProps) {
		super(props);
	}

	render() {
		const { vedlegg, belopFaktumId, intl, dispatch } = this.props;

		const vedleggListe = vedlegg
			.filter(v => v.innsendingsvalg === "LastetOpp")
			.map(v => {
			return (
				<VedlegssFil key={v.vedleggId} vedlegg={v} dispatch={dispatch} />
			);
		});

		return (
			<div>
				<LastOppVedlegg belopFaktumId={belopFaktumId} />
				<div>{vedleggListe}</div>
			</div>
		);
	}
}

export default connect<{}, {}, Props>((state: SoknadAppState) => ({

}))(injectIntl(VedleggComponent));
