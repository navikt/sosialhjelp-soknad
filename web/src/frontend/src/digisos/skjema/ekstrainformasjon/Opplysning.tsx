import * as React from "react";
import { connect } from "react-redux";
import { FaktumStruktur, PropertyStruktur } from "../../redux/synligefakta/synligeFaktaTypes";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { Column, Container, Row } from "nav-frontend-grid";
import BelopFaktum from "../../../nav-soknad/faktum/typedInput/BelopFaktum";
import { DispatchProps, SoknadAppState } from "../../../nav-soknad/redux/reduxTypes";
import { Faktum } from "../../../nav-soknad/types/navSoknadTypes";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { finnFakta, finnFaktum } from "../../../nav-soknad/utils/faktumUtils";
import { opprettFaktum, slettFaktum } from "../../../nav-soknad/redux/fakta/faktaActions";
import { InjectedIntlProps, injectIntl } from "react-intl";
import Lenkeknapp from "../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import { Vedlegg, VedleggProps } from "../../../nav-soknad/redux/vedlegg/vedleggTypes";
import VedleggComponent from "./vedlegg/Vedlegg";

interface Props {
	faktumstruktur: FaktumStruktur;
	opplastingStatus?: string;
	sistEndredeFaktumId?: number;
}

type AllProps = Props &
	DispatchProps &
	FaktumComponentProps &
	VedleggProps &
	InjectedIntlProps;

function getValideringsType(property: PropertyStruktur) {
	let type = "belop";
	if (property.configuration && property.configuration.configuration) {
		const configuration = property.configuration.configuration.find(
			conf => conf.key === "validering"
		);
		if (configuration) {
			type = configuration.value;
		}
	}
	return type;
}

class Opplysning extends React.Component<AllProps, {}> {
	constructor(props: AllProps) {
		super(props);
		this.leggTilBelop = this.leggTilBelop.bind(this);
		this.fjernBelop = this.fjernBelop.bind(this);
	}

	leggTilBelop() {
		const { faktumstruktur, fakta, dispatch } = this.props;
		const parent = finnFaktum(faktumstruktur.dependOn.id, fakta);
		dispatch(
			opprettFaktum({ key: faktumstruktur.id, parrentFaktum: parent.faktumId })
		);
	}

	fjernBelop(faktumId: number) {
		this.props.dispatch(slettFaktum(faktumId));
	}

	lagRader(faktum: Faktum, index: number, faktumstruktur: FaktumStruktur, slettTekst: string) {
		if (faktumstruktur.properties == null || faktumstruktur.properties.length === 0) {
			return null;
		}

		const inputs = faktumstruktur.properties.map(property => this.lagInputFelter(faktumstruktur, faktum, property));

		const slettKnapp = (
			<Lenkeknapp onClick={() => this.fjernBelop(faktum.faktumId)}>
				{slettTekst}
			</Lenkeknapp>
		);

		return (
			<Row key={faktum.faktumId} className="opplysning__row">
				{inputs}
				{index > 0 ? slettKnapp : null}
			</Row>
		);
	}

	lagInputFelter(faktumstruktur: FaktumStruktur, faktum: Faktum, property: PropertyStruktur) {
		const type = getValideringsType(property);
		let inputFelt = null;

		switch (type) {
			case "text":
				inputFelt = (
					<InputFaktum
						faktumId={faktum.faktumId}
						faktumKey={faktumstruktur.id}
						property={property.id}
						bredde="L"
					/>
				);
				break;
			case "belop":
			default:
				inputFelt = (
					<BelopFaktum
						faktumId={faktum.faktumId}
						faktumKey={faktumstruktur.id}
						property={property.id}
						bredde="S"
					/>
				);
		}

		return (
			<Column md="6" xs="12" key={property.id}>
				{inputFelt}
			</Column>
		);
	}

	render() {
		const { faktumstruktur, fakta, vedlegg, opplastingStatus, sistEndredeFaktumId, intl } = this.props;
		const belopFakta = finnFakta(faktumstruktur.id, fakta);

		const leggTilTekst = intl.formatMessage({ id: "opplysninger.leggtil" });
		const slettTekst = intl.formatMessage({ id: "opplysninger.fjern" });

		const rader = belopFakta.map((faktum, index) => this.lagRader(faktum, index, faktumstruktur, slettTekst));

		const belopFaktumId = belopFakta[0].faktumId;
		const vedleggForOpplysning = vedlegg.filter(v => v.belopFaktumId === belopFaktumId);

		const leggTilKnapp = (
			<Lenkeknapp onClick={this.leggTilBelop} style="add">
				{leggTilTekst}
			</Lenkeknapp>
		);

		return (
			<SporsmalFaktum faktumKey={faktumstruktur.id} key={faktumstruktur.id}>
				<Container fluid={true} className="container--noPadding">
					{rader}
				</Container>
				{faktumstruktur.flereTillatt === "true" ? leggTilKnapp : null}
				{
					vedleggForOpplysning.length > 0 &&
						<VedleggComponent
							opplastingStatus={opplastingStatus}
							sistEndredeFaktumId={sistEndredeFaktumId}
							vedlegg={vedleggForOpplysning}
							belopFaktum={belopFakta[0]}
						/>
				}
			</SporsmalFaktum>
		);
	}
}

interface StateFromProps {
	fakta: Faktum[];
	vedlegg: Vedlegg[];
}

export default connect<StateFromProps, {}, Props>((state: SoknadAppState) => {
	return {
		fakta: state.fakta.data,
		vedlegg: state.vedlegg.data,
		opplastingStatus: state.vedlegg.opplastingStatus,
		sistEndredeFaktumId: state.vedlegg.sistEndredeFaktumId
	};
})(injectIntl(Opplysning));
