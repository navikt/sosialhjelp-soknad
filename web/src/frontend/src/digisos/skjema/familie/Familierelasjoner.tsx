import * as React from "react";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import SysteminfoMedSkjema from "../../../nav-soknad/components/systeminfoMedSkjema";
import Detaljeliste, { DetaljelisteElement } from "../../../nav-soknad/components/detaljeliste";
import BelopFaktum from "../../../nav-soknad/faktum/typedInput/BelopFaktum";

class Familierelasjoner extends React.Component<FaktumComponentProps, {}> {

	render() {
		// const { fakta } = this.props;
		const idSamvaersgrad = "idSamvaersgrad";
		const faktumKey = "faktum.key";
		const faktumId = 1234;

		return (
			<SporsmalFaktum faktumKey={"familierelasjon.faktum"}>
				<p>Vi har registrert at du har forsørgeransvar.</p>
				<SysteminfoMedSkjema>
					<Detaljeliste>
						<DetaljelisteElement
							tittel={<span>Du har</span>}
							verdi={"2 barn under 18 år."}
						/>
						<br/>
						<DetaljelisteElement
							tittel={<span>Navn</span>}
							verdi={"Fornavn Mellomnavn Etternavn"}
						/>
						<DetaljelisteElement
							tittel={<span>Fødselsdato</span>}
							verdi={"23.09.2016"}
						/>
						<DetaljelisteElement
							tittel={<span>Har samme folkeregistrerte adresse som deg</span>}
							verdi={"Nei"}
						/>
						<p><b>Hvor mye samvær har du med barnet?</b></p>
						<br/>
						<br/>
						<p>
						<div className="skjema-sporsmal skjema-sporsmal__innhold barn">
							<SporsmalFaktum faktumKey={"hvormye.faktum"}>
								<BelopFaktum
									id={idSamvaersgrad}
									faktumKey={faktumKey}
									faktumId={faktumId}
									property="grad"
									maxLength={3}
									kunHeltall={true}
									bredde="XS"
								/>
								<span className="prosenttegn">%</span>
							</SporsmalFaktum>
						</div>
						</p>
					</Detaljeliste>
				</SysteminfoMedSkjema>
			</SporsmalFaktum>
		);
	}

}

export default Familierelasjoner;