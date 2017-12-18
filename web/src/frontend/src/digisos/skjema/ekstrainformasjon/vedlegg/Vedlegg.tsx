import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps, SoknadAppState } from "../../../../nav-soknad/redux/reduxTypes";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { Vedlegg } from "../../../../nav-soknad/redux/vedlegg/vedleggTypes";
import VedlegssFil from "./VedleggsFil";
import LastOppVedlegg from "./LastOppVedlegg";
import { Faktum } from "../../../../nav-soknad/types/navSoknadTypes";

interface Props {
	vedlegg: Vedlegg[];
	belopFaktum: Faktum;
}

type AllProps = Props &
	DispatchProps &
	InjectedIntlProps;

class VedleggComponent extends React.Component<AllProps, {}> {
	constructor(props: AllProps) {
		super(props);
	}

	render() {
		const { vedlegg, belopFaktum, intl, dispatch } = this.props;

		const vedleggListe = vedlegg
			.filter(v => v.innsendingsvalg === "LastetOpp")
			.map(v => {
			return (
				<VedlegssFil key={v.vedleggId} vedlegg={v} dispatch={dispatch} />
			);
		});

		const vedleggsKey = `vedlegg.${vedlegg[0].skjemaNummer}.${vedlegg[0].skjemanummerTillegg}.tittel`;

		return (
			<div className="">
				<p>
					<FormattedMessage id={vedleggsKey} />
				</p>

				<div className="vedleggsliste">
					{vedleggListe}
					</div>


				<LastOppVedlegg belopFaktumId={belopFaktum.faktumId} />
			</div>
		);
	}
}

export default connect<{}, {}, Props>((state: SoknadAppState) => ({

}))(injectIntl(VedleggComponent));
