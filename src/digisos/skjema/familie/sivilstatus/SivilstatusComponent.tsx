import {Familie, initialPerson, Status} from "./FamilieTypes";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import * as React from "react";
import Sporsmal, { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import { DigisosFarge } from "../../../../nav-soknad/components/svg/DigisosFarger";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../../nav-soknad/components/informasjonspanel";
import PersonSkjema from "./PersonSkjema";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import { SoknadsSti } from "../../../redux/soknadsdata/soknadsdataReducer";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

interface RadioProps {
	id?: string;
	verdi: Status;
	checked: boolean;
	onClick: (verdi: Status) => void;
}

const SivilstatusRadioknapp: React.FunctionComponent<RadioProps> = ({verdi, id, checked, onClick}) => {
	const componentId = id ? id : "sivilstatus_" + verdi + "_radio";
	return (
		<RadioEnhanced
			getName={() => componentId}
			id={componentId}
			faktumKey="familie.sivilstatus"
			value={verdi}
			checked={checked}
			onChange={() => onClick(verdi)}
		/>
	);
};

class SivilstatusComponent extends React.Component<Props, {}> {

	onClickSivilstatus(verdi: Status) {
		const {oppdaterSoknadsdataSti, brukerBehandlingId, lagreSoknadsdata} = this.props;
		let sivilstatus = this.props.soknadsdata.familie.sivilstatus;
		if (verdi !== Status.GIFT) {
			sivilstatus = {
				"kildeErSystem": false,
				"sivilstatus": verdi
			};
		} else {
			sivilstatus = {
				"kildeErSystem": false,
				"sivilstatus": Status.GIFT,
				"ektefelle": initialPerson
			};
		}
		oppdaterSoknadsdataSti(SoknadsSti.SIVILSTATUS, sivilstatus);
		lagreSoknadsdata(brukerBehandlingId, SoknadsSti.SIVILSTATUS, sivilstatus);
	}

	render() {
		const {soknadsdata} = this.props;
		const familie: Familie = soknadsdata.familie;
		const sivilstatus = (familie && familie.sivilstatus) ? familie.sivilstatus.sivilstatus : null;

		return (
			<div className="skjema-sporsmal">
				<Sporsmal sprakNokkel="familie.sivilstatus">
					<SivilstatusRadioknapp
						verdi={Status.GIFT}
						checked={sivilstatus === Status.GIFT}
						onClick={(verdi) => this.onClickSivilstatus(verdi)}
					/>
					<div className="skjema-sporsmal--jaNeiSporsmal">
						<Underskjema
							visible={sivilstatus === Status.GIFT}
							arrow={true}
						>
							<Sporsmal
								sprakNokkel="familie.sivilstatus.gift.ektefelle"
								legendTittelStyle={LegendTittleStyle.FET_NORMAL}
							>
								<div>
									<div className="blokk-s">
										<PersonSkjema/>
									</div>
								</div>
							</Sporsmal>
						</Underskjema>
					</div>
					<SivilstatusRadioknapp
						verdi={Status.UGIFT}
						checked={sivilstatus === Status.UGIFT}
						onClick={(verdi) => this.onClickSivilstatus(verdi)}
					/>
					<SivilstatusRadioknapp
						verdi={Status.SAMBOER}
						checked={sivilstatus === Status.SAMBOER}
						onClick={(verdi) => this.onClickSivilstatus(verdi)}
					/>
					<SivilstatusRadioknapp
						verdi={Status.ENKE}
						checked={sivilstatus === Status.ENKE}
						onClick={(verdi) => this.onClickSivilstatus(verdi)}
					/>
					<SivilstatusRadioknapp
						verdi={Status.SKILT}
						checked={sivilstatus === Status.SKILT}
						onClick={(verdi) => this.onClickSivilstatus(verdi)}
					/>
					<SivilstatusRadioknapp
						verdi={Status.SEPARERT}
						checked={sivilstatus === Status.SEPARERT}
						onClick={(verdi) => this.onClickSivilstatus(verdi)}
					/>
				</Sporsmal>
				<Informasjonspanel
					synlig={ sivilstatus === Status.GIFT }
					farge={DigisosFarge.VIKTIG}
					ikon={InformasjonspanelIkon.ELLA}
					>
					<h4 className="skjema-sporsmal__infotekst__tittel">
						<FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tittel"/>
					</h4>
					<FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tekst"/>
				</Informasjonspanel>
			</div>
		)
	}
}

export default connectSoknadsdataContainer(injectIntl(SivilstatusComponent));