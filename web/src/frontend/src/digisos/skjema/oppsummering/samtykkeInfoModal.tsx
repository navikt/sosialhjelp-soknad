import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import { InjectedIntlProps, injectIntl, FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { setVisBekreftInfo } from "../../../nav-soknad/redux/oppsummering/oppsummeringActions";
import { Faktum } from "../../../nav-soknad/types";
import { State } from "../../redux/reducers";
import { finnFaktum } from "../../../nav-soknad/utils";

interface StateProps {
	modalSynlig: boolean;
	fakta: Faktum[];
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class SamtykkeInfoModal extends React.Component<Props, {}> {

	render() {
		const { kommuneNavn, navKontorNavn } = this.finnStedsnavn();
		return (
			<NavFrontendModal
				isOpen={this.props.modalSynlig || false}
				contentLabel={this.props.intl.formatMessage({ id: "avbryt.avbryt" })}
				closeButton={true}
				onRequestClose={() => this.props.dispatch(setVisBekreftInfo(false))}
			>
				<div className="samtykke_info">
					<h1 className="typo-innholdstittel">
						<FormattedMessage id={"soknadsosialhjelp.oppsummering.bekreftInfoModal.title"} />
					</h1>
					<FormattedHTMLMessage
						id={"soknadsosialhjelp.oppsummering.bekreftInfoModal.body"}
						values={{
							kommuneNavn,
							navKontorNavn
						}}
					/>
				</div>
			</NavFrontendModal>
		);
	}

	private finnStedsnavn() {
		const kommune: Faktum = finnFaktum("personalia.kommune", this.props.fakta);
		let kommuneNavn = (kommune && kommune.lagret && kommune.lagret.value) || "";
		kommuneNavn = this.capitalize(kommuneNavn);

		const bydel: Faktum = finnFaktum("personalia.bydel", this.props.fakta);
		let bydelsNavn = (bydel && bydel.lagret && bydel.lagret.value) || "";
		bydelsNavn = this.capitalize(bydelsNavn);

		if (bydelsNavn === "") {
			bydelsNavn = kommuneNavn;
		}
		return { kommuneNavn, navKontorNavn: bydelsNavn };
	}

	private capitalize(str: string): string {
		if (str !== "") {
			str = str.charAt(0).toUpperCase() + str.slice(1);
		}
		return str;
	}
}

export default connect((state: State, props: any): StateProps => {
	return {
		fakta: state.fakta.data,
		modalSynlig: state.oppsummering.visBekreftInfo
	};
})(injectIntl(SamtykkeInfoModal));
