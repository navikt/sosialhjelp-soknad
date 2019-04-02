import * as React from "react";
import { Column, Container, Row } from "nav-frontend-grid";
import InputEnhanced from "./InputEnhanced";
import { Person, Sivilstatus } from "../../digisos/skjema/familie/sivilstatus/FamilieTypes";
import { setPath } from "../redux/soknadsdata/soknadsdataActions";

interface OwnProps {
	person?: Person;
	sivilstatus?: Sivilstatus;
	id?: string;
	onChange?: (person: Person) => void;
	oppdaterSoknadsdata?: (verdi: any) => void;
	// faktumKey: string;
	// faktumId?: number;
	// validering?: {
	// 	navnRequired?: boolean;
	// 	fnrRequired?: boolean;
	// 	pnrRequired?: boolean;
	// };
}

// interface PersonFaktumProperties {
// 	navn: string;
// 	fnr: string;
// 	fdato: string;
// }

// export const oppsummerPersonData = (faktum: Faktum) => {
// 	const props = faktum.properties as PersonFaktumProperties;
// 	const ingenVerdi = "blankt";
// 	return `Navn: ${props.navn || ingenVerdi}, fødselsnummer: ${props.fnr ||
// 		ingenVerdi}, fødselsdato: ${props.fdato || ingenVerdi}`;
// };

// interface State {
// 	person: Person;
// }

class PersonSkjema extends React.Component<OwnProps, {}> {
	navnInput: HTMLInputElement;

	constructor(props: OwnProps) {
		super(props);
		this.focus = this.focus.bind(this);
		// this.state = { person: this.props.person }
	}

	focus() {
		this.navnInput.focus();
	}

	oppdaterTekstfelt(sti: string, verdi: any) {
		const person = {...this.props.person };
		setPath(person, sti, verdi); // Bedre med spread...
		const sivilstatus = {...this.props.sivilstatus};
		sivilstatus.ektefelle = person;

		// this.setState({person: oppdatertPerson});

		// const person = {...this.props.person};
		// sivilstatus.borSammenMed = verdi;
		this.props.oppdaterSoknadsdata({
			familie: {sivilstatus}
		});
	}


	validerOgLagre() {
		// TODO Håndter valideringsregler
		this.props.onChange(this.props.sivilstatus.ektefelle);
	}

	render() {
		const { id, person } = this.props;

		let fornavn: string = "";
		let mellomnavn: string = "";
		let etternavn: string = "";
		let fodselsdato: string = "";
		let personIdentifikator: string = "";

		if (person) {
			if (person.navn) {
				if (person.navn.fornavn) {
					fornavn = person.navn.fornavn;
				}
				if (person.navn.mellomnavn) {
					mellomnavn = person.navn.mellomnavn;
				}
				if (person.navn.etternavn) {
					etternavn = person.navn.etternavn;
				}
			}
			if (person.fodselsdato) {
				fodselsdato = person.fodselsdato;
			}
			if (person.personnummer) {
				personIdentifikator = person.personnummer;
			}
		}

		return (
			<div className="personskjema">
				<Container fluid={true} className="container--noPadding">
					<Row>
						<Column xs="12">
							<InputEnhanced
								getName={() => id + "_fornavn_input"}
								getFeil={() => null}
								id={id + "_fornavn_input"}
								inputRef={c => (this.navnInput = c)}
								maxLength={100}
								verdi={fornavn}
								onChange={(verdi: string) => this.oppdaterTekstfelt("navn/fornavn", verdi)}
								onBlur={() => this.validerOgLagre()}
								faktumKey="familie.sivilstatus.gift.ektefelle.fornavn"
								required={true}
							/>
							{/*<NavnFaktum*/}
								{/*id={idNavn}*/}
								{/*inputRef={c => (this.navnInput = c)}*/}
								{/*faktumKey={faktumKey}*/}
								{/*required={validering.navnRequired}*/}
								{/*faktumId={faktumId}*/}
								{/*property="fornavn"*/}
							{/*/>*/}
						</Column>
					</Row>
					<Row>
						<Column xs="12">
							<InputEnhanced
								getName={() => id + "_mellomnavn_input"}
								getFeil={() => null}
								id={id + "_mellomnavn_input"}
								inputRef={c => (this.navnInput = c)}
								maxLength={100}
								verdi={mellomnavn}
								onChange={(verdi: string) => this.oppdaterTekstfelt("navn/mellomnavn", verdi)}
								onBlur={() => this.validerOgLagre()}
								faktumKey="familie.sivilstatus.gift.ektefelle.mellomnavn"
								required={true}
							/>
							{/*<NavnFaktum*/}
								{/*id={idNavn}*/}
								{/*inputRef={c => (this.navnInput = c)}*/}
								{/*faktumKey={faktumKey}*/}
								{/*required={validering.navnRequired}*/}
								{/*faktumId={faktumId}*/}
								{/*property="mellomnavn"*/}
							{/*/>*/}
						</Column>
					</Row>
					<Row className="add-padding-bottom">
						<Column xs="12">
							<InputEnhanced
								getName={() => id + "_etternavn_input"}
								getFeil={() => null}
								id={id + "_etternavn_input"}
								inputRef={c => (this.navnInput = c)}
								maxLength={100}
								verdi={etternavn}
								onChange={(verdi: string) => this.oppdaterTekstfelt("navn/etternavn", verdi)}
								onBlur={() => this.validerOgLagre()}
								faktumKey="familie.sivilstatus.gift.ektefelle.etternavn"
								required={true}
							/>
							{/*<NavnFaktum*/}
								{/*id={idNavn}*/}
								{/*inputRef={c => (this.navnInput = c)}*/}
								{/*faktumKey={faktumKey}*/}
								{/*required={validering.navnRequired}*/}
								{/*faktumId={faktumId}*/}
								{/*property="etternavn"*/}
							{/*/>*/}
						</Column>
					</Row>
					<Row>
						<Column xs="12">
							<InputEnhanced
								getName={() => id + "_fodselsdato_input"}
								getFeil={() => null}
								id={id + "_fodselsdato_input"}
								inputRef={c => (this.navnInput = c)}
								// maxLength={8}
								// pattern={"\\d*"}
								verdi={fodselsdato}
								onChange={(verdi: string) => this.oppdaterTekstfelt("fodselsdato", verdi)}
								bredde="S"
								onBlur={() => this.validerOgLagre()}
								faktumKey="familie.sivilstatus.gift.ektefelle.fnr"
								required={true}
							/>
						</Column>
					</Row>
					<Row>
						<Column xs="12">
							<InputEnhanced
								getName={() => id + "_personnummer_input"}
								getFeil={() => null}
								id={id + "_personnummer_input"}
								inputRef={c => (this.navnInput = c)}
								maxLength={5}
								minLength={5}
								pattern={"\\d*"}
								verdi={personIdentifikator}
								onChange={(verdi: string) => this.oppdaterTekstfelt("personIdentifikator", verdi)}
								bredde="S"
								onBlur={() => this.validerOgLagre()}
								faktumKey="familie.sivilstatus.gift.ektefelle.pnr"
								required={true}
							/>

							{/*<TallFaktum*/}
								{/*id={idPersonnummer}*/}
								{/*faktumKey={faktumKey}*/}
								{/*maxLength={5}*/}
								{/*minLength={5}*/}
								{/*bredde="S"*/}
								{/*required={validering.pnrRequired}*/}
								{/*faktumId={faktumId}*/}
								{/*property="pnr"*/}
							{/*/>*/}
						</Column>
					</Row>
				</Container>
			</div>
		);
	}
}

export default PersonSkjema;
