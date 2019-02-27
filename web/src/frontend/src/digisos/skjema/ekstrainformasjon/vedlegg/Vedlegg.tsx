import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps, SoknadAppState } from "../../../../nav-soknad/redux/reduxTypes";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { Vedlegg } from "../../../../nav-soknad/redux/vedlegg/vedleggTypes";
import VedlegssFil from "./VedleggsFil";
import LastOppVedlegg from "./LastOppVedlegg";
import { Faktum } from "../../../../nav-soknad/types/navSoknadTypes";
import { Checkbox } from "nav-frontend-skjema";
import { vedleggAlleredeSendt } from "../../../../nav-soknad/redux/vedlegg/vedleggActions";
import { REST_STATUS } from "../../../../nav-soknad/types";

interface Props {
	vedlegg: Vedlegg[];
	belopFaktum: Faktum;
	opplastingStatus?: string;
	sistEndredeFaktumId?: number;
}

type AllProps = Props &
	DispatchProps &
	InjectedIntlProps;

class VedleggComponent extends React.Component<AllProps, {}> {

	constructor(props: AllProps) {
		super(props);
	}

	render() {
		const { vedlegg, belopFaktum, dispatch, opplastingStatus, sistEndredeFaktumId} = this.props;
		const vedleggListe = vedlegg
			.filter(v => v.innsendingsvalg === "LastetOpp")
			.map(v => {
				return <VedlegssFil
					key={v.vedleggId}
					vedlegg={v} dispatch={dispatch} belopFaktumId={belopFaktum.faktumId}
				/>;
			});
		const vedleggsKey = `vedlegg.${vedlegg[ 0 ].skjemaNummer}.${vedlegg[ 0 ].skjemanummerTillegg}.tittel`;
		const disableLastOppVedleggKnapp = this.props.vedlegg[ 0 ].innsendingsvalg === "VedleggAlleredeSendt";
		const gjeldende = belopFaktum.faktumId === this.props.sistEndredeFaktumId;
		const blirLastetOpp = gjeldende && this.props.opplastingStatus === REST_STATUS.PENDING;
		const disabledAlleredeLastetOppCheckbox = blirLastetOpp ||
			this.props.vedlegg[ 0 ].innsendingsvalg === "LastetOpp";
		
		return (
			<div className="">
				<p>
					<FormattedMessage id={vedleggsKey}/>
				</p>
				<div className="vedleggsliste">
					{vedleggListe}
				</div>

				<LastOppVedlegg
					id={belopFaktum.key}
					belopFaktumId={belopFaktum.faktumId}
					opplastingStatus={opplastingStatus}
					sistEndredeFaktumId={sistEndredeFaktumId}
					disabled={disableLastOppVedleggKnapp}
				/>
				<Checkbox
					id={this.props.belopFaktum.key + "_allerede_lastet_opp_checkbox"}
					className={"vedleggLastetOppCheckbox " +
					(disabledAlleredeLastetOppCheckbox ? " checkboks--disabled" : "")}
					label={this.props.intl.formatMessage({
						id: "opplysninger.vedlegg.alleredelastetopp"
					})}
					onChange={(event) => this.props.dispatch(vedleggAlleredeSendt(this.props.vedlegg))}
					checked={disableLastOppVedleggKnapp}
					disabled={disabledAlleredeLastetOppCheckbox}
				/>
			</div>
		);
	}
}

export default connect<{}, {}, Props>((state: SoknadAppState) =>
	({}))(injectIntl(VedleggComponent)
);
