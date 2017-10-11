import * as React from "react";
import { connect } from "react-redux";
import { FaktumStruktur } from "../../redux/synligefakta/synligeFaktaReducer";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { Column, Container, Row } from "nav-frontend-grid";
import BelopFaktum from "../../../nav-soknad/faktum/typedInput/BelopFaktum";
import { DispatchProps, SoknadAppState } from "../../../nav-soknad/redux/reduxTypes";
import { Faktum } from "../../../nav-soknad/types/navSoknadTypes";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { finnFakta, finnFaktum } from "../../../nav-soknad/utils/faktumUtils";
import { opprettFaktum, slettFaktum } from "../../../nav-soknad/redux/faktaActions";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LeggTilLenke from "../../../nav-soknad/components/leggTilLenke/leggtillenke";
import FjernLenke from "../../../nav-soknad/components/fjernLenke/fjernlenke";

interface Props {
	faktumstruktur: FaktumStruktur;
}

type AllProps = Props & DispatchProps & FaktumComponentProps & InjectedIntlProps;

class Opplysning extends React.Component<AllProps, {}> {

	constructor(props: AllProps) {
		super(props);
		this.leggTilBelop = this.leggTilBelop.bind(this);
		this.fjernBelop = this.fjernBelop.bind(this);
	}

	componentDidMount() {
		const {faktumstruktur, fakta} = this.props;

		const belopFakta = finnFakta(faktumstruktur.id, fakta);

		if (belopFakta.length === 0) {
			this.leggTilBelop();
		}
	}

	leggTilBelop() {
		const {faktumstruktur, fakta, dispatch} = this.props;
		const parent = finnFaktum(faktumstruktur.dependOn.id, fakta);
		dispatch(
			opprettFaktum({key: faktumstruktur.id, parrentFaktum: parent.faktumId})
		);
	}

	fjernBelop(faktumId: number) {
		this.props.dispatch(slettFaktum(faktumId));
	}

	render() {
		const {faktumstruktur, fakta, intl} = this.props;
		const belopFakta = finnFakta(faktumstruktur.id, fakta);

		const leggTilTekst = intl.formatMessage({id: "opplysninger.leggtil"});
		const slettTekst = intl.formatMessage({id: "opplysninger.fjern"});

		const rader = belopFakta.map(faktum => {
			const inputs = faktumstruktur.properties.map(property => {
				return (
					<Column md="6" xs="12" key={property.id}>
						<BelopFaktum faktumId={faktum.faktumId} faktumKey={faktumstruktur.id} property={property.id} bredde="s"/>
					</Column>
				);
			});

			const slettKnapp = (
				<FjernLenke fjern={() => this.fjernBelop(faktum.faktumId)} lenketekst={slettTekst} />
			);

			return (
				<Row key={faktum.faktumId} className="opplysning-row">
					{inputs}
					{belopFakta.length > 1 ? slettKnapp : null}
				</Row>
			);
		});

		const leggTilKnapp = (
			<LeggTilLenke
				leggTil={this.leggTilBelop}
				lenketekst={leggTilTekst}
			/>
		);

		return (
			<SporsmalFaktum faktumKey={faktumstruktur.id} key={faktumstruktur.id}>
				<Container fluid={true} className="container--noPadding">
					{rader}
				</Container>
				{faktumstruktur.flereTillatt === "true" ? leggTilKnapp : null}
			</SporsmalFaktum>
		);
	}
}

interface StateFromProps {
	fakta: Faktum[];
}

export default connect<StateFromProps, {}, Props>((state: SoknadAppState) => {
	return {
		fakta: state.fakta.data
	};
})(injectIntl(Opplysning));
