import {FormattedMessage} from "react-intl";
import * as React from "react";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps,
} from "../../redux/soknadsdata/soknadsdataContainerUtils";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";

type Props = SoknadsdataContainerProps;

class SoknadsmottakerInfoPanel extends React.Component<Props, {}> {
    render() {
        const {valgtSoknadsmottaker} = this.props.soknad;

        if (valgtSoknadsmottaker) {
            const valgtEnhetsNavn = `${valgtSoknadsmottaker.enhetsnavn}, ${valgtSoknadsmottaker.kommunenavn} kommune`;
            return (
                <Informasjonspanel farge={DigisosFarge.VIKTIG} ikon={InformasjonspanelIkon.BREVKONVOLUTT}>
                    <p>
                        <strong>
                            <FormattedMessage
                                id="soknasosialhjelp.oppsummering.hvorsendes_del1"
                                values={{navkontor: valgtEnhetsNavn}}
                            />
                        </strong>
                    </p>
                    <p>
                        <FormattedMessage
                            id="soknasosialhjelp.oppsummering.hvorsendes_del2"
                            values={{navkontor: valgtEnhetsNavn}}
                        />
                    </p>
                    <LinkButton
                        type="button"
                        onClick={() => {
                            this.props.visSamtykkeInfo(true);
                        }}
                    >
                        <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.lenke" />
                    </LinkButton>
                </Informasjonspanel>
            );
        } else {
            return null;
        }
    }
}

export default connectSoknadsdataContainer(SoknadsmottakerInfoPanel);
