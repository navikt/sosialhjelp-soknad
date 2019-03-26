import * as React from "react";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { Person, Sivilstatus } from "./FamilieTypes";
import Detaljeliste from "./EktefelleDetaljer";
import { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import { formaterIsoDato } from "../../../../nav-soknad/utils";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class DinSivilstatusView extends React.Component<Props, {}> {

	componentDidMount() {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.SIVILSTATUS);
	}

	renderEktefelleInfo(ektefelle: Person, sivilstatus: Sivilstatus): React.ReactNode {
		const INTL_ID_EKTEFELLE = "system.familie.sivilstatus.gift.ektefelle";
		return (
			<div className="sivilstatus__ektefelleinfo">
				{ektefelle && ektefelle.navn && ektefelle.navn.fulltNavn && (
					<Detaljeliste>
						<DetaljelisteElement
							tittel={<FormattedMessage id={INTL_ID_EKTEFELLE + ".navn"}/>}
							verdi={ektefelle.navn.fulltNavn}
						/>
						<DetaljelisteElement
							tittel={<FormattedMessage id={INTL_ID_EKTEFELLE + ".fodselsdato"}/>}
							verdi={formaterIsoDato(ektefelle.fodselsdato)}
						/>
						<DetaljelisteElement
							tittel={
								<FormattedMessage id={INTL_ID_EKTEFELLE + ".folkereg"}/>
							}
							verdi={
								(sivilstatus.erFolkeregistrertSammen === true ?
										<FormattedMessage
											id={INTL_ID_EKTEFELLE + ".folkeregistrertsammen.true"}/> :
										<FormattedMessage
											id={INTL_ID_EKTEFELLE + ".folkeregistrertsammen.false"}/>
								)
							}
						/>
					</Detaljeliste>
				)}
			</div>
		);
	}

	render() {
		const { soknadsdata } = this.props;
		const ektefelle: Person = soknadsdata.familie.sivilstatus.ektefelle;
		const sivilstatus: Sivilstatus = soknadsdata.familie.sivilstatus;

		return this.renderEktefelleInfo(ektefelle, sivilstatus);
	}
}

export default connectSoknadsdataContainer(injectIntl(DinSivilstatusView));
