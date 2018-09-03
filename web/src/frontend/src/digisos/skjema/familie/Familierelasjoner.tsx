import * as React from "react";
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from "react-intl";
import {Faktum} from "../../../nav-soknad/types";
import {State} from "../../redux/reducers";
import {connect} from "react-redux";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import SysteminfoMedSkjema from "../../../nav-soknad/components/systeminfoMedSkjema";
import Detaljeliste, { DetaljelisteElement } from "../../../nav-soknad/components/detaljeliste";
import BelopFaktum from "../../../nav-soknad/faktum/typedInput/BelopFaktum";
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import {DispatchProps} from "../../../nav-soknad/redux/reduxTypes";
// import {finnFakta, finnFaktum} from "../../../nav-soknad/utils/faktumUtils";
import {finnFakta} from "../../../nav-soknad/utils/faktumUtils";
import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import { formaterIsoDato } from "../../../nav-soknad/utils";

interface StateProps {
    fakta: Faktum[];
}

type Props = DispatchProps &
    StateProps &
    InjectedIntlProps;

class Familierelasjoner extends React.Component<Props, {}> {

    renderBarn(barnFakta: Faktum[]) {
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

        return barnFakta.map(barn => {
            const fornavn = barn.properties[FORNAVN] ? barn.properties[FORNAVN] : "";
            const mellomnavn = barn.properties[MELLOMNAVN] ? barn.properties[MELLOMNAVN] : "";
            const etternavn = barn.properties[ETTERNAVN] ? barn.properties[ETTERNAVN] : "";
            const navnString = `${fornavn} ${mellomnavn} ${etternavn}`;
            const fodselsDato = barn.properties[FODSELSDATO];
            const datoFormatert = formaterIsoDato(fodselsDato);
            const FOLKEREGISTRERTVERDI = barn.properties[FOLKEREGISTRERT] === "true" ? "Ja" : "Nei";
            if (barn.properties[IKKETILGANGTILBARN] && barn.properties[IKKETILGANGTILBARN] === "true") {
                return null;
            }

            return (
				<div key={barn.faktumId} className="barn">
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
								<p><strong><FormattedMessage id="familierelasjon.samvaer.sporsmal" /></strong></p>
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
	}

    render() {
        const fakta = this.props.fakta;
        const barnFakta: Faktum[] = finnFakta("system.familie.barn.true.barn", fakta);
	    const antallBarn = barnFakta.length;
        if (antallBarn === 0) {
            return (
				<SporsmalFaktum faktumKey={"familierelasjon.faktum"}>
					<p><FormattedMessage id="familierelasjon.ingen_registrerte_barn"/></p>
				</SporsmalFaktum>
			);
        } else {
	        return (
		        <SporsmalFaktum faktumKey={"familierelasjon.faktum"}>
			        <p><FormattedHTMLMessage id="familierelasjon.ingress" values={{antallBarn}}/></p>
			        <SysteminfoMedSkjema>
				        {this.renderBarn(barnFakta)}
			        </SysteminfoMedSkjema>
		        </SporsmalFaktum>
	        );
        }
    }
}

export default connect((state: State, props: any) => {
    return {
        fakta: state.fakta.data
    };
})(injectIntl(Familierelasjoner));