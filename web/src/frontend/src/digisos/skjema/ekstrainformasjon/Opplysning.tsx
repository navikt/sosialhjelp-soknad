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
import { opprettFaktum } from "../../../nav-soknad/redux/faktaActions";

interface Props {
	faktumstruktur: FaktumStruktur;
}

class Opplysning extends React.Component<Props & DispatchProps & FaktumComponentProps, {}> {

	constructor(props: Props & DispatchProps & FaktumComponentProps) {
		super(props);
		this.leggTilBelop = this.leggTilBelop.bind(this);
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

	render() {
		const {faktumstruktur, fakta} = this.props;
		const belopFakta = finnFakta(faktumstruktur.id, fakta);

		const width = "" + (12 / faktumstruktur.properties.length);

		const rader = belopFakta.map(faktum => {
			const inputs = faktumstruktur.properties.map(property => {
				return (
					<Column md={width} xs="12" key={property.id}>
						<BelopFaktum faktumId={faktum.faktumId} faktumKey={faktumstruktur.id} property={property.id} bredde="s"/>
					</Column>
				);
			});

			return (
				<Row key={faktum.faktumId}>
					{inputs}
				</Row>
			);
		});

		let knapp = null;
		if (faktumstruktur.flereTillatt === "true") {
			knapp = <div onClick={this.leggTilBelop}>Legg til</div>;
		}

		return (
			<SporsmalFaktum faktumKey={faktumstruktur.id} key={faktumstruktur.id}>
				<Container fluid={true} className="container--noPadding">
					{rader}
				</Container>
				{knapp}
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
})(Opplysning);
