import * as React from "react";
import { formaterIsoDato } from "../../../nav-soknad/utils";
import Detaljeliste, { DetaljelisteElement } from "../../../nav-soknad/components/detaljeliste";
import { FormattedMessage } from "react-intl";
import BelopFaktum from "../../../nav-soknad/faktum/typedInput/BelopFaktum";
import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";

interface Props {
	barnFakta: any;
}

const SystemregistrerteBarn: React.StatelessComponent<Props> = ({ barnFakta }) => {
	const idSamvaersgrad = "idSamvaersgrad";
	const idDeltBosted = "idDeltBosted";
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
			<div key={barn.faktumId} className={sisteListeElement ? "barn barn_siste_liste_element" : "barn"}>
				<Detaljeliste>
					<DetaljelisteElement
						tittel={<span><FormattedMessage id="kontakt.system.personalia.navn" /></span>}
						verdi={navnString}
					/>
					<DetaljelisteElement
						tittel={<span><FormattedMessage id="familierelasjon.fodselsdato"/></span>}
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
							<div className="skjema-sporsmal skjema-sporsmal__innhold barn_samvaer_block">
								<BelopFaktum
									id={idSamvaersgrad}
									faktumKey={'system.familie.barn.true.barn'}
									faktumId={barn.faktumId}
									property="grad"
									maxLength={3}
									kunHeltall={true}
									bredde="L"
								/>
							</div>
						</div>)
					}
					{ barn.properties[FOLKEREGISTRERT] && barn.properties[FOLKEREGISTRERT] === "true" && (
						<div className="barn_delt_bosted_ja_nei">
							<JaNeiSporsmalFaktum
								id={barn.faktumId + "__" + idDeltBosted}
								faktumKey={`system.familie.barn.true.barn.deltbosted`}
								faktumId={barn.faktumId}
								skjemaTilhorerValg="nei"
								jaNeiPropFaktum={{
									property: "deltbosted",
									faktumKey: "system.familie.barn.true.barn",
									faktumId: barn.faktumId
								}}
							/>
						</div>)
					}
				</Detaljeliste>
			</div>
		);
	});

};

export default SystemregistrerteBarn;