import * as React from "react";
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from "react-intl";
import {Faktum} from "../../../nav-soknad/types";
import {State} from "../../redux/reducers";
import {connect} from "react-redux";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import SysteminfoMedSkjema from "../../../nav-soknad/components/systeminfoMedSkjema";
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import {DispatchProps} from "../../../nav-soknad/redux/reduxTypes";
import {finnFakta} from "../../../nav-soknad/utils/faktumUtils";
import SystemregistrerteBarn from "./SystemregistrerteBarn";
import Barnebidrag from "./Barnebidrag";

interface StateProps {
    fakta: Faktum[];
}

type Props = DispatchProps &
    StateProps &
    InjectedIntlProps;

class Familierelasjoner extends React.Component<Props, {}> {

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
		        <SporsmalFaktum faktumKey={"familierelasjon.faktum"} style="system" legendClassName="skjema-fieldset-large-bold">
			        <div><FormattedHTMLMessage id="familierelasjon.ingress" values={{antallBarn}}/></div>
			        <SysteminfoMedSkjema>
				        <SystemregistrerteBarn barnFakta={barnFakta} />
						<Barnebidrag />
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