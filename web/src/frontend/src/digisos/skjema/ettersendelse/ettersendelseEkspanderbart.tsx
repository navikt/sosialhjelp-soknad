import * as React from "react";
import { Collapse } from "react-collapse";
import { FormattedHTMLMessage } from "react-intl";
import AvsnittMedMarger from "./avsnittMedMarger";
import { MargIkoner } from "./margIkoner";
import EttersendelseVedleggListe from "./ettersendelseVedleggListe";

interface Props {
	children: React.ReactNode;
	onEttersendelse?: () => void;
	kunGenerellDokumentasjon?: boolean;
}

interface State {
	ekspandert: boolean;
	vedleggSendt: boolean;
}

class EttersendelseEkspanderbart extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			ekspandert: false,
			vedleggSendt: false
		};
	}

	toggleEkspandering() {
		this.setState({ ekspandert: !this.state.ekspandert });
	}

	onAnimasjonFerdig() {
		if (this.state.vedleggSendt === true && this.state.ekspandert === false && this.props.onEttersendelse) {
			this.setState({vedleggSendt: false});
			this.props.onEttersendelse();
		}
	}

	onEttersendelse() {
		this.setState({ekspandert: false, vedleggSendt: true});
	}

	render() {
		return (
			<span>

				{this.props.kunGenerellDokumentasjon && (
					<AvsnittMedMarger
						venstreIkon={MargIkoner.DOKUMENTER}
						hoyreIkon={this.state.ekspandert ? MargIkoner.CHEVRON_OPP : MargIkoner.CHEVRON_NED}
						onClick={() => this.toggleEkspandering()}
					>
						{this.props.children}
					</AvsnittMedMarger>
				) }

				{!this.props.kunGenerellDokumentasjon && (
					<AvsnittMedMarger
						venstreIkon={MargIkoner.ADVARSEL}
						hoyreIkon={this.state.ekspandert ? MargIkoner.CHEVRON_OPP : MargIkoner.CHEVRON_NED}
						onClick={() => this.toggleEkspandering()}
					>
						{this.props.children}
					</AvsnittMedMarger>
				) }

				<Collapse
					isOpened={this.state.ekspandert }
					onRest={() => this.onAnimasjonFerdig()}
					className={"ettersendelse__vedlegg " +
					(this.state.ekspandert ? "ettersendelse__vedlegg__ekspandert " : " ")}
				>
					<AvsnittMedMarger>
						<FormattedHTMLMessage id="ettersendelse.mangler_info"/>
					</AvsnittMedMarger>

					<EttersendelseVedleggListe
						onEttersendelse={() => this.onEttersendelse()}
					/>

				</Collapse>

			</span>
		);
	}

}

export default EttersendelseEkspanderbart;
