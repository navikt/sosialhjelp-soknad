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
import { konverterFraISODato, konverterTilISODato } from "./datoUtils";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { Familie } from "./FamilieTypes";

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

	oppdaterTekstfelt(sti: string, verdi: string) {
		if(verdi.length === 0) {
			verdi = null;
		}
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

		if (sivilstatus.ektefelle.fodselsdato === "") {
			sivilstatus.ektefelle.fodselsdato = null;
		}
		if (sivilstatus.ektefelle.personnummer === "") {
			sivilstatus.ektefelle.personnummer = null;
		}
		if (fodselsdato && fodselsdato !== "") {
			fodselsdato = konverterFraISODato(fodselsdato);
			feilkodeFodselsdato = fdato(fodselsdato);
			const faktumKey = "familie.sivilstatus.gift.ektefelle.fnr";
			setValideringsfeil(feilkodeFodselsdato, faktumKey);
			if (!feilkodeFodselsdato && sivilstatus.ektefelle) {
				sivilstatus.ektefelle.fodselsdato = konverterTilISODato(sivilstatus.ektefelle.fodselsdato);
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

	onClickBorSammen(verdi: boolean) {
		const { soknadsdata, oppdaterSoknadsdataSti } = this.props;
		const sivilstatus = soknadsdata.familie.sivilstatus;
		sivilstatus.borSammenMed = verdi;
		oppdaterSoknadsdataSti(SoknadsSti.SIVILSTATUS, sivilstatus);
		this.onBlur();
	}

	render() {
		const {soknadsdata} = this.props;
		const ektefelle = soknadsdata.familie.sivilstatus.ektefelle;
		if (!ektefelle) {
			return <div className="personskjema"/>;
		}
		const id = "ektefelle";
		const fodselsdato = konverterFraISODato(ektefelle.fodselsdato) || "";
		if (!ektefelle.personnummer) {
			ektefelle.personnummer = "";
		}
		const personnummer = ektefelle.personnummer || "";

		const familie: Familie = soknadsdata.familie;
		const borSammenMed = (familie && familie.sivilstatus) ? familie.sivilstatus.borSammenMed : null;

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

				<Sporsmal
					sprakNokkel="familie.sivilstatus.gift.ektefelle.borsammen"
				>
					<RadioEnhanced
						id={"sivilstatus_gift_bor_sammen_radio_ja"}
						faktumKey="familie.sivilstatus.gift.ektefelle.borsammen"
						value="true"
						checked={borSammenMed === true}
						onChange={() => this.onClickBorSammen(true)}
					/>
					<RadioEnhanced
						id={"sivilstatus_gift_bor_sammen_radio_nei"}
						faktumKey="familie.sivilstatus.gift.ektefelle.borsammen"
						value="false"
						checked={borSammenMed === false}
						onChange={() => this.onClickBorSammen(false)}
					/>
				</Sporsmal>


			</div>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(PersonSkjema));