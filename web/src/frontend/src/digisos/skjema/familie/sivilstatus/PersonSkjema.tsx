import * as React from "react";
import { Column, Container, Row } from "nav-frontend-grid";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import { setPath } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataActions";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { fdato, maksLengde, minLengde } from "../../../../nav-soknad/validering/valideringer";
import { konverterFdatoFraServer, konverterFdatoTilServer } from "./datoUtils";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class PersonSkjema extends React.Component<Props, {}> {

	navnInput: HTMLInputElement;

	constructor(props: Props) {
		super(props);
		this.focus = this.focus.bind(this);
	}

	componentDidMount() {
		if (this.navnInput) {
			this.focus();
		}
	}

	focus() {
		this.navnInput.focus();
	}

	oppdaterTekstfelt(sti: string, verdi: any) {
		const { soknadsdata, oppdaterSoknadsdataSti } = this.props;
		const sivilstatus = soknadsdata.familie.sivilstatus;
		const ektefelle = sivilstatus.ektefelle;
		setPath(ektefelle, sti, verdi);
		oppdaterSoknadsdataSti( SoknadsSti.SIVILSTATUS, sivilstatus);
	}

	onBlur() {
		const { soknadsdata, setValideringsfeil, lagreSoknadsdata, brukerBehandlingId } = this.props;
		const sivilstatus = soknadsdata.familie.sivilstatus;
		let feilkodeFodselsdato = null;
		let fodselsdato = sivilstatus.ektefelle.fodselsdato;
		if (fodselsdato && fodselsdato !== "") {
			fodselsdato = konverterFdatoFraServer(fodselsdato);
			feilkodeFodselsdato = fdato(fodselsdato);
			const faktumKey = "familie.sivilstatus.gift.ektefelle.fnr";
			setValideringsfeil(feilkodeFodselsdato, faktumKey);
			if (!feilkodeFodselsdato && sivilstatus.ektefelle) {
				sivilstatus.ektefelle.fodselsdato = konverterFdatoTilServer(sivilstatus.ektefelle.fodselsdato);
			}
		}
		const personnummer = sivilstatus.ektefelle.personnummer;
		let feilkodePersonnummer = null;
		if (personnummer && personnummer !== "") {
			feilkodePersonnummer = minLengde(personnummer, 5 );
			const faktumKeyPersonnummer = "familie.sivilstatus.gift.ektefelle.pnr";
			if (!feilkodePersonnummer) {
				feilkodePersonnummer = maksLengde(personnummer, 5);
			}
			setValideringsfeil(feilkodePersonnummer, faktumKeyPersonnummer);
		}
		if (!feilkodeFodselsdato && !feilkodePersonnummer) {
			lagreSoknadsdata(brukerBehandlingId, SoknadsSti.SIVILSTATUS, sivilstatus);
		}
	}

	render() {
		const {soknadsdata} = this.props;
		const ektefelle = soknadsdata.familie.sivilstatus.ektefelle;
		if (!ektefelle) {
			return <div className="personskjema"/>;
		}
		const id = "ektefelle";
		const fodselsdato = konverterFdatoFraServer(ektefelle.fodselsdato) || "";
		if (!ektefelle.personnummer) {
			ektefelle.personnummer = "";
		}
		const personnummer = ektefelle.personnummer || "";

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
								verdi={ektefelle.navn.fornavn}
								onChange={(verdi: string) => this.oppdaterTekstfelt("navn/fornavn", verdi)}
								onBlur={() => this.onBlur()}
								faktumKey="familie.sivilstatus.gift.ektefelle.fornavn"
								required={true}
							/>
						</Column>
					</Row>
					<Row>
						<Column xs="12">
							<InputEnhanced
								getName={() => id + "_mellomnavn_input"}
								getFeil={() => null}
								id={id + "_mellomnavn_input"}
								// inputRef={c => (this.navnInput = c)}
								maxLength={100}
								verdi={ektefelle.navn.mellomnavn}
								onChange={(verdi: string) => this.oppdaterTekstfelt("navn/mellomnavn", verdi)}
								onBlur={() => this.onBlur()}
								faktumKey="familie.sivilstatus.gift.ektefelle.mellomnavn"
								required={true}
							/>
						</Column>
					</Row>
					<Row className="add-padding-bottom">
						<Column xs="12">
							<InputEnhanced
								getName={() => id + "_etternavn_input"}
								getFeil={() => null}
								id={id + "_etternavn_input"}
								// inputRef={c => (this.navnInput = c)}
								maxLength={100}
								verdi={ektefelle.navn.etternavn}
								onChange={(verdi: string) => this.oppdaterTekstfelt("navn/etternavn", verdi)}
								onBlur={() => this.onBlur()}
								faktumKey="familie.sivilstatus.gift.ektefelle.etternavn"
								required={true}
							/>
						</Column>
					</Row>
					<Row>
						<Column xs="12">
							<InputEnhanced
								getName={() => id + "_fodselsdato_input"}
								getFeil={() => null}
								id={id + "_fodselsdato_input"}
								// inputRef={c => (this.navnInput = c)}
								// maxLength={8}
								// pattern={"\\d*"}
								verdi={fodselsdato}
								onChange={(verdi: string) => this.oppdaterTekstfelt("fodselsdato", verdi)}
								bredde="S"
								onBlur={() => this.onBlur()}
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
								// inputRef={c => (this.navnInput = c)}
								maxLength={5}
								minLength={5}
								pattern={"\\d*"}
								verdi={personnummer}
								onChange={(verdi: string) => this.oppdaterTekstfelt("personnummer", verdi)}
								bredde="S"
								onBlur={() => this.onBlur()}
								faktumKey="familie.sivilstatus.gift.ektefelle.pnr"
								required={true}
							/>
						</Column>
					</Row>
				</Container>
			</div>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(PersonSkjema));