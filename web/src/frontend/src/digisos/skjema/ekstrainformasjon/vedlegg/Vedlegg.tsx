import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps, SoknadAppState } from "../../../../nav-soknad/redux/reduxTypes";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Vedlegg } from "../../../../nav-soknad/redux/vedlegg/vedleggTypes";

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
		// const { faktumstruktur, fakta, intl } = this.props;
		// const belopFakta = finnFakta(faktumstruktur.id, fakta);

		const vedleggListe = this.props.vedlegg
			.filter(vedlegg => vedlegg.innsendingsvalg === "LastetOpp")
			.map(vedlegg => {
			return (
				<div key={vedlegg.vedleggId}>Vedlegg: {vedlegg.filnavn}</div>
			);
		});

		return (
			<div>vedlegg kreves
				<div>{vedleggListe}</div>
			</div>
		);
	}
}

export default connect<{}, {}, Props>((state: SoknadAppState) => ({

}))(injectIntl(VedleggComponent));
