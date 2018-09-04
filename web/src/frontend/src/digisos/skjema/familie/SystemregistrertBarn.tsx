import * as React from "react";
// import { Faktum } from "../../../nav-soknad/types";
import { formaterIsoDato } from "../../../nav-soknad/utils";
import Detaljeliste, { DetaljelisteElement } from "../../../nav-soknad/components/detaljeliste";
import { FormattedMessage } from "react-intl";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import BelopFaktum from "../../../nav-soknad/faktum/typedInput/BelopFaktum";
import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";

interface Props {
	barnFakta: any; // Faktum[]; // TODO Hvorfor virker ikke dette?
}

const SystemregistrertBarn: React.StatelessComponent<Props> = ({ barnFakta }) => {

	const idSamvaersgrad = "idSamvaersgrad";
	const idDeltBosted = "idDeltBosted";
	const faktumKey = "faktum.key";
	const faktumId = 1234;

	const FORNAVN = "fornavn";
	const MELLOMNAVN = "mellomnavn";
	const ETTERNAVN = "etternavn";
	const FODSELSDATO = "fodselsdato";
	const FOLKEREGISTRERT = "folkeregistrertsammen";
	const IKKETILGANGTILBARN = "ikketilgangtilbarn";

	return barnFakta.map((barn: any, index: number) => {
		const fornavn = barn.properties[FORNAVN] ? barn.properties[FORNAVN] : "";
		const mellomnavn = barn.properties[MELLOMNAVN] ? barn.properties[MELLOMNAVN] : "";
		const etternavn = barn.properties[ETTERNAVN] ? barn.properties[ETTERNAVN] : "";
		const navnString = `${fornavn} ${mellomnavn} ${etternavn}`;
		const fodselsDato = barn.properties[FODSELSDATO];
		const datoFormatert = formaterIsoDato(fodselsDato);
		const FOLKEREGISTRERTVERDI = barn.properties[FOLKEREGISTRERT] === "true" ? "Ja" : "Nei";
		const sisteListeElement: boolean =  (index + 1 ===  barnFakta.length);
		if (barn.properties[IKKETILGANGTILBARN] && barn.properties[IKKETILGANGTILBARN] === "true") {
			return null;
		}
		return (
			<div key={barn.faktumId} className={sisteListeElement ? "" : "barn"}>
				<h4>{navnString}</h4>
				<Detaljeliste>
					<DetaljelisteElement
						tittel={<span>Fødselsdato</span>}
						verdi={datoFormatert}
					/>
					<DetaljelisteElement
						tittel={(
							<span><FormattedMessage id="familierelasjon.samme_folkeregistrerte_adresse"/></span>
						)}
						verdi={FOLKEREGISTRERTVERDI}
					/>
					{ barn.properties[FOLKEREGISTRERT] && barn.properties[FOLKEREGISTRERT] === "false" && (
						<div>
							<div className="skjema-sporsmal skjema-sporsmal__innhold">
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
						</div>)
					}
					{ barn.properties[FOLKEREGISTRERT] && barn.properties[FOLKEREGISTRERT] === "true" && (
						<div>
							<p>
								<strong>
									<FormattedMessage
										id="familierelasjon.delt.samvaer.sporsmal" values={{navnString}} />
								</strong>
							</p>
							<JaNeiSporsmalFaktum
								id={idDeltBosted}
								faktumKey={`${faktumKey}.deltbosted`}
								faktumId={faktumId}
								skjemaTilhorerValg="nei"
								jaNeiPropFaktum={{
									property: "deltbosted",
									faktumKey,
									faktumId
								}}
							/>
						</div>)
					}
				</Detaljeliste>
			</div>
		);
	});

};

export default SystemregistrertBarn;